import './Common.css';
import ScrollArea from 'react-scrollbar';
import { connect } from 'react-redux';
import EmployeeListItem from '../components/common/EmployeeListItem';
import {useEffect, useState} from "react";
import {getEmployeeInfo, getEmployees} from "../redux/actions/common";
import {Loader} from "../components/Loader";
import EmployeeCard from "../components/common/EmployeeCard";

const CommonAnalysisPage = ({getEmployees, getEmployeeInfo, employees, currentEmployee, listLoader}) => {
    const [activeTab, setActiveTab] = useState('');
    useEffect(getEmployees, []);

    const employeeChosenHandler = (employeeId) => {
        setActiveTab(employeeId);
        getEmployeeInfo(employeeId);
    }

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
                                employees.map((data, index) =>
                                    <EmployeeListItem
                                        key={index}
                                        itemData={data}
                                        isActive={data.id === activeTab}
                                        chooseHandler={employeeChosenHandler}
                                    />
                                )
                            }
                        </div>
                    </ScrollArea>
                </div>
                <div className="col-8">
                    <div className="employee-info tab-content">
                        <EmployeeCard employeeInfo={currentEmployee}/>
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
}), {getEmployees, getEmployeeInfo})(CommonAnalysisPage);