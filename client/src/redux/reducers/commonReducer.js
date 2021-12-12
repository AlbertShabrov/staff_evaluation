import {
  CHOOSE_EMPLOYEE_FROM_LIST,
  GET_EMPLOYEE_INFO,
  GET_EMPLOYEES,
  SWITCH_EMPLOYEE_INFO_LOADER,
  SWITCH_EMPLOYEES_LOADER
} from "../types";

const initialState = {
  employees: [],
  chosenEmployeeFromList: '',
  currentEmployee: {},
  loaders: {
    employees: false,
    currentEmployee: false,
  }
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    //-----------------    BL SERVICE   ------------
    case GET_EMPLOYEES:
      return { ...state, employees: action.payload }
    case GET_EMPLOYEE_INFO:
      return { ...state, currentEmployee: action.payload }

    //------------------   LOADERS   ----------------
    case SWITCH_EMPLOYEES_LOADER:
      return { ...state, loaders: { ...state.loaders, employees: !state.loaders.employees } }
    case SWITCH_EMPLOYEE_INFO_LOADER:
      return { ...state, loaders: { ...state.loaders, currentEmployee: !state.loaders.currentEmployee } }

    //------------------   PAGE STATE   -------------
    case CHOOSE_EMPLOYEE_FROM_LIST:
      return { ...state, chosenEmployeeFromList: action.payload }

    default:
      return state;
  }
};