import { Alert, Button, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import { fetchBreweries, addSearch } from '../api';

import { DefaultBreweryType, DistanceUnit, LocationOption, StaticLocations } from "../models/constants";

import ManageDistanceUnit from "./ManageDistanceUnit";
import ManagePageSize from "./ManagePageSize";
import ManageBreweryType from "./ManageBreweryType";
import ManageSearch from "./ManageSearch";
import ManageLocation from "./ManageLocation";

const Search = (props) => {

  const [locationSelected, setLocationSelected] = useState(StaticLocations.all);
  const [locationType, setLocationType] = useState<string>(LocationOption.city);
  const [queryType, setQueryType] = useState(DefaultBreweryType);

  const [perPage, setPerPage] = useState(10);
  const [queryKeyword, setQueryKeyword] = useState<string>('');
  const [lastSearch, setLastSearch] = useState('');

  const {
    loadingError,
    setLoadingError,
    queryCoords,
    setBreweries,
    distanceFormat,
    setQueryCoords,
    setDistanceFormat,
    setHistory,
    page,
    setPage,
    setLoadingBreweries,
    allCapitals,
    allCountries,
  } = props;
  
  const doAddSearch = useCallback(() => {
    const city = locationSelected && locationSelected !== StaticLocations.all && locationSelected !== StaticLocations.myLocation && locationType === LocationOption.city
      ? locationSelected : '';
    const country = locationSelected && locationSelected !== StaticLocations.all && locationSelected !== StaticLocations.myLocation && locationType === LocationOption.country
      ? locationSelected : '';
    
    addSearch({
      lat: queryCoords?.lat ?? '',
      long: queryCoords?.long ?? '',
      query: queryKeyword ?? '',
      city,
      country,
      isCurrentLocation: queryCoords?.isCurrentLocation === true,
    })
      .catch(e => {
        setLoadingError(`There was an error loading the History. ${e}`);
      })
      .then(h => {
        setHistory(h);
      });
  }, [locationSelected, locationType, queryCoords, queryKeyword, setHistory, setLoadingError]);

  const doFetchBreweries = (record: boolean = true) => {
    setLoadingBreweries(true);
    const errorMessage = 'There was an error loading the Breweries.';
    fetchBreweries({
      query: queryKeyword,
      lat: queryCoords?.lat, 
      long: queryCoords?.long,
      page: page,
      pageSize: perPage,
      type: queryType === DefaultBreweryType ? '' : queryType,
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

    if (record) {
      doAddSearch();
    }
  };

  useEffect(() => {
    doFetchBreweries(false);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [queryKeyword, queryCoords, queryType, perPage, setPage]);

  const handleSearch = (event) => {
    setLastSearch(new Date().toLocaleTimeString());
    doFetchBreweries();
  };

  const handleSearchReset = (event) => {
    setQueryKeyword('');
    setLocationType(LocationOption.city);
    setLocationSelected(StaticLocations.all);
    setQueryType(DefaultBreweryType);
    setDistanceFormat(DistanceUnit.miles);
  };

  return(
    <>
      <Snackbar 
        open={loadingError !== ''}
        autoHideDuration={5000}
        onClose={() => setLoadingError('')}
        color='error'
      >
        <Alert severity="error">{loadingError}</Alert>
      </Snackbar>
      <Paper sx={{p: 4}} elevation={1}>
        <ManageSearch 
          queryKeyword={queryKeyword}
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
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        {lastSearch &&
          <Typography variant="overline">
            Last searched at {lastSearch}
          </Typography>
        }
        <Button
          variant="contained"
          color='success'
          size='large'
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color='error'
          size='small'
          onClick={handleSearchReset}
        >
          Reset
        </Button>
      </Stack>
    </>
  );
};

export default Search;
