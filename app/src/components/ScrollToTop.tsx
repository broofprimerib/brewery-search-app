import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShowScrollToTop(window.pageYOffset > 100);
    });
  }, []);
  
  return(
    <>
    {showScrollToTop &&
      <Fab
        color='primary'
        size='small'
        onClick={() => window['scrollTo']({top: 0, behavior: 'smooth'})}
        sx={{
          zIndex: 9999,
          position: 'fixed',
          bottom: '2vh',
          right: '2vw',
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    }
    </>
  );
}
