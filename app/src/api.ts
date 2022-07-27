
interface IFetchBreweriesOptions {
  query?: string;
  lat?: string;
  long?: string;
  page?: number;
  pageSize?: number;
  type?: string;
};

export const fetchBreweries = async (options: IFetchBreweriesOptions) => {
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
