import {
    GET_COMMUNICATION_GRAPH,
    GET_EMPLOYEE_INFO,
    GET_EMPLOYEES,
    SWITCH_EMPLOYEE_INFO_LOADER,
    SWITCH_EMPLOYEES_LOADER,
    SWITCH_GRAPH_LOADER
} from '../types';
import axios from 'axios'
import {baseUrl} from "../../utils";

export const getEmployees = () => {
    return async (dispatch) => {
        dispatch({type: SWITCH_EMPLOYEES_LOADER});
        const response = await axios.get(`${baseUrl}/api/employees`);
        dispatch({type: SWITCH_EMPLOYEES_LOADER});

        dispatch({
            type: GET_EMPLOYEES,
            payload: response.data
        });
    }
}

export const getEmployeeInfo = (employeeId) => {
    return async (dispatch) => {
        dispatch({type: SWITCH_EMPLOYEE_INFO_LOADER});
        const response = await axios.get(`${baseUrl}/api/user/all_user_info`, {
            params: {
                id: employeeId
            }
        });
        dispatch({type: SWITCH_EMPLOYEE_INFO_LOADER});

        dispatch({
            type: GET_EMPLOYEE_INFO,
            payload: response.data
        });
    }
}

export const getCommunicationGraph = (userId) => {
    return async (dispatch) => {
        // dispatch({type: SWITCH_GRAPH_LOADER});
        // const response = await axios.get(`${baseUrl}/api/user/communication_graph`, { params: { userId } });
        // dispatch({type: SWITCH_GRAPH_LOADER});
        const response = {
            data: [
                {
                    "name": "Alice",
                    "surname": "Alicov",
                    "patronymic": "Alicovich",
                    "id": "7dd1ea9f-1c7e-45d3-b4df-4eb601e00602",
                    "contacts": 2
                },
                {
                    "name": "Tiren",
                    "surname": "Gibs",
                    "patronymic": "Falovich",
                    "id": "a08923a3-cbef-4e71-a791-c110d9812829",
                    "contacts": 1
                }
            ]
        }

        dispatch({
            type: GET_COMMUNICATION_GRAPH,
            payload: response.data
        });
    }
}