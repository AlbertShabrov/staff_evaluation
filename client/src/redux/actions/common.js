import {GET_EMPLOYEE_INFO, GET_EMPLOYEES} from '../types';
import axios from 'axios'

export const getEmployees = () => {
    return async (dispatch) => {
        // const response = await axios.get('/api/employees');
        const response = {
            data: [
                {id: 'First', name: 'First', position: 'First____First'},
                {id: 'Second', name: 'Second', position: 'Second____Second'},
                {id: 'Third', name: 'Third', position: 'Third____Third'}
            ]
        }

        dispatch({
            type: GET_EMPLOYEES,
            payload: response.data
        });
    }
}

export const getEmployeeInfo = () => {
    return async (dispatch) => {
        // const response = await axios.get('/api/employees');
        const response = {
            data: {
                id: 'First',
                name: 'First'
            }
        }

        dispatch({
            type: GET_EMPLOYEE_INFO,
            payload: response.data
        });
    }
}