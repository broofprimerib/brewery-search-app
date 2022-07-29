import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/ManageSearch';

test('tests Search component', () => {
  const { getByText } = render(
    <El 
      queryKeyword={''}
      setQueryKeyword={() => {}}
    />);
  const text1 = getByText('Brewery keyword search');
  expect(text1).toBeInTheDocument();
});