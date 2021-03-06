import React, { SyntheticEvent } from 'react';
// MUI components
import { Grid, FormControl } from '@material-ui/core';
// Custom components
import { PlayersSelect } from '../selects';
import { MainFormActions } from '../actions';
import { Loader } from '../../common';
// Types
import { OrderFormData } from '../../../types/orders';
import { PlayerData } from '../../../types/simplifiedData';
// Hooks
import { useOrdersState } from '../../../context';
import { useForm } from '../../../hooks';

type OrdersFormProps = {
  playersData: PlayerData[];
};

export const OrdersForm = ({ playersData }: OrdersFormProps) => {
  const ordersContext = useOrdersState();

  const { addOrder, loading } = ordersContext;

  const initialState: OrderFormData = {
    player: '',
  };

  const [orderData, onInputChange, setOrderData] = useForm(initialState);

  const { player } = orderData;

  const onCancelClick = () => {
    setOrderData(initialState);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    addOrder(orderData);
  };

  return (
    <form onSubmit={onSubmit}>
      {loading && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <PlayersSelect
              onChange={onInputChange}
              value={player}
              playersData={playersData}
              required
            />
          </FormControl>
        </Grid>
        <MainFormActions
          label="zlecenie"
          onCancelClick={onCancelClick}
          current={false}
        />
      </Grid>
    </form>
  );
};
