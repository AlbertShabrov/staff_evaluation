import {
    GET_COMMUNICATION_GRAPH,
    GET_EMPLOYEE_INFO,
    GET_EMPLOYEES,
    SWITCH_EMPLOYEE_INFO_LOADER,
    SWITCH_EMPLOYEES_LOADER,
    SWITCH_GRAPH_LOADER
} from "../types";

const initialState = {
    employees: [],
    currentEmployee: {},
    communicationGraph: [],
    loaders: {
        employees: false,
        currentEmployee: false,
        graph: false
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
        case GET_COMMUNICATION_GRAPH:
            return {
                ...state,
                communicationGraph: action.payload
            }

        //------------------   LOADERS   ----------------
        case SWITCH_EMPLOYEES_LOADER:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    employees: !state.loaders.employees
                }
            }
        case SWITCH_EMPLOYEE_INFO_LOADER:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    currentEmployee: !state.loaders.currentEmployee
                }
            }
        case SWITCH_GRAPH_LOADER:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    graph: !state.loaders.graph
                }
            }
        default:
            return state;
    }
};