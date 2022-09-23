import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Test the filters', () => {
jest.setTimeout(10000)
  test('Checks if a filtered element renders correctly', async () => {
    render(<App />);
    
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();

    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();

    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
  
    await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument(), { timeout: 5000 });
  
    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '400');
    userEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText(/Yavin/i)).toBeInTheDocument(), { timeout: 5000 });
    await waitFor(() => expect(screen.getByText(/Hoth/i)).toBeInTheDocument(), { timeout: 5000 });
    await waitFor(() => expect(screen.getByText(/Bespin/i)).toBeInTheDocument(), { timeout: 5000 });  

    const removeFilter = screen.getByRole('button', { name: /X/i})
    userEvent.click(removeFilter);

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '10000');
    userEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText(/Endor/i)).toBeInTheDocument(), { timeout: 5000 });
    await waitFor(() => expect(screen.getByText(/Hoth/i)).toBeInTheDocument(), { timeout: 5000 });

    userEvent.click(removeFilter);

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '23');
    userEvent.click(buttonFilter);
    await waitFor(() => expect(screen.getByText(/Hoth/i)).toBeInTheDocument(), { timeout: 5000 });
  });
})
