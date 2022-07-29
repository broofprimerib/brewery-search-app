import { GpsFixed, LocationOn } from "@mui/icons-material";
import { ListItem, ListItemText, Stack } from "@mui/material";
import React from "react";

const HistoryItem = (props) => {

  const {
    history,
    allCapitals,
    allCountries,
  } = props;

  const getText = () => {
    const searchParameters: string[] = [];
    if (history.query) {
      searchParameters.push(`Search: ${history.query}`);
    }
    if (history.city) {
      searchParameters.push(`City: ${allCapitals[history.city].capital} (${history.city})`);
    } else if (history.country) {
      searchParameters.push(`Country: ${allCountries[history.country].name}`);
    } else {
      searchParameters.push('Default: all locations');
    }
    return searchParameters.join(', ');
  };

  return(
    <ListItem>
      <ListItemText
        primary={getText()}
        secondary={
          (history && history.lat && history.long) && (
            <Stack 
              direction='row'
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              component='span'
            >
              <GpsFixed fontSize="small" />
              <span>{history.lat}, {history.long}</span>
              {history.is_current_location && (<LocationOn fontSize="small" />)}
              {history.is_current_location && (<span>Curnrent browser location</span>)}
            </Stack>
          )
        }
      />
    </ListItem>
  );
};

export default HistoryItem;
