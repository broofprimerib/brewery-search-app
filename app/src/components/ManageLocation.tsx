import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import React from "react";
import { LocationOption } from "../models/constants";

const ManageLocation = (props) => {

  const {
    allCapitals,
    allCountries,
    setQueryCoords,
    setLocationType,
    locationType,
    setLocationSelected,
    locationSelected,
  } = props;

  const handleLocationChange = (event) => {
    setLocationSelected(event.target.value);
    if (event.target.value === 1) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setQueryCoords({
          lat: pos.coords.latitude.toString(),
          long: pos.coords.longitude.toString(),
        });
      });
    } else if (event.target.value === 0) {
      setQueryCoords(undefined);
    } else {
      const selection = locationType === LocationOption.city
        ? allCapitals[event.target.value]
        : allCountries[event.target.value];

      setQueryCoords({
        lat: selection.lat,
        long: selection.long,
      });
    }
  };

  const handleLocationTypeChange = (event) => {
    setLocationType((event.target as HTMLInputElement).value);
  };

  return(
    <>
      <FormControl>
        <FormLabel>Preset Locations</FormLabel>
        <RadioGroup
          row
          value={locationType}
          onChange={handleLocationTypeChange}
        >
          <FormControlLabel value={LocationOption.city} control={<Radio />} label='US City'/>
          <FormControlLabel value={LocationOption.country} control={<Radio />} label='Country'/>
        </RadioGroup>
      </FormControl>

      <FormControl 
        variant='filled' 
        fullWidth
        sx={{ mb: 2 }}
      >
        <InputLabel>Select a location</InputLabel>
        <Select
          value={locationSelected}
          defaultValue={0}
          onChange={handleLocationChange}
        >
          <MenuItem key={0} value={0}>All cities &amp; locations</MenuItem>
          <MenuItem key={1} value={1}>My current location</MenuItem>
          <MenuItem disabled>---</MenuItem>
          {locationType === LocationOption.city && allCapitals && Object.keys(allCapitals).map((key) =>
            <MenuItem key={key} value={key}>
              {allCapitals[key].capital} ({allCapitals[key].name})
            </MenuItem>
          )}
          {locationType === LocationOption.country && allCountries && Object.keys(allCountries).map((key) =>
            <MenuItem key={key} value={key}>
              {allCountries[key].name}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default ManageLocation;
