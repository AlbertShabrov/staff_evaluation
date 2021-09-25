import './Navbar.css';
import {NavLink} from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className="se-navbar mt-2 fixed-top d-flex justify-content-around">
            <div className="main d-flex">
                <Pills />
            </div>
            <div className="settings">
                <Settings />
            </div>
        </div>
    )
}

const Pills = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">

                <a className="navbar-brand mt-2 mt-lg-0" href="#">
                    <img
                        src="../images/logo.png"
                        height="40"
                        alt=""
                        loading="lazy"
                    />
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className='nav-link btn btn-rounded'
                                 to="/common">Сотрудники</NavLink>
                    </li>
                    <li className="nav-item" style={{ marginLeft: 20 }}>
                        <NavLink className='nav-link btn btn-rounded'
                                 to="/actions">Roadmap</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

const Settings = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid d-flex align-items-center justify-content-between col-11">
                <NavLink
                    className="text-reset me-4"
                    to="/settings"
                    role="button"
                >
                    <i className="fas fa-cog fa-2x"></i>
                </NavLink>

                <a
                    className="dropdown-toggle d-flex align-items-center hidden-arrow"
                    href="#"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                        className="rounded-circle"
                        height="50"
                        alt=""
                        loading="lazy"
                    />
                </a>
            </div>
        </nav>
    )
}