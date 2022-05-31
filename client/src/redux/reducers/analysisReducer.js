export const GET_EMPLOYEES = 'ANALYSIS/EMPLOYEES';
export const GET_EMPLOYEE_INFO = 'ANALYSIS/EMPLOYEE_INFO';

const analysisState = {
  employees: [],
  currentEmployee: {},
};

export const analysisReducer = (state = analysisState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return { ...state, employees: action.payload }
    case GET_EMPLOYEE_INFO:
      return { ...state, currentEmployee: action.payload }
    default:
      return state;
  }
};
