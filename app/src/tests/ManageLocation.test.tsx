import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/ManageLocation';

test('tests Location component', () => {
  const { getByText } = render(
    <El 
      allCapitals={{}}
      allCountries={{}}
      setQueryCoords={() => {}}
      setLocationType={() => {}}
      locationType={''}
      setLocationSelected={() => {}}
      locationSelected={''}
    />);
  const text1 = getByText('Preset Locations');
  const text2 = getByText('Select a location');
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
});