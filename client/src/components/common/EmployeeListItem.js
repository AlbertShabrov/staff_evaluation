import { connect } from 'react-redux';
import {getEmployeeInfo} from "../../redux/actions/common";

const EmployeeListItem = ({ itemData, currentEmployee, getEmployeeInfo }) => {
    return (
        <a
            className={`list-group-item list-group-item-action ${itemData.id === currentEmployee.id ? 'active' : ''}`}
            id={itemData.id}
            data-mdb-toggle="list"
            href={`#${itemData.id}`}
            role="tab"
            onClick={getEmployeeInfo}
        >
            { itemData.name }
        </a>
    )
}
export default connect(state => ({
    currentEmployee: state.common.currentEmployee
}), {getEmployeeInfo})(EmployeeListItem);