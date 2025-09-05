import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders dashboard', () => {
  render(<App />);
  const headingElement = screen.getByText(/dashboard/i);
  expect(headingElement).toBeInTheDocument();
});
