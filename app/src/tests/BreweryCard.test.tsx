import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/BreweryCard';

test('tests BreweryCard component', () => {
  const dataName = 'TEST';
  const dataTel = '1111111111';
  const { getByText } = render(
    <El 
      queryCoords={{}}
      distanceFormat={() => {}}
      brewery={{
        name: dataName,
        phone: dataTel,
      }}
      favorites={[]}
      toggleFavorite={() => {}} 
    />);
  const text1 = getByText(dataName);
  const text2 = getByText(dataTel);
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
});
