import React from 'react';
import { Card, CardHeader, CardContent, Avatar } from '@material-ui/core';
import { EditAccountForm } from '../auth/EditAccountForm';
import { useStyles } from './styles';
import { User } from '../../types/auth';

type DetailsCardProps = {
  user: User | null;
};

export const DetailsCard = ({ user }: DetailsCardProps) => {
  const classes = useStyles();

  if (user) {
    const { name, surname, email, role } = user;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {`${name[0]}${surname[0]}`}
            </Avatar>
          }
          title={`${name} ${surname} (${role})`}
          subheader={`${email}`}
        />
        <CardContent>
          <EditAccountForm />
        </CardContent>
      </Card>
    );
  }
  return <p>You need to log in to see the account details</p>;
};
