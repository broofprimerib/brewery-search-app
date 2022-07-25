
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
  console.log(url);
  const response = await fetch(url);
  return await response.json();
};
