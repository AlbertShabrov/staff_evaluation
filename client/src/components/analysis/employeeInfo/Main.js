import React, { useEffect } from "react";

import AddModel from "./AddModel";
import './Main.css';

export const Main = ({ employeeInfo }) => {
  return (
    <div className="se-employeeInfo__main d-flex">
      <div className="se-employeeInfo__section p-4 d-flex">
        <div className="se-employeeInfo__photo d-flex justify-content-center">
          <img  width='150' height='150'
                src={`images/${ employeeInfo.photo || 'user_thumbnail_plug.png' }`}
                alt="user-thumbnail"/>
        </div>
        <div className="se-employeeInfo__general ms-4">
          <div className="se-employeeInfo__name">
            { employeeInfo.surname } { employeeInfo.name } { employeeInfo.patronymic }
          </div>
          <div className="se-employeeInfo__brief pt-2">
            { employeeInfo.position }
            <span className="se-employeeInfo__department"> ({ employeeInfo.department }) </span>
          </div>
        </div>
      </div>

      <AddModel/>
    </div>
  )
};

export default Main;
