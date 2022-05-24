import {
  GET_EMPLOYEE_INFO,
  GET_EMPLOYEES,
  SWITCH_EMPLOYEE_INFO_LOADER,
  SWITCH_EMPLOYEES_LOADER,
} from '../types';
import axios from 'axios'
import { baseUrl } from "../../utils";

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch({ type: SWITCH_EMPLOYEES_LOADER });
    const response = await axios.get(`${ baseUrl }/api/employee/getAll`);
    dispatch({ type: SWITCH_EMPLOYEES_LOADER });

    dispatch({
      type: GET_EMPLOYEES,
      payload: response.data
    });

    return response.data;
  }
}

export const getEmployeeInfo = (employeeId) => {
  return async (dispatch) => {
    dispatch({ type: SWITCH_EMPLOYEE_INFO_LOADER });
    const response = await axios.get(`${ baseUrl }/api/employee/${ employeeId }/getInfo`);

    axios.get(`${ baseUrl }/api/employee/${ employeeId }/competence/getAnalysis`);
    dispatch({ type: SWITCH_EMPLOYEE_INFO_LOADER });

    dispatch({
      type: GET_EMPLOYEE_INFO,
      payload: response.data
    });
  }
}