import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const welcomeText = getByText(/Welcome!/i);
  const welcomeSubtext = getByText(/Thanks for stopping by the Brewery search. Enjoy!/i);
  expect(welcomeText).toBeInTheDocument();
  expect(welcomeSubtext).toBeInTheDocument();
});
