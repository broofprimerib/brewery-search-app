import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";

import { DistanceUnit } from "../models/constants";

const ManageDistanceUnit = (props) => {

  const {
    distanceFormat,
    setDistanceFormat,
  } = props;

  const handleDistanceFormatChange = (event) => {
    setDistanceFormat((event.target as HTMLInputElement).value);
  };

  return(
    <FormControl>
      <FormLabel>Show Distances In</FormLabel>
      <RadioGroup
        row
        value={distanceFormat}
        onChange={handleDistanceFormatChange}
      >
        <FormControlLabel value={DistanceUnit.miles} control={<Radio />} label='Miles'/>
        <FormControlLabel value={DistanceUnit.kilometers} control={<Radio />} label='Kilometers'/>
      </RadioGroup>
      <Typography variant="overline">Distances are calculated using lat/long, not to be used for navigation</Typography>
    </FormControl>
  );
};

export default ManageDistanceUnit;
