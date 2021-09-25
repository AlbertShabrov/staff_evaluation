import { connect } from 'react-redux';
import {getEmployeeInfo} from "../../redux/actions/common";
import {useEffect, useState} from "react";

const EmployeeListItem = ({ itemData, currentEmployee, getEmployeeInfo }) => {
    const [isActive, setActive] = useState(false)

    useEffect(() => {
        setActive(itemData.id === currentEmployee.id)
    }, [currentEmployee]);

    return (
        <a
            className={`list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
            id={itemData.id}
            data-mdb-toggle="list"
            href={`#${itemData.id}`}
            role="tab"
            onClick={() => getEmployeeInfo(itemData.id)}
        >
            { itemData.name }
        </a>
    )
}
export default connect(state => ({
    currentEmployee: state.common.currentEmployee
}), {getEmployeeInfo})(EmployeeListItem);