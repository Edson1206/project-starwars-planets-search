import React, { useContext } from 'react';
import PlanetsContext from '../Context/StarwarsContext';
import NameFilter from './NameFilter';
import ColumnFilter from './ColumnFilter';

function Table() {
  const { planetsTab } = useContext(PlanetsContext);
  const title = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL'];
  return (
    <>
      <NameFilter />
      <ColumnFilter />
      <table>
        <thead>
          <tr>
            {title.map((value, index) => (
              <th key={ index }>
                {' '}
                {value}
                {' '}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetsTab.map((item, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>))}
        </tbody>
      </table>

    </>
  );
}

export default Table;
