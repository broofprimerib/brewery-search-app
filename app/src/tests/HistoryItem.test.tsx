import React from 'react';
import { render } from '@testing-library/react';
import El from '../components/HistoryItem';

test('tests HistoryItem Capital component', () => {
  const allCapitals = {ID: { name: "Idaho", capital: "Boise", lat: "43.613739", long: "-116.237651" } };
  const { getByText } = render(
    <El 
      history={{ city: 'ID' }}
      allCapitals={allCapitals}
      allCountries={{}} 
    />);
  const text1 = getByText(`City: Boise (ID)`);
  expect(text1).toBeInTheDocument();
});

test('tests HistoryItem Country component', () => {
  const allCountries = {AE: { name: "United Arab Emirates", lat: "23.424076", long:"53.847818" }};
  const { getByText } = render(
    <El 
      history={{ country: 'AE' }}
      allCapitals={{}}
      allCountries={allCountries} 
    />);
  const text1 = getByText(`Country: United Arab Emirates`);
  expect(text1).toBeInTheDocument();
});
