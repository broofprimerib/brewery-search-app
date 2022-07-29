import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/NoHistory';

test('tests No History component', () => {
  const { getByText } = render(
    <El 
      history={[]}
    />);
  const text1 = getByText("You haven't searched for any Breweries yet");
  expect(text1).toBeInTheDocument();
});