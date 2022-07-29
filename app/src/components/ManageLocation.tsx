import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import React from "react";
import { LocationOption, StaticLocations } from "../models/constants";

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
    if (event.target.value === StaticLocations.myLocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setQueryCoords({
          lat: pos.coords.latitude.toString(),
          long: pos.coords.longitude.toString(),
          isCurrentLocation: true,
        });
      });
    } else if (event.target.value === StaticLocations.all) {
      setQueryCoords(undefined);
    } else {
      const selection = locationType === LocationOption.city
        ? allCapitals[event.target.value]
        : allCountries[event.target.value];

      setQueryCoords({
        lat: selection.lat,
        long: selection.long,
        isCurrentLocation: false,
      });
    }
  };

  const handleLocationTypeChange = (event) => {
    setLocationType((event.target as HTMLInputElement).value);
    setLocationSelected(StaticLocations.all);
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
          defaultValue={StaticLocations.all}
          onChange={handleLocationChange}
        >
          <MenuItem key={0} value={StaticLocations.all}>All cities &amp; locations</MenuItem>
          <MenuItem key={1} value={StaticLocations.myLocation}>My current location</MenuItem>
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
