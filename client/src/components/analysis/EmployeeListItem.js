import './EmployeeListItem.css';

export const EmployeeListItem = ({ employee, isActive, chooseHandler }) => {
  return (
    <div
      className='se-employeeListItem mb-2 py-2 d-flex'
      style={ {
        background: isActive ? 'url(images/employee_list_item_background.svg) no-repeat' : '#000000',
        color: '#ffffff',
        height: '82px',
        borderRadius: '10px'
      } }
      id={ employee.id }
      onClick={ () => chooseHandler(employee.id) }
    >
      <div className="se-employeeListItem__photo d-flex justify-content-center">
        <img src='images/user_thumbnail_plug.png' alt="user-thumbnail"/>
      </div>
      <div className="se-employeeListItem__content">
        <div className="se-employeeListItem__brief">
          <div className="se-employeeListItem__name">
            { employee.surname } { employee.name } { employee.patronymic }
          </div>
          <div className="se-employeeListItem__occupation">{ employee.position }</div>
        </div>
        <div className="se-employeeListItem__actions d-flex justify-content-end">
          <img src="images/settings.svg" alt="settings"/>
          <img src="images/mail.png" alt="settings"/>
        </div>
      </div>
    </div>
  )
}

export default EmployeeListItem;
