import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/Pagination';

test('tests Pagination component', () => {
  const { getByText } = render(
    <El 
      page={5}
      setPage={() => {}}
      breweries={[{},{}]}
    />);
  const text1 = getByText("Page 5");
  expect(text1).toBeInTheDocument();
});