import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../Context/StarwarsContext';

function NameFilter() {
  const [searchPlanet, setSearchPlanet] = useState('');
  const { planets, setPlanetsTab } = useContext(PlanetsContext);

  useEffect(() => {
    const filterPlanet = planets.filter((planet) => planet.name.includes(searchPlanet));
    setPlanetsTab(filterPlanet);
  }, [searchPlanet]);

  return (
    <label htmlFor="searchPlanet">
      <input
        name="searchPlanet"
        id="searchPlanet"
        type="search"
        data-testid="name-filter"
        value={ searchPlanet }
        onChange={ (e) => setSearchPlanet(e.target.value) }
      />
    </label>
  );
}

export default NameFilter;
