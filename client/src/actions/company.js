import axios from 'axios';
import { setAlert } from '../actions/alert';
import { GET_COMPANY, COMPANY_ERROR } from './types';

// Get current users companies
export const getCurrentCompany = () => async dispatch => {
  try {
    const res = await axios.get('/api/companies/my');

    dispatch({
      type: GET_COMPANY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update company
export const createCompany = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/companies', formData, config);
    dispatch({
      type: GET_COMPANY,
      payload: res.data
    });
    dispatch(setAlert(edit ? 'Company Updated' : 'Company Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
