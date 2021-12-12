import './Common.css';
import ScrollArea from 'react-scrollbar';
import { connect } from 'react-redux';
import EmployeeListItem from '../components/common/EmployeeListItem';
import React, {useEffect, useState} from "react";
import {getEmployeeInfo, getEmployees} from "../redux/actions/common";
import {Loader} from "../components/Loader";
import EmployeeCard from "../components/common/EmployeeCard";

const CommonAnalysisPage = ({getEmployees, getEmployeeInfo, employees, currentEmployee, listLoader, infoLoader}) => {
    const [activeTab, setActiveTab] = useState('');
    useEffect(() => {
        if (!employees.length) {
            getEmployees()
        }
    }, []);

    const employeeChosenHandler = (employeeId) => {
        setActiveTab(employeeId);
        getEmployeeInfo(employeeId);
    }

    return (
        <>
            <div className='se-common container-fluid'>
                <div className="row justify-content-between">
                    <div className="employees-list">
                        <ScrollArea
                            className="area my-3"
                            contentClassName={`content ${listLoader ? 'loading' : ''}`}
                            horizontal={false}
                            vertical={true}
                            scrollbar={true}
                        >
                            { listLoader && <Loader /> }
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
                    <div className="employee-info tab-content">
                        <ScrollArea
                            className={`area ${listLoader ? '' : 'p-4'}`}
                            contentClassName={`content ${infoLoader ? 'loading' : ''}`}
                            horizontal={false}
                            vertical={true}
                            scrollbar={true}
                        >
                            { infoLoader && <Loader /> }
                            <EmployeeCard employeeInfo={currentEmployee}/>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </>
    )
}


export default connect(state => ({
    employees: state.common.employees,
    currentEmployee: state.common.currentEmployee,
    listLoader: state.common.loaders.employees,
    infoLoader: state.common.loaders.currentEmployee,
}), {getEmployees, getEmployeeInfo})(CommonAnalysisPage);