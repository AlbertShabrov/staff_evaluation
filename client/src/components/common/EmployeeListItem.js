import { connect } from 'react-redux';

const EmployeeListItem = ({ itemData, isActive, currentEmployee, chooseHandler }) => {
    return (
        <a
            className={`list-group-item list-group-item-action ${isActive ? 'active' : ''}`}
            id={itemData.id}
            data-mdb-toggle="list"
            href={`#${itemData.id}`}
            role="tab"
            onClick={() => chooseHandler(itemData.id)}
        >
            { itemData.name } { itemData.surname } { itemData.patronymic }
            { itemData.slack_id ? '*': '' }
        </a>
    )
}
export default connect(state => ({
    currentEmployee: state.common.currentEmployee
}))(EmployeeListItem);