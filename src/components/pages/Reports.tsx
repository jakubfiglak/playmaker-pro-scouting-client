import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { ReportsContent } from '../content';
import { useAuthorization } from '../../hooks';
import { ReportsState, OrdersState } from '../../context';

export const Reports = () => {
  useAuthorization();

  return (
    <ReportsState>
      <OrdersState>
        <MainTemplate>
          <ReportsContent />
        </MainTemplate>
      </OrdersState>
    </ReportsState>
  );
};
