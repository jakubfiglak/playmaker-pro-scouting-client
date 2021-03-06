import React from 'react';
// MUI components
import { Chip, Avatar, Typography } from '@material-ui/core';
// Utils & data
import { getRatingChipLabel, getRatingChipClass } from '../../utils';
// Styles
import { useStyles } from './styles';

type FinalRatingChipProps = {
  finalRating: 1 | 2 | 3 | 4;
};

export const FinalRatingChip = ({ finalRating }: FinalRatingChipProps) => {
  const classes = useStyles();

  return (
    <Typography component="div">
      <strong>Ocena ostateczna: </strong>
      <Chip
        avatar={<Avatar>{finalRating}</Avatar>}
        label={getRatingChipLabel(finalRating)}
        color="primary"
        className={getRatingChipClass(finalRating, classes)}
      />
    </Typography>
  );
};
