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
    // const response = await axios.get(`${ baseUrl }/api/employee/getAll`);
    const response = {
      data: mockData.employees
    };
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
      data: mockData.employees.find((employee) => employee.id === employeeId)
    };

    // axios.get(`${ baseUrl }/api/employee/${ employeeId }/competence/getAnalysis`);
    dispatch({ type: TOGGLE_EMPLOYEE_ANALYSIS_LOADER });

    dispatch({
      type: GET_EMPLOYEE_INFO,
      payload: response.data
    });
  }
}

export const loadModel = () => {
  return 0;
}

const mockData = {
  employees: [
    {
      id: 1,
      name: 'Владислав',
      surname: 'Кочетков',
      patronymic: 'Ярославович',
      position: 'Инженер-программист',
      department: 'Кастомизация приложения',
      photo: 'logo1.png',
      characteristics: [
        {
          id: 1,
          name: 'Коммуникабельность',
          value: 44,
          timeline: {
            '01.01.2022': 33,
            '01.02.2022': 35,
            '01.03.2022': 43,
            '01.04.2022': 47,
            '01.05.2022': 44,
            '01.06.2022': 40,
            '01.07.2022': 32
          }
        }, {
          id: 2,
          name: 'Вовлеченность',
          value: 12
        }
      ]
    }, {
      id: 2,
      name: '21111',
      surname: '222222',
      patronymic: '23333',
      position: '24444',
      department: '255555',
      photo: 'logo2.png',
    }, {
      id: 3,
      name: '31111',
      surname: '322222',
      patronymic: '33333',
      position: '34444',
      department: '355555',
      photo: 'logo3.png',
    }
  ]
}
