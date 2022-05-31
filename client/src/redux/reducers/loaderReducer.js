export const TOGGLE_EMPLOYEES_LIST_LOADER = 'LOADER/EMPLOYEES_LIST';
export const TOGGLE_EMPLOYEE_ANALYSIS_LOADER = 'LOADER/EMPLOYEE_INFO';
export const TOGGLE_EMPLOYEE_COMPETENCES_LOADER = 'LOADER/EMPLOYEE_COMPETENCES';

const initialState = {
  employeeList: false,
  employeeInfo: false,
  employeeCompetences: false
};

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_EMPLOYEES_LIST_LOADER:
      return { ...state, employeeList: !state.employeeList };
    case TOGGLE_EMPLOYEE_ANALYSIS_LOADER:
      return { ...state, employeeInfo: !state.employeeInfo };
    case TOGGLE_EMPLOYEE_COMPETENCES_LOADER:
      return { ...state, employeeCompetences: !state.employeeCompetences };
    default: return state;
  }
}
