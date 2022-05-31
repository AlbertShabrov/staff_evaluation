import EmployeeList from '../components/analysis/EmployeeList';
import { Loader } from "../components/Loader";
import EmployeeInfo from "../components/analysis/EmployeeInfo";
import './AnalysisPage.css';
import { useState } from 'react';

const AnalysisPage = () => {
  const [chosenEmployee, chooseEmployee] = useState(null);

  return (
    <div className='se-commonAnalysis d-flex'>
      <EmployeeList chosenEmployee={ chosenEmployee } chooseHandler={ chooseEmployee }/>
      <EmployeeInfo employeeId={ chosenEmployee }/>
    </div>

    // <div className='se-commonAnalysis container-fluid'>
    //   <div className="row justify-content-between">
    //     <div className="employees-list">
    //
    //     </div>
    //     <div className="employee-info tab-content">

    //     </div>
    //   </div>
    // </div>
  )
}


export default AnalysisPage;
