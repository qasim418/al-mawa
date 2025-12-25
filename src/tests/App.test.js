import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders dashboard', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome to/i })).toBeInTheDocument();
});
