import React from 'react';
import { Select, MenuItem, InputLabel, SelectProps } from '@material-ui/core';
import { ClubData } from '../../types/simplifiedData';

type ClubsSelectProps = {
  clubsData: ClubData[];
} & SelectProps;

const ClubsSelect = ({
  clubsData,
  onChange,
  value,
  required,
}: ClubsSelectProps) => {
  return (
    <>
      <InputLabel id="club">Klub</InputLabel>
      <Select
        labelId="club"
        id="club"
        label="Klub"
        name="club"
        onChange={onChange}
        value={value}
        required={required}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {clubsData.map((clubData) => {
          const { _id, name: clubName } = clubData;

          return (
            <MenuItem key={_id} value={_id}>
              {clubName}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

export default ClubsSelect;
