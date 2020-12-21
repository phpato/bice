import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a navbar with name', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bice lab/i);
  expect(linkElement).toBeInTheDocument();
});
