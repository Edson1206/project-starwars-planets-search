import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './StarwarsContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsTab, setPlanetsTab] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const request = await fetch('https://swapi.dev/api/planets');
      const data = await request.json();
      const { results } = data;
      const newData = results.filter((value) => delete value.residents);
      setPlanets(newData);
      setPlanetsTab(newData);
    };
    fetchAPI();
  }, []);

  const hooksState = {
    planets,
    planetsTab,
    setPlanetsTab,
  };

  return (
    <PlanetsContext.Provider value={ hooksState }>
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
