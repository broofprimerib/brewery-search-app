import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/ManagePageSize';

test('tests Page Size component', () => {
  const { getByText } = render(
    <El 
      setPerPage={() => {}}
    />);
  const text1 = getByText('Page Size');
  expect(text1).toBeInTheDocument();
});