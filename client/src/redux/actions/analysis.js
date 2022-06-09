import { GET_EMPLOYEES, GET_EMPLOYEE_INFO } from '../reducers/analysisReducer';
import {
  TOGGLE_EMPLOYEES_LIST_LOADER,
  TOGGLE_EMPLOYEE_ANALYSIS_LOADER
} from '../reducers/loaderReducer';
import axios from 'axios';
import { baseUrl } from "../../utils";

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_EMPLOYEES_LIST_LOADER });
    const response = await axios.get(`${ baseUrl }/api/employee/getAll`);
    dispatch({ type: TOGGLE_EMPLOYEES_LIST_LOADER });

    dispatch({
      type: GET_EMPLOYEES,
      payload: response.data
    });

    return response.data;
  }
}

export const getEmployeeInfo = (employeeId) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_EMPLOYEE_ANALYSIS_LOADER });
    // const response = await axios.get(`${ baseUrl }/api/employee/${ employeeId }/getInfo`);
    const response = {
      data: {
        id: 1,
        name: '11111',
        surname: '122222',
        patronymic: '13333',
        position: '14444',
        positionId: 1555,
        department: '166666',
        chargeAreas: [
          {
            id: 1,
            name: '177777',
            successLevel: 50
          }, {
            id: 2,
            name: '18888',
            successLevel: 30
          }, {
            id: 3,
            name: '19999',
            successLevel: 80
          }
        ]
      }
    };

    // axios.get(`${ baseUrl }/api/employee/${ employeeId }/competence/getAnalysis`);
    dispatch({ type: TOGGLE_EMPLOYEE_ANALYSIS_LOADER });

    dispatch({
      type: GET_EMPLOYEE_INFO,
      payload: response.data
    });
  }
}
