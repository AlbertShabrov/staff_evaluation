import EmployeeList from '../components/commonAnalysis/EmployeeList';
import { Loader } from "../components/Loader";
import EmployeeInfo from "../components/commonAnalysis/EmployeeInfo";
import './CommonAnalysisPage.css';

const CommonAnalysisPage = () => {
  // const [activeTab, setActiveTab] = useState('');
  // useEffect(() => {
  //   if (!employees.length) {
  //     // getEmployees()
  //   }
  // }, []);

  // const employeeChosenHandler = (employeeId) => {
  //   setActiveTab(employeeId);
  //   getEmployeeInfo(employeeId);
  // }

  return (
    <div className='se-commonAnalysis d-flex'>
      <EmployeeList/>
      <EmployeeInfo/>
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


export default CommonAnalysisPage;