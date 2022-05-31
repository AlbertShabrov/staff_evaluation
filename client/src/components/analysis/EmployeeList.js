import ScrollArea from 'react-scrollbar';
import { connect } from 'react-redux';
import { Loader } from "../Loader";
import EmployeeListItem from "./EmployeeListItem";
import React, { useEffect, useState } from "react";
import { MDBTooltip, MDBInput, MDBContainer } from 'mdb-react-ui-kit';

import './EmployeeList.css';
import { getEmployees } from "../../redux/actions/analysis";

export const EmployeeList = ({
  employees, listLoading, getEmployees, chosenEmployee, chooseHandler
}) => {

  useEffect(() => {
    getEmployees().then(employees => {
      chooseHandler(employees[0].id);
    });
  }, []);

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
          { listLoading
              ? <Loader/>
              : <div className="list-group"> {
                    employees.map((data, index) =>
                      <EmployeeListItem
                        key={ index }
                        employee={ data }
                        isActive={ data.id === chosenEmployee }
                        chooseHandler={ chooseHandler }
                      />
                    )
                } </div>
          }
        </ScrollArea>
      </div>
    </div>
  )
}

export default connect((state) => ({
  employees: state.analysis.employees,
  listLoading: state.loader.employeeList
}), { getEmployees })(EmployeeList);
