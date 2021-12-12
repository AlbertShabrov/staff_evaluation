import React, { useEffect } from "react";
import { connect } from 'react-redux';

import Competences from "./Competences";
import { getEmployeeInfo } from '../../../redux/actions/commonAnalysis';
import './Main.css';

export const Main = ({ chosenEmployee, employeeInfo, getEmployeeInfo }) => {
  useEffect(() => chosenEmployee && getEmployeeInfo(chosenEmployee), [chosenEmployee]);

  if (!chosenEmployee) {
    return <div className="se-employeeInfo__section se-employeeInfo__main p-4 d-flex">
      Список острудников еще грузится...
    </div>
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
            <div className="se-employeeInfo__occupation"></div>
          </div>
        </div>
        <div className="se-employeeInfo__department"></div>
      </div>
      <Competences/>
    </div>
  )
}

export default connect((state) => ({
  employeeInfo: state.commonAnalysis.currentEmployee,
  chosenEmployee: state.commonAnalysis.chosenEmployeeFromList
}), { getEmployeeInfo })(Main);