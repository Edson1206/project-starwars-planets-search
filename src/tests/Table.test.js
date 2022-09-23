import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testing App component', () => {
  jest.setTimeout(10000)
  test('Checks if the page renders correctly', async () => {
    render(<App />);

    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
    
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
    
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument(), { timeout: 5000 });

    userEvent.type(nameFilter,'ta');
    await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument(), { timeout: 5000 });
  });
})
