import React from "react";
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";

const Pagination = (props) => {

  const {
    breweries,
    page,
    setPage,
  } = props;


  const handlePagePrevious = (event) => {
    setPage(() => page - 1);
  };

  const handlePageNext = (event) => {
    setPage(() => page + 1);
  };

  const handlePageOne = (event) => {
    setPage(1);
  };

  return(
    <>
      {breweries && breweries.length > 0 &&
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
            disabled={page === 1}
          >
            <FirstPage />
          </Fab>
          <Fab
            size='small'
            onClick={handlePagePrevious}
            disabled={page === 1}
          >
            <KeyboardArrowLeft />
          </Fab>
          <Fab
            variant='extended'
            disabled
            sx={{ mx: 2, px: 2 }}
          >
            Page {page}
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

export default Pagination;
