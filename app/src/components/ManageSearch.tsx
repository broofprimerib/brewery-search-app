import React from "react";
import { Clear } from "@mui/icons-material";
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";

const ManageSearch = (props) => {

  const {
    queryKeyword,
    setQueryKeyword,
  } = props;

  const handleKeywordChange = (event) => {
    setQueryKeyword(event.target.value.trim());
  };

  const handleClearKeyword = (event) => {
    setQueryKeyword('');
  };


  return(
    <FormControl
      variant='filled' 
      fullWidth
      sx={{ mb: 2 }}
    >
      <InputLabel>Brewery keyword search</InputLabel>
          <FilledInput
            value={queryKeyword}
            type='text'
            onChange={handleKeywordChange}
            endAdornment={
              <InputAdornment
                position='end'
                sx={{ pr: 1 }} 
                >
                <IconButton
                  onClick={handleClearKeyword}
                  edge='end'
                  disabled={queryKeyword === ''}
                >
                  <Clear/>
                </IconButton>
              </InputAdornment>
            }
          />
    </FormControl>
  );
};

export default ManageSearch;
