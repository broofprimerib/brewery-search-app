import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { BreweryTypes } from "../models/BreweryType";

const ManageBreweryType = (props) => {

  const {
    queryType,
    setQueryType,
  } = props;

  const handleTypeChange = (event) => {
    setQueryType(event.target.value);
  };

  return(
    <FormControl
      variant='filled'
      fullWidth
      sx={{ mb: 2 }}
    >
      <InputLabel>Filter by Brewery Type</InputLabel>
      <Select
        defaultValue={'All types'}
        value={queryType}
        onChange={handleTypeChange}
      >
        <MenuItem key="0" value={'All types'}>All types</MenuItem>
        {BreweryTypes.map((bt) => 
          <MenuItem key={bt.display} value={bt.value}>
            {bt.display}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default ManageBreweryType;
