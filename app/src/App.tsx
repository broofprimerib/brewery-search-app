import React, { useState } from 'react';
import { Backdrop, Box, CircularProgress, Grid, Paper, Snackbar, Tab, Tabs } from '@mui/material';

import { Brewery } from './models/Brewery';
import { LatLong } from './models/LatLong';
import { MainSearch } from './components/Search';
import { Pagination } from './components/Pagination';
import { BreweryCard } from './components/BreweryCard';
import { ScrollToTop } from './components/ScrollToTop';
import NoResults from './components/NoResults';

function App() {

  const [loadingCapitals, setLoadingCapitals] = useState(true);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingBreweries, setLoadingBreweries] = useState(true);
  const [loadingError, setLoadingError] = useState('');
  const [tab, setTab] = useState('search');

  const [locationSelected, setLocationSelected] = useState('0');
  const [locationType, setLocationType] = useState('city');
  const [allCapitals, setAllCapitals] = useState<{}>({});
  const [allCountries, setAllCountries] = useState<{}>({});
  const [queryKeyword, setQueryKeyword] = useState<string>('');
  const [queryCoords, setQueryCoords] = useState<LatLong>();
  const [queryType, setQueryType] = useState('All types');
  const [distanceFormat, setDistanceFormat] = useState('mi');

  const [breweries, setBreweries] = useState<Brewery[]>([]);

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <div>
      <Backdrop
        open={loadingBreweries || loadingCapitals || loadingCountries}
      >
        <CircularProgress />
      </Backdrop>
      <Snackbar 
        open={loadingError !== ''}
        autoHideDuration={5000}
        message={loadingError}
        onClose={() => setLoadingError('')}
      />

      <Pagination
        breweries={breweries} 
        page={page}
        setPage={setPage}
      />

      <Grid
        container
      >
        <Grid item xs={6}>
          <Paper sx={{m: 4, p: 4, overflow: 'scroll'}} elevation={0}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              sx={{ pb: 4 }}
            >
              <Tab label='Search' value='search' />
              <Tab label='History' value='history' />
            </Tabs>

            <Box
              role='tabpanel'  
              hidden={tab !== 'search'}
            >
              <MainSearch 
                tab={tab}
                setLoadingBreweries={setLoadingBreweries}
                setPage={setPage}
                queryKeyword={queryKeyword}
                queryCoords={queryCoords}
                queryType={queryType}
                perPage={perPage}
                page={page}
                setLoadingError={setLoadingError}
                setBreweries={setBreweries}
                distanceFormat={distanceFormat}
                setQueryKeyword={setQueryKeyword}
                setQueryCoords={setQueryCoords}
                allCapitals={allCapitals}
                setQueryType={setQueryType}
                setPerPage={setPerPage}
                setDistanceFormat={setDistanceFormat}
                setLoadingCapitals={setLoadingCapitals}
                setAllCapitals={setAllCapitals}
                setAllCountries={setAllCountries}
                allCountries={allCountries}
                setLoadingCountries={setLoadingCountries}
                locationType={locationType}
                setLocationType={setLocationType}
                setLocationSelected={setLocationSelected}
                locationSelected={locationSelected}
              />
            </Box>

            <Box
              role='tabpanel'
              hidden={tab !== 'history'}
            >
              HISTORY
            </Box>
            
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{m: 4, pt: 4, overflow: 'scroll'}} elevation={0}>
            <Tabs
              value={'results'}
              sx={{ pb: 4 }}
            >
              <Tab label='Results' value='results' />
            </Tabs>
            <Box
              role='tabpanel'
              hidden={false}
            >
              {breweries && breweries.map((brewery) => 
                <BreweryCard
                  key={brewery.id} 
                  queryCoords={queryCoords}
                  distanceFormat={distanceFormat}
                  brewery={brewery}
                />
              )}
              <NoResults 
                breweries={breweries}
                loadingBreweries={loadingBreweries}
                loadingCapitals={loadingCapitals}
                loadingCountries={loadingCountries}
                queryKeyword={queryKeyword}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <ScrollToTop />
    </div>

  );
}

export default App;
