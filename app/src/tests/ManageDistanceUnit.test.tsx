import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/ManageDistanceUnit';

test('tests Distance Unit component', () => {
  const { getByText } = render(
    <El 
      distanceFormat={''}
      setDistanceFormat={() => {}}
    />);
  const text1 = getByText('Show Distances In');
  expect(text1).toBeInTheDocument();
});