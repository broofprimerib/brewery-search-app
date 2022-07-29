import { Brewery } from "./models/Brewery";

interface IFetchBreweriesOptions {
  query?: string;
  lat?: string;
  long?: string;
  page?: number;
  pageSize?: number;
  type?: string;
};

export const fetchBreweries = async (options: IFetchBreweriesOptions) => {
  console.log('fetch breweries')
  //return;
  const byType = options.type
    ? `&by_type=${options.type}`
    : '';
  const search = options.query
    ? `/search?query=${options.query}`
    : `?by_dist=${options.lat},${options.long}`
  const url = `${process.env.REACT_APP_BREWERIES_API_URL}${search}&per_page=${options.pageSize}&page=${options.page}${byType}`;

  const response = await fetch(url);
  return await response.json();
};

export const fetchCapitals = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/capitals/`);
  return await response.json();
};

export const fetchCountries = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/countries/`);
  return await response.json();
};

export const fetchFavorites = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/favorite/`);
  return await response.json();
};

export const fetchHistories = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/search/`);
  return await response.json();
};

export const addSearch = async ({
  lat,
  long,
  query,
  city,
  country,
  isCurrentLocation,
}) => {
  const body = {
    lat,
    long,
    query,
    city,
    country,
    is_current_location: isCurrentLocation,
  };
  const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/search/`, { 
    method: 'POST', 
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
};

export const toggleFavorite = async (brewery: Brewery) => {
  const body = {
    id: brewery.id,
    data: brewery
  };
  const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/favorite/`, { 
    method: 'POST', 
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
};
