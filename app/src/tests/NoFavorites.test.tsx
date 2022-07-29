import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/NoFavorites';

test('tests No Favorites component', () => {
  const { getByText } = render(
    <El 
      breweries={[]}
    />);
  const text1 = getByText("You haven't made any Breweries your favorite yet");
  expect(text1).toBeInTheDocument();
});