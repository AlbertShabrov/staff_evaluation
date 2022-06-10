import React, { useEffect } from "react";
import ScrollArea from 'react-scrollbar';
import { Loader } from "../Loader";
import { connect } from 'react-redux';

import Main from './employeeInfo/Main';
import CharacteristicItem from './CharacteristicItem';
import { getEmployeeInfo } from '../../redux/actions/analysis';
import './EmployeeInfo.css';

export const EmployeeInfo = ({
  employeeId, employeeInfo, infoLoading, getEmployeeInfo
}) => {
  useEffect(() => employeeId && getEmployeeInfo(employeeId), [employeeId]);

  if (!employeeId || infoLoading) {
    // return <div className="se-employeeInfo__section se-employeeInfo__main p-4 d-flex">
    //   Список острудников еще грузится...
    // </div>
    return <Loader />
  }

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
        <Main employeeInfo={ employeeInfo } />
        {
          (employeeInfo.characteristics || []).map((item) =>
            <CharacteristicItem data={ item } key={ item.id }/>)
        }
      </ScrollArea>
    </div>
  )
}

export default connect((state) => ({
  employeeInfo: state.analysis.currentEmployee,
  infoLoading: state.loader.employeeInfo
}), { getEmployeeInfo })(EmployeeInfo);
