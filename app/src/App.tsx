import React, { useCallback, useEffect, useState } from 'react';
import { Backdrop, Badge, Box, CircularProgress, IconButton, ListItem, ListItemText, Paper, Tab, Tabs } from '@mui/material';
import { Search as SearchIcon, History, DataArray, Star, PlayCircle } from '@mui/icons-material';

import { toggleFavorite, fetchFavorites, fetchHistories, fetchCapitals, fetchCountries } from './api';

import { Brewery } from './models/Brewery';
import { LatLong } from './models/LatLong';
import { DistanceUnit, TabValues } from './models/constants';

import Search from './components/Search';
import BreweryCard from './components/BreweryCard';
import ScrollToTop from './components/ScrollToTop';
import NoResults from './components/NoResults';
import NoFavorites from './components/NoFavorites';
import Pagination from './components/Pagination';
import { Container } from '@mui/system';
import HistoryItem from './components/HistoryItem';
import NoHistory from './components/NoHistory';


function App() {
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState('');
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favoriteResults, setFavoriteResults] = useState(0);
  const [history, setHistory] = useState([]);
  const [tabSearch, setTabSearch] = useState('search');
  const [tabResults, setTabResults] = useState('results');
  const [queryCoords, setQueryCoords] = useState<LatLong>();
  const [distanceFormat, setDistanceFormat] = useState(DistanceUnit.miles);
  const [page, setPage] = useState<number>(1);
  const [allCapitals, setAllCapitals] = useState<{}>({});
  const [allCountries, setAllCountries] = useState<{}>({});
  const [loadingCapitals, setLoadingCapitals] = useState(true);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingBreweries, setLoadingBreweries] = useState(true);

  const handleTabSearchChange = (event, value) => {
    setTabSearch(value);
  };

  const handleTabResultsChange = (event, value) => {
    setTabResults(value);
  };

  const doFetchFavorites = useCallback(() => {
    fetchFavorites()
      .catch(e => {
        setLoadingError(`There was an error loading the Favorites. ${e}`);
      })
      .then(f => {
        setFavorites(f);
      });
  }, []);

  const doToggleFavorite = useCallback((brewery) => {
    toggleFavorite(brewery)
      .catch(e => {
        setLoadingError(`There was an error saving changes to the Favorites. ${e}`);
      })
      .then(f => {
        setFavorites(f);
      });
  }, []);

  const doFetchHistory = useCallback(() => {
    fetchHistories()
      .catch(e => {
        setLoadingError(`There was an error loading the History. ${e}`);
      })
      .then(h => {
        setHistory(h);
      });
  }, []);

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

  useEffect(() => {
    doFetchCapitals();
    doFetchCountries();
  }, [doFetchCapitals, doFetchCountries]);

  useEffect(() => {
    setLoading(loadingCapitals || loadingCountries || loadingBreweries);
  }, [loadingCapitals, loadingCountries, loadingBreweries, setLoading]);

  const prepStringForJson = (s: string) => {
    return JSON.parse(s
      .replace(/'/g, '"')
      .replace(/: None/g, ': null')
    );
  };

  useEffect(() => {
    doFetchFavorites();
    doFetchHistory();
  }, [doFetchFavorites, doFetchHistory]);

  useEffect(() => {
    if (favorites?.length && breweries?.length) {
      const favoriteIds = favorites.map(f => f.brewery_id);
      const breweryIds = breweries.map(b => b.id);
      setFavoriteResults(favoriteIds.reduce((a, c) => a + breweryIds.includes(c), 0));
    }
  }, [favorites, breweries]);

  return (
    <div>
      <Backdrop 
        sx={{ bgcolor: '#ffffff44' }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>

      <Pagination
        breweries={breweries} 
        page={page}
        setPage={setPage}
      />
      <Container>
        <Paper 
          sx={{m: 4, p: 4, overflow: 'scroll'}} 
          elevation={0}
        >
          <Tabs
            value={tabSearch}
            onChange={handleTabSearchChange}
            sx={{ pb: 4 }}
          >
            <Tab icon={<SearchIcon />} label='Search' value={TabValues.search} />
            <Tab icon={<History />} label='History' value={TabValues.history} />
          </Tabs>

          <Box
            role='tabpanel'  
            hidden={tabSearch !== TabValues.search}
          >
            <Search 
              breweries={breweries}
              setBreweries={setBreweries}
              loadingError={loadingError}
              setLoadingError={setLoadingError}
              setLoading={setLoading}
              queryCoords={queryCoords}
              setQueryCoords={setQueryCoords}
              distanceFormat={distanceFormat}
              setDistanceFormat={setDistanceFormat}
              setHistory={setHistory}
              page={page}
              setPage={setPage}
              setLoadingBreweries={setLoadingBreweries}
              allCapitals={allCapitals}
              allCountries={allCountries}
            />
          </Box>

          <Box
            role='tabpanel'
            hidden={tabSearch !== TabValues.history}
          >
            <NoHistory history={history} />
            {history && history.sort((a: any, b: any) => a.requested_at > b.requested_at ? 1 : -1).map((h: any) => 
              <HistoryItem 
                key={h.id} 
                history={h} 
                allCapitals={allCapitals} 
                allCountries={allCountries}
              />
            )}
          </Box>
          
        </Paper>
        <Paper 
          sx={{m: 4, p: 4, overflow: 'scroll'}} 
          elevation={0}
        >
          <Tabs
            value={tabResults}
            onChange={handleTabResultsChange}
            sx={{ pb: 4 }}
          >
            <Tab icon={
              favoriteResults > 0
                ? <Badge badgeContent={favoriteResults > 99 ? '99+' : favoriteResults} color='warning'><DataArray /></Badge>
                : <DataArray />
              } label='Results' value={TabValues.results} />
            <Tab icon={
              favorites && favorites.length > 0
                ? <Badge badgeContent={favorites.length > 99 ? '99+' : favorites.length} color='warning'><Star /></Badge>
                : <Star />
            } label='Favorites' value={TabValues.favorites} />
          </Tabs>
          <Box
            role='tabpanel'
            hidden={tabResults !== TabValues.results}
          >
            {breweries && breweries.map((brewery) => 
              <BreweryCard
                key={brewery.id} 
                queryCoords={queryCoords}
                distanceFormat={distanceFormat}
                brewery={brewery}
                favorites={favorites}
                toggleFavorite={doToggleFavorite}
              />
            )}
            <NoResults 
              loading={loading}
              breweries={breweries}
            />
          </Box>
          <Box
            role='tabpanel'
            hidden={tabResults !== TabValues.favorites}
          >
            {favorites && favorites.map((favorite: any) => 
              <BreweryCard
                key={favorite.id} 
                queryCoords={queryCoords}
                distanceFormat={distanceFormat}
                brewery={prepStringForJson(favorite.data)}
                favorites={favorites}
                toggleFavorite={doToggleFavorite}
              />
            )}
            <NoFavorites breweries={favorites} />
          </Box>
        </Paper>
      </Container>
      <ScrollToTop />
    </div>

  );
}

export default App;
