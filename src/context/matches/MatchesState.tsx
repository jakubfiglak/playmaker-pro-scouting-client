import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import MatchesContext from './matchesContext';
import matchesReducer from './matchesReducer';
import { State, Match, MatchesFormData } from '../../types/matches';
import { Order } from '../../types/common';

const MatchesState: React.FC = ({ children }) => {
  const initialState: State = {
    matchesData: {
      data: [],
      total: 0,
      pagination: {},
    },
    current: null,
    loading: false,
    error: null,
    setLoading: () => null,
    getMatches: () => null,
    getMatch: () => null,
    deleteMatch: () => null,
    addMatch: () => null,
    editMatch: () => null,
    setCurrent: () => null,
    clearCurrent: () => null,
  };

  const [state, dispatch] = useReducer(matchesReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Get matches
  const getMatches = async (
    page = 1,
    limit = 20,
    sort = '_id',
    order: Order,
    filters: '',
  ) => {
    setLoading();
    const orderSign = order === 'desc' ? '-' : '';

    const matchesURI = '/api/v1/matches';

    try {
      const res = await axiosJson.get(matchesURI);
      dispatch({
        type: 'GET_MATCHES_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get match
  const getMatch = async (id: string) => {
    try {
      const res = await axiosJson.get(`/api/v1/matches/${id}`);
      dispatch({
        type: 'GET_MATCHES_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Create new match
  const addMatch = async (match: MatchesFormData) => {
    setLoading();

    try {
      await axiosJson.post('/api/v1/clubs', match);
      dispatch({
        type: 'CREATE_MATCH_SUCCESS',
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Set current
  const setCurrent = (match: Match) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: match,
    });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({
      type: 'CLEAR_CURRENT',
    });
  };

  // Update match details
  const editMatch = async (id: string, match: MatchesFormData) => {
    setLoading();

    try {
      await axiosJson.put(`/api/v1/matches/${id}`, match);
      dispatch({
        type: 'UPDATE_MATCH_SUCCESS',
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Delete match
  const deleteMatch = async (id: string) => {
    setLoading();
    try {
      await axiosJson.delete(`/api/v1/matches/${id}`);
      dispatch({
        type: 'DELETE_MATCH_SUCCESS',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'MATCHES_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  return (
    <MatchesContext.Provider
      value={{
        matchesData: state.matchesData,
        current: state.current,
        loading: state.loading,
        error: state.error,
        setLoading,
        getMatches,
        getMatch,
        deleteMatch,
        addMatch,
        setCurrent,
        clearCurrent,
        editMatch,
      }}
    >
      {children}
    </MatchesContext.Provider>
  );
};

export default MatchesState;
