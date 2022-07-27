import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import React from "react";

export const Pagination = (props) => {

  const handlePagePrevious = (event) => {
    props.setPage(() => props.page - 1);
  };

  const handlePageNext = (event) => {
    props.setPage(() => props.page + 1);
  };

  const handlePageOne = (event) => {
    props.setPage(1);
  };

  return(
    <>
      {props.breweries && props.breweries.length > 0 &&
        <Box
          sx={{
            zIndex: 9999,
            position: 'fixed',
            top: '2vh',
            left: '50%',
            width: '500px',
            ml: '-250px',
            textAlign: 'center',
            alignContent: 'center',
          }}
        >
          <Fab
            size='small'
            onClick={handlePageOne}
            disabled={props.page === 1}
          >
            <FirstPage />
          </Fab>
          <Fab
            size='small'
            onClick={handlePagePrevious}
            disabled={props.page === 1}
          >
            <KeyboardArrowLeft />
          </Fab>
          <Fab
            size='small'
            //variant='extended'
            disabled
            sx={{ mx: 2, px: 2 }}
          >
            {props.page}
          </Fab>
          <Fab
            size='small'
            onClick={handlePageNext}
          >
            <KeyboardArrowRight />
          </Fab>
        </Box>
      }
    </>
  );
}
