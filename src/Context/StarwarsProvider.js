import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './StarwarsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsTab, setPlanetsTab] = useState([]);
  const [filterDropdown, setFilterDropdown] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const request = await fetch('https://swapi.dev/api/planets');
      const data = await request.json();
      const { results } = data;
      const newData = results.filter((result) => delete result.residents);
      setPlanets(newData);
      setPlanetsTab(newData);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    let filtered = planets;
    filterDropdown.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        const biggerThen = filtered
          .filter((item) => Number(item[column]) > Number(value));
        filtered = biggerThen;
      }
      if (comparison === 'menor que') {
        const lessThan = filtered
          .filter((item) => Number(item[column]) < Number(value));
        filtered = lessThan;
      }
      if (comparison === 'igual a') {
        const equalTo = filtered
          .filter((item) => Number(item[column]) === Number(value));
        filtered = equalTo;
      }
    });
    setPlanetsTab(filtered);
  }, [filterDropdown]);

  const context = {
    planets,
    planetsTab,
    setPlanetsTab,
    setFilterDropdown,
    filterDropdown,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
