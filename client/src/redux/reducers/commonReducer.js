import {GET_EMPLOYEE_COMPETENCES, GET_EMPLOYEE_INFO, GET_EMPLOYEES} from "../types";

const initialState = {
    employees: [],
    currentEmployee: {
        competences: {}
    }
};

export const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            }
        case GET_EMPLOYEE_INFO:
            return {
                ...state,
                currentEmployee: action.payload
            }
        case GET_EMPLOYEE_COMPETENCES:
            return {
                ...state,
                currentEmployee: {
                    ...state.currentEmployee,
                    competences: action.payload
                }
            }
        default:
            return state;
    }
};