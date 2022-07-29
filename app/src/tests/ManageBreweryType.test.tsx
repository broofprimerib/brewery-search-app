import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/ManageBreweryType';

test('tests Brewery Type component', () => {
  const { getByText } = render(
    <El 
      queryType={''}
      setQueryType={() => {}}
    />);
  const text1 = getByText('Filter by Brewery Type');
  expect(text1).toBeInTheDocument();
});