import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/NoResults';

test('tests No Results component', () => {
  const { getByText } = render(
    <El 
      loading={false}
      breweries={[]}
    />);
  const text1 = getByText("We couldn't find any Breweries with that criteria");
  expect(text1).toBeInTheDocument();
});