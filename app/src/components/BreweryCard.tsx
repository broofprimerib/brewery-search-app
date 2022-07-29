import { LocalPhone, OpenInNew, Map, LocationOn, StarOutline, Star, SportsBar } from "@mui/icons-material";
import { Alert, Button, Chip, IconButton, Paper, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import { getDistance } from '../distance';

const BreweryCard = (props) => {

  const {
    queryCoords,
    distanceFormat,
    brewery,
    favorites,
    toggleFavorite,
  } = props;

  const getFormattedDistance = () => {
    if (!queryCoords) {
      return '';
    }

    const distanceRaw = getDistance(queryCoords!.lat, queryCoords!.long, brewery.latitude, brewery.longitude, distanceFormat === 'mi');
    const distanceParts = distanceRaw.toString().split('.');
    const distance = `${distanceParts[0]}.${distanceParts.length > 1 ? distanceParts[1][0] : '0'}`;
    return `${distance} ${distanceFormat}.`;
  };

  const getAddressParts = () => {
    const addressParts: string[] = [];

    const addPart = (part) => {
      if (part) { addressParts.push(part); }
    };

    addPart(brewery.street);
    addPart(brewery.address_1);
    addPart(brewery.address_2);
    addPart(brewery.city);
    addPart(brewery.state);
    addPart(brewery.county_province);
    addPart(brewery.postal_code);
    addPart(brewery.country);

    return addressParts;
  };

  const openInNew = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleFavorite = (event) => {
    toggleFavorite(brewery);
  };

  return(
    <Paper sx={{p: 4, mb: 3}} elevation={1}>
      <Stack
        direction='row'
        justifyContent="space-between"
        spacing={2}
      >
        <Stack spacing={2}>
          <Typography variant='button' component='div'>
            <strong>{brewery.name}</strong><br />
          </Typography>
          <Typography variant='button' component='div'>
            {getAddressParts().map((p) => <div key={p}>{p}</div>)}
          </Typography>
          <Typography variant='button' component='div'>
            {brewery.phone && <span><strong>Tel:</strong> {brewery.phone}</span>}
          </Typography>
          <Typography variant='button' component='span'>
            <Chip color='secondary' icon={<SportsBar />} label={brewery.brewery_type} variant='outlined' />
          </Typography>
          {queryCoords &&
            <Typography variant='button' component='span'>
              <Chip color='success' icon={<LocationOn />} label={getFormattedDistance()} variant='outlined' />
            </Typography>
          }
        </Stack>
        <Stack
          direction="column"
          alignItems="flex-end"
          spacing={2}
        >
          <IconButton
            onClick={handleToggleFavorite}
          >
            {(favorites && favorites.find(f => f.brewery_id === brewery.id)) 
                ? <Star color='primary' /> 
                : <StarOutline color='primary' />
            }
          </IconButton>
          {brewery.website_url && 
            <Button
              onClick={() => openInNew(brewery.website_url)}
            >
              {brewery.website_url}&nbsp;<OpenInNew />
            </Button>
          }
          {brewery.phone && 
            <Button
              onClick={() => openInNew(`tel:${brewery.phone}`)}
            >
              Call {brewery.phone}&nbsp;<LocalPhone />
            </Button>
          }
          <Button
            onClick={() => {
              const url = `http://www.google.com/maps/place/${brewery.latitude},${brewery.longitude}`
              openInNew(url);
            }}
          >
            Open address in map
            &nbsp;
            <Map />
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default BreweryCard;
