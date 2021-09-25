import {GET_EMPLOYEE_INFO, GET_EMPLOYEES} from '../types';
import axios from 'axios'
import {baseUrl} from "../../utils";

export const getEmployees = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/api/employees`);

        dispatch({
            type: GET_EMPLOYEES,
            payload: response.data
        });
    }
}

export const getEmployeeInfo = (employeeId) => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/api/user/all_user_info`, {
            params: {
                id: employeeId
            }
        });

        dispatch({
            type: GET_EMPLOYEE_INFO,
            payload: response.data
        });
    }
}