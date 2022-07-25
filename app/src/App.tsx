import React, { useCallback, useEffect, useState } from 'react';

import { fetchBreweries } from './api';
import { getDistance } from './distance';

interface IBreweryType {
  display: string;
  description: string;
  value: string;
}

const BreweryTypes: IBreweryType[] = [
  {
    display: 'Micro',
    description: 'Most craft breweries. For example, Samual Adams is still considered a micro brewery.',
    value: 'micro',
  },
  {
    display: 'Nano',
    description: 'An extremely small brewery which typically only distributes locally.',
    value: 'nano',
  },
  {
    display: 'Regional',
    description: 'A regional location of an expanded brewery. Ex. Sierra Nevada’s Asheville, NC location.',
    value: 'regional',
  },
  {
    display: 'Brewpub',
    description: 'A beer-focused restaurant or restaurant/bar with a brewery on-premise.',
    value: 'brewpub',
  },
  {
    display: 'Large',
    description: 'A very large brewery. Likely not for visitors. Ex. Miller-Coors.',
    value: 'large',
  },
  {
    display: 'Planning',
    description: 'A brewery in planning or not yet opened to the public.',
    value: 'planning',
  },
  {
    display: 'Bar',
    description: 'A bar. No brewery equipment on premise.',
    value: 'bar',
  },
  {
    display: 'Contract',
    description: 'A brewery that uses another brewery’s equipment.',
    value: 'contract',
  },
  {
    display: 'Proprietor',
    description: 'Similar to contract brewing but refers more to a brewery incubator.',
    value: 'proprietor',
  },
  {
    display: 'Closed',
    description: 'A location which has been closed.',
    value: 'closed',
  },
]

interface IBrewery {
  name: string;
  street: string;
  city: string;
  state: string;
  brewery_type: string;
  latitude: string;
  longitude: string;
}

interface IQueryLatLong {
  lat: string;
  long: string;
}

function App() {
  const [stateCapitals, setStateCapitals] = useState<{}[]>([]);
  const [selectedStateCapital, setSelectedStateCapital] = useState<string>();
  const [queryLatLong, setQueryLatLong] = useState<IQueryLatLong>();
  const [breweries, setBreweries] = useState<IBrewery[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [canSearch, setCanSearch] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [filterType, setFilterType] = useState('');

  const doFetchBreweries = useCallback(() => {
    fetchBreweries({
      query: searchQuery,
      lat: queryLatLong?.lat, 
      long: queryLatLong?.long,
      page: page,
      pageSize: perPage,
      type: filterType,
    })
      .then(b => setBreweries(b));
  }, [searchQuery, queryLatLong, page, perPage, filterType]);

  useEffect(() => {
    const fetchCapitals = async () => {
      await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/capitals/`)
        .then(r => r.json())
        .then(data => setStateCapitals(Object.entries(data)));
    };

    fetchCapitals();
  }, []);

  useEffect(() => {
    if (selectedStateCapital && stateCapitals) {
      const stateCapital = stateCapitals.find((sc) => sc[0] === selectedStateCapital);
      if (stateCapital) {
        setQueryLatLong({
          lat: stateCapital[1].lat,
          long: stateCapital[1].long,
        })
      }
    }
  }, [selectedStateCapital, stateCapitals, filterType, page, perPage]);

  useEffect(() => {
    if (queryLatLong) {
      doFetchBreweries();
    }
  }, [queryLatLong, doFetchBreweries]);

  useEffect(() => {
    if (breweries) {
      //console.log(breweries);
    }
  }, [breweries]);

  useEffect(() => {
    setCanSearch(searchQuery !== '');
  }, [searchQuery]);

  const getFormattedDistance = (lat: string, long: string) => {
    if (!queryLatLong) {
      return '';
    }

    const distance = getDistance(queryLatLong!.lat, queryLatLong!.long, lat, long).toPrecision(1);
    return `[${distance} mi.]`;
  }

  return (
    <div>
      <input 
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button
        disabled={canSearch === false}
        onClick={() => {
          doFetchBreweries();
        }}
      >
        Search
      </button>
      <button
        disabled={canSearch === false}
        onClick={() => {
          setSearchQuery('');
          doFetchBreweries();
        }}
      >
        Clear
      </button>
      <select 
        defaultValue={0}
        onChange={(e) => {
          if (e.target.value === '1') {
            navigator.geolocation.getCurrentPosition((pos) => {
              setQueryLatLong({
                lat: pos.coords.latitude.toString(),
                long: pos.coords.longitude.toString(),
              });
            });
          } else {
            setSelectedStateCapital(e.target.value);
          }
        }}
      >
        <option key="0" value={0}>All cities &amp; locations</option>
        <option key="1" value={1}>My current location</option>
        <option disabled>---</option>
        {stateCapitals && stateCapitals.map((capital) => 
            <option key={capital[0]} value={capital[0]}>
              {`${capital[1].capital} (${capital[1].name})`}
            </option>
        )}
      </select>
      <select 
        defaultValue={''}
        onChange={(e) => {
          setFilterType(e.target.value);
        }}
      >
        <option key="0" value={''}>All types</option>
        {BreweryTypes.map((bt) => 
          <option key={bt.display} value={bt.value}>
            {bt.display}
          </option>
        )}
      </select>

      <select
        defaultValue={10}
        onChange={(e) => {
          setPerPage(Number.parseInt(e.target.value));
        }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
      <button
        onClick={() => {
          setPage(() => page - 1);
        }}
      >{"<"}</button>
      <span>{page}</span>
      <button
        onClick={() => {
          setPage(() => page + 1);
        }}
      >{">"}</button>
      <hr />
      {breweries.map((b) => 
          <div key={b.name}>
            <strong>{b.name}</strong> ({b.brewery_type}) {getFormattedDistance(b.latitude, b.longitude)}
            <p>{b.street} {b.city}, {b.state}</p>
          </div>
      )}
    </div>
  );
}

export default App;
