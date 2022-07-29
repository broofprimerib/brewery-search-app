import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

const NoHistory = (props) => {

  const {
    history,
  } = props;

  return(
    <>
      {(!history || history.length === 0) &&  
        <>
          <Typography variant='h4' component='div'>Cart before the horse?! <SentimentVeryDissatisfied /></Typography>
          <Typography variant='body1' component='p'>
            You haven't searched for any Breweries yet
          </Typography>
          <Typography variant='body2' component='div'>
            May we suggest the following...
            <ul>
              <li>Click Search</li>
              <li>Think of a place (US or international)</li>
              <li>Select it from the location dropdown</li>
              <li>Enjoy some results!</li>
            </ul>
          </Typography>
        </>
      }
    </>
  );
};

export default NoHistory;
