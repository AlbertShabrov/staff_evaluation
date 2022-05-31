import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Loader } from "../../Loader";

import Competences from "./Competences";
import { getEmployeeInfo } from '../../../redux/actions/analysis';
import './Main.css';

export const Main = ({ infoLoading, employeeInfo, getEmployeeInfo, employeeId }) => {
  useEffect(() => employeeId && getEmployeeInfo(employeeId), [employeeId]);

  if (!employeeId || infoLoading) {
    // return <div className="se-employeeInfo__section se-employeeInfo__main p-4 d-flex">
    //   Список острудников еще грузится...
    // </div>
    return <Loader />
  }

  return (
    <div className="se-employeeInfo__section se-employeeInfo__main p-4 d-flex">
      <div className="se-employeeInfo__content">
        <div className="se-employeeInfo__general d-flex">
          <div className="se-employeeInfo__photo d-flex justify-content-center">
            <img src='images/user_thumbnail_plug.png' alt="user-thumbnail"/>
          </div>
          <div className="se-employeeInfo__brief">
            <div className="se-employeeInfo__name">
              { employeeInfo.surname } { employeeInfo.name } { employeeInfo.patronymic }
            </div>
            <div className="se-employeeInfo__occupation d-flex">
              { employeeInfo.position }
              <img src="images/occupation_info.svg" alt="occupation_info" className='ps-3'/>
            </div>
          </div>
        </div>
        <div className="se-employeeInfo__department"></div>
      </div>

      {/*<Competences/>*/}
    </div>
  )
}

export default connect((state) => ({
  employeeInfo: state.analysis.currentEmployee,
  infoLoading: state.loader.employeeInfo
}), { getEmployeeInfo })(Main);
