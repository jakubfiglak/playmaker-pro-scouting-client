import React from 'react';
// MUI components
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Grid,
  Tooltip,
} from '@material-ui/core';
// MUI icons
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
// Custom components
import { Modal, Loader } from '../common';
// Types
import { Order } from '../../types/orders';
// Hooks
import { useAuthState } from '../../context';
import { useModal } from '../../hooks';
// Utils & data
import { formatDate } from '../../utils';
// Styles
import { useStyles } from './styles';

type OrderCardProps = {
  order: Order;
  deleteOrder: (id: string) => void;
};

export const OrderCard = ({ order, deleteOrder }: OrderCardProps) => {
  const classes = useStyles();

  const authContext = useAuthState();

  const { loading, user } = authContext;

  const [isModalOpen, handleClickOpen, handleClose] = useModal();

  const { _id, player, open, scout, createdAt, acceptDate } = order;

  return (
    <Card>
      {loading && <Loader />}
      <CardContent>
        <CardHeader title="Zlecenie obserwacji" subheader={`Nr: ${_id}`} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{`Zawodnik: ${player.firstName} ${player.lastName}`}</Typography>
          </Grid>
          {scout && (
            <Grid item xs={12}>
              <Typography>{`Scout: ${scout.name} ${scout.surname}`}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography>
              {`Data utworzenia: ${formatDate(createdAt, true)}`}
            </Typography>
          </Grid>
          {acceptDate && (
            <Grid item xs={12}>
              <Typography>
                {`Data przyjęcia: ${formatDate(acceptDate, true)}`}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <div>
            <Tooltip title="Usuń">
              <IconButton
                aria-label="delete match"
                className={classes.delete}
                disabled={user?.role !== 'admin'}
                onClick={handleClickOpen}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Modal
              open={isModalOpen}
              message={`Usunąć zlecenie ${_id} z bazy?`}
              handleAccept={() => deleteOrder(_id)}
              handleClose={handleClose}
            />
          </div>
          <Tooltip title="Przyjmij zlecenie">
            <IconButton
              aria-label="edit match"
              className={classes.accept}
              disabled={!open}
              onClick={() => console.log('hello')}
            >
              <AssignmentTurnedInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Raporty">
            <IconButton
              aria-label="reports"
              onClick={() => console.log('generate report')}
            >
              <AssignmentIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
};