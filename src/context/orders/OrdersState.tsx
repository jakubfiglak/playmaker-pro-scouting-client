import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import OrdersContext from './ordersContext';
import ordersReducer from './ordersReducer';
import { State, OrderFormData } from '../../types/orders';

export const OrdersState: React.FC = ({ children }) => {
  const initialState: State = {
    ordersData: {
      data: [],
      total: 0,
      pagination: {},
    },
    myOrdersData: [],
    current: null,
    loading: false,
    error: null,
    setLoading: () => null,
    getOrders: () => null,
    getMyOrders: () => null,
    getOrder: () => null,
    deleteOrder: () => null,
    addOrder: () => null,
  };

  const [state, dispatch] = useReducer(ordersReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Get orders
  const getOrders = async () => {
    setLoading();

    const ordersURI = '/api/v1/orders';

    try {
      const res = await axiosJson.get(ordersURI);
      dispatch({
        type: 'GET_ORDERS_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get my orders
  const getMyOrders = async () => {
    setLoading();

    try {
      const res = await axiosJson.get('/api/v1/orders/my');
      console.log(res);
      dispatch({
        type: 'GET_MY_ORDERS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'ORDERS_ERROR',
        payload: 'err.response.data.error',
      });
    }
  };

  // Get order
  const getOrder = async (id: string) => {
    try {
      const res = await axiosJson.get(`/api/v1/orders/${id}`);
      dispatch({
        type: 'GET_ORDER_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Create new order
  const addOrder = async (order: OrderFormData) => {
    setLoading();

    try {
      await axiosJson.post('/api/v1/orders', order);
      dispatch({
        type: 'CREATE_ORDER_SUCCESS',
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Delete order
  const deleteOrder = async (id: string) => {
    setLoading();
    try {
      await axiosJson.delete(`/api/v1/orders/${id}`);
      dispatch({
        type: 'DELETE_ORDER_SUCCESS',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  const { ordersData, myOrdersData, current, loading, error } = state;

  return (
    <OrdersContext.Provider
      value={{
        ordersData,
        myOrdersData,
        current,
        loading,
        error,
        setLoading,
        getOrders,
        getMyOrders,
        getOrder,
        deleteOrder,
        addOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};