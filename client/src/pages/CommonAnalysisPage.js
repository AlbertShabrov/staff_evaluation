import './Common.css';
import ScrollArea from 'react-scrollbar';
import { connect } from 'react-redux';
import EmployeeListItem from '../components/common/EmployeeListItem';
import {useEffect} from "react";
import {getEmployees} from "../redux/actions/common";
import {Loader} from "../components/Loader";

const CommonAnalysisPage = ({getEmployees, employees, currentEmployee, listLoader}) => {
    useEffect(getEmployees, []);

    return (
        <div className='se-common container-fluid'>
            <div className="row justify-content-between">
                <div className="employees-list col-4">
                    <ScrollArea
                        className="area my-3"
                        contentClassName={`content ${listLoader ? 'loading' : ''}`}
                        horizontal={false}
                        vertical={true}
                        scrollbar={true}
                    >
                        {
                            listLoader && <Loader />
                        }
                        <div className="list-group" id="list-tab" role="tablist">
                            {
                                employees.map((data, index) => <EmployeeListItem itemData={data} key={index}/>)
                            }
                        </div>
                    </ScrollArea>
                </div>
                <div className="col-8">
                    <div className="employee-info tab-content">
                        { currentEmployee.name }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default connect(state => ({
    employees: state.common.employees,
    currentEmployee: state.common.currentEmployee,
    listLoader: state.common.loaders.employees
}), {getEmployees})(CommonAnalysisPage);