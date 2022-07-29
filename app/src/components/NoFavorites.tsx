import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

const NoResults = (props) => {

  const {
    breweries,
  } = props;

  return(
    <>
      {(!breweries || breweries.length === 0) &&  
        <>
          <Typography variant='h4' component='div'>Sad times! <SentimentVeryDissatisfied /></Typography>
          <Typography variant='body1' component='p'>
            You haven't made any Breweries your favorite yet
          </Typography>
          <Typography variant='body2' component='div'>
            May we suggest the following...
            <ul>
              <li>Search for a Brewery</li>
              <li>Click the star to make it a favorite</li>
              <li>Visit the website</li>
              <li>Visit the Brewery in person</li>
            </ul>
          </Typography>
        </>
      }
    </>
  );
};

export default NoResults;
