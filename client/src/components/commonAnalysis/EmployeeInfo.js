import React from "react";
import ScrollArea from 'react-scrollbar';

import Main from './employeeInfo/Main';
import './EmployeeInfo.css';
// import { Loader } from "../Loader";

export const EmployeeInfo = ({ employeeId }) => {
  return (
    <div className='se-employeeInfo'>
      <ScrollArea
        className='area'
        contentClassName='content'
        verticalScrollbarStyle={ {
          backgroundColor: '#ffffff',
          borderRadius: '15px'
        } }
        horizontal={ false }
        vertical={ true }
        scrollbar={ true }
      >
        <Main employeeId={ employeeId }/>
      </ScrollArea>
    </div>
  )
}

export default EmployeeInfo;