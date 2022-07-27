import { Paper } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";

import { debounce } from 'lodash';

import { fetchBreweries, fetchCapitals, fetchCountries } from '../api';
import ManageDistanceUnit from "./ManageDistanceUnit";
import ManagePageSize from "./ManagePageSize";
import ManageBreweryType from "./ManageBreweryType";
import ManageSearch from "./ManageSearch";
import ManageLocation from "./ManageLocation";

export const MainSearch = (props) => {

  const {
    setLoadingBreweries,
    setPage,
    queryKeyword,
    queryCoords,
    queryType,
    perPage,
    page,
    setLoadingError,
    setBreweries,
    distanceFormat,
    setQueryKeyword,
    setQueryCoords,
    allCapitals,
    setQueryType,
    setPerPage,
    setDistanceFormat,
    setLoadingCapitals,
    setAllCapitals,
    allCountries,
    setAllCountries,
    setLoadingCountries,
    setLocationType,
    locationType,
    setLocationSelected,
    locationSelected,
  } = props;

  const doFetchCapitals = useCallback(() => {
    setLoadingCapitals(true);
    fetchCapitals()
      .catch(e => {
        setLoadingError(`There was an error loading the Capitals. ${e}`);
      })
      .then(c => {
        setAllCapitals(c);
        setLoadingCapitals(false);
      });
  }, [setLoadingCapitals, setAllCapitals, setLoadingError]);

  const doFetchCountries = useCallback(() => {
    setLoadingCountries(true);
    fetchCountries()
      .catch(e => {
        setLoadingError(`There was an error loading the Countries. ${e}`);
      })
      .then(c => {
        setAllCountries(c);
        setLoadingCountries(false);
      });
  }, [setLoadingCountries, setAllCountries, setLoadingError]);
  
  const doFetchBreweries = useMemo(() => debounce(() => {
    setLoadingBreweries(true);
    const errorMessage = 'There was an error loading the Breweries.';
    fetchBreweries({
      query: queryKeyword,
      lat: queryCoords?.lat, 
      long: queryCoords?.long,
      page: page,
      pageSize: perPage,
      type: queryType === 'All types' ? '' : queryType,
    })
      .catch(e => {
        setLoadingError(`${errorMessage} ${e}`);
      })
      .then(b => {
        if (b.errors) {
          setLoadingError(`${errorMessage} ${b.errors}`);
        } else {
          setBreweries(b);
        }
        setLoadingBreweries(false);
      });
  }, process.env.REACT_APP_DEBOUNCE), [queryKeyword, queryCoords, page, perPage, queryType, setLoadingBreweries, setBreweries, setLoadingError]);

  useEffect(() => {
    doFetchCapitals();
    doFetchCountries();
  }, [doFetchCapitals, doFetchCountries]);

  useEffect(() => {
    doFetchBreweries();
  }, [queryCoords, doFetchBreweries]);

  useEffect(() => {
    setPage(1);
  }, [queryKeyword, queryCoords, queryType, perPage, setPage]);

  return(
    <>
      <Paper sx={{p: 4}} elevation={1}>
        <ManageSearch 
          queryKeyword={queryKeyword}
          doFetchBreweries={doFetchBreweries}
          setQueryKeyword={setQueryKeyword}
        />
        <ManageLocation 
          allCapitals={allCapitals}
          allCountries={allCountries}
          setQueryCoords={setQueryCoords}
          locationType={locationType}
          setLocationType={setLocationType}
          setLocationSelected={setLocationSelected}
          locationSelected={locationSelected}
        />
      </Paper>
      <Paper sx={{p: 4, my: 3}} elevation={1}>
        <ManageBreweryType 
          queryType={queryType}
          setQueryType={setQueryType}
        />
        <ManagePageSize 
          setPerPage={setPerPage}
        />
        <ManageDistanceUnit 
          distanceFormat={distanceFormat}
          setDistanceFormat={setDistanceFormat}
        />
      </Paper>
    </>
  );
};
