import ScrollArea from 'react-scrollbar';
import { connect, useDispatch } from 'react-redux';
import { Loader } from "../Loader";
import EmployeeListItem from "./EmployeeListItem";
import React, { useEffect } from "react";
import { MDBTooltip, MDBInput, MDBContainer } from 'mdb-react-ui-kit';

import './EmployeeList.css';
import { getEmployees } from "../../redux/actions/commonAnalysis";
import { CHOOSE_EMPLOYEE_FROM_LIST } from "../../redux/types";

export const EmployeeList = ({ employees, chosenEmployee, getEmployees }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getEmployees().then(employees => {
      chooseEmployee(employees[0].id)
    });
  }, []);

  const chooseEmployee = (employeeId) => {
    dispatch({
      type: CHOOSE_EMPLOYEE_FROM_LIST,
      payload: employeeId
    });
  }

  return (
    <div className='se-employeeList'>
      <div className="se-employeeList__panel d-flex">
        <MDBContainer className='se-employeeList__panel-search'>
          <MDBInput style={ { background: 'url(images/search.svg) #0F1015 no-repeat scroll' } }/>
        </MDBContainer>
        <MDBTooltip tag='div' wrapperClass='se-employeeList__create' title='Добавьте сотрудника'>
          <img width='30' height='30' src="images/add_employee.svg" alt="add employee"/>
        </MDBTooltip>
      </div>
      <div className="se-employeeList__container mt-3">
        <ScrollArea
          className="area"
          contentClassName='content'
          verticalScrollbarStyle={ {
            backgroundColor: '#ffffff',
            borderRadius: '15px'
          } }
          horizontal={ false }
          vertical={ true }
          scrollbar={ true }
        >
          {/*{ listLoader && <Loader/> }*/ }
          <div className="list-group">
            {
              employees.map((data, index) =>
                <EmployeeListItem
                  key={ index }
                  employee={ data }
                  isActive={ data.id === chosenEmployee }
                  chooseHandler={ chooseEmployee }
                />
              )
            }
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default connect((state) => ({
  employees: state.commonAnalysis.employees,
  chosenEmployee: state.commonAnalysis.chosenEmployeeFromList
}), { getEmployees })(EmployeeList);