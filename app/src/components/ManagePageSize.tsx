import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { ValidPageSizes } from "../models/constants";

const ManagePageSize = (props) => {

  const {
    setPerPage,
  } = props;

  const handlePageSizeChange = (event) => {
    setPerPage(event.target.value);
  };

  return(
    <FormControl
      variant='filled'
      fullWidth
      sx={{ mb: 2 }}
    >
      <InputLabel>Page Size</InputLabel>
      <Select
        defaultValue={10}
        onChange={handlePageSizeChange}
      >
        {ValidPageSizes.map((ps) => <MenuItem key={ps} value={ps}>{ps}</MenuItem>)}
      </Select>
    </FormControl>
  );
};

export default ManagePageSize;
