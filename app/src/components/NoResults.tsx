import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

const NoResults = (props) => {

  const {
    breweries,
    loadingBreweries,
    loadingCapitals,
    loadingCountries,
    queryKeyword,
  } = props;

  return(
    <>
      {(!breweries || breweries.length === 0) &&  
        !loadingBreweries && !loadingCapitals && !loadingCountries &&
        <>
          <Typography variant='h4' component='div'>So sorry! <SentimentVeryDissatisfied /></Typography>
          <Typography variant='body1' component='p'>
            We couldn't find any Breweries { queryKeyword ? <>with keywords "<strong>{queryKeyword}</strong>"</> : '' }
          </Typography>
          <Typography variant='body2' component='div'>
            May we suggest searching for:
            <ul>
              <li>Barbarian</li>
              <li>Payette</li>
              <li>Sockeye</li>
            </ul>
            ... or something like that. You get the idea!
          </Typography>
        </>
      }
    </>
  );
};

export default NoResults;
