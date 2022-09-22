import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../Context/StarwarsContext';

function NameFilter() {
  const [searchPlanet, setSearchPlanet] = useState({ filterByName: { name: '' } });
  const { planets, setPlanetsTab } = useContext(PlanetsContext);

  useEffect(() => {
    const filterPlanet = planets.filter((planet) => planet
      .name.toLowerCase().includes(searchPlanet.filterByName.name.toLowerCase()));
    setPlanetsTab(filterPlanet);
  }, [searchPlanet.filterByName.name]);

  return (
    <label htmlFor="searchPlanet">
      <input
        name="searchPlanet"
        id="searchPlanet"
        type="search"
        data-testid="name-filter"
        value={ searchPlanet.filterByName.name }
        onChange={ ({ target }) => setSearchPlanet(
          { filterByName: { name: target.value } },
        ) }
      />
    </label>
  );
}

export default NameFilter;
