import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header Component', () => {
  test('renders search button', () => {
    render(<Header onSearch={() => {}} />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  test('renders calendar input field', () => {
    render(<Header onSearch={() => {}} />);
    const calendarInput = screen.getByPlaceholderText('Select Date Range');
    expect(calendarInput).toBeInTheDocument();
    // Ensure the input is initially read-only as expected
    expect(calendarInput).toHaveAttribute('readOnly');
  });

  test('toggles calendar visibility on input click', () => {
    render(<Header onSearch={() => {}} />);
    const calendarInput = screen.getByPlaceholderText('Select Date Range');
    userEvent.click(calendarInput);
    // The calendar should now be visible
    expect(screen.getByText('Confirm Dates')).toBeInTheDocument();
  });
});