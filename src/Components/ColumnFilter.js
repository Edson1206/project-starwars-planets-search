import React, { useEffect, useState, useContext } from 'react';
import PlanetsContext from '../Context/StarwarsContext';

function ColumnFilter() {
  const { filterDropdown,
    setFilterDropdown,
  } = useContext(PlanetsContext);
  const columnDropdown = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [newColumnDropdown, setNewColumnDropdown] = useState(columnDropdown);
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = () => {
    setFilterDropdown([...filterDropdown, state]);
    const selected = state.column;
    const dropdownFiltering = newColumnDropdown.filter((value) => value !== selected);
    setNewColumnDropdown(dropdownFiltering);
  };

  const filterRemove = (column) => {
    const newFilter = filterDropdown.filter((value) => value.column !== column);
    setFilterDropdown(newFilter);
    setNewColumnDropdown([...newColumnDropdown, column]);
  };
  const removeAllFilters = () => {
    setFilterDropdown([]);
    setNewColumnDropdown(columnDropdown);
  };
  useEffect(() => {
    setState({ ...state, column: newColumnDropdown[0] });
  }, [newColumnDropdown]);

  return (
    <div>
      <label htmlFor="column-filter">
        <select
          id="column-filter"
          value={ state.column }
          data-testid="column-filter"
          onChange={ ({ target }) => setState({ ...state, column: target.value }) }
        >
          { newColumnDropdown.map((value) => (
            <option key={ value } value={ value }>{value}</option>))}
        </select>
      </label>
      <select
        data-testid="comparison-filter"
        id="comparison"
        value={ state.comparison }
        onChange={ ({ target }) => setState({ ...state, comparison: target.value }) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="value-filter">
        <input
          type="number"
          value={ state.value }
          id="value-filter"
          data-testid="value-filter"
          onChange={ ({ target }) => setState({ ...state, value: target.value }) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleChange }
      >
        filter
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeAllFilters }
      >
        Remover todos filtros
      </button>
      {filterDropdown.map((value, index) => (
        <div data-testid="filter" key={ index }>
          <span>{`${value.column} | ${value.comparison} | ${value.value}`}</span>
          <button type="button" onClick={ () => filterRemove(value.column) }>X</button>
        </div>
      ))}
    </div>
  );
}

export default ColumnFilter;
