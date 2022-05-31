import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className="se-navbar fixed-top d-flex align-items-center"
             style={{ background: 'url(/images/header_background.svg) no-repeat' }}>
            <img className='ms-5' src="/images/logo.svg" alt="logo"/>
            <div className='se-navbar__page-links'></div>
            <div className="se-navbar__profile me-5">
                <div className="se-navbar__profile-user"></div>
                <div className="se-navbar__profile-actions d-flex justify-content-between">
                    <img src="/images/notification.png" alt="notification"/>
                    <img src="/images/settings.svg" alt="settings"/>
                    <img src="/images/logout.svg" alt="logout"/>
                </div>
            </div>
        </div>
    )
}

// const Pills = () => {
//     return (
//         <nav className="navbar navbar-expand-lg">
//             <div className="container-fluid">
//
//                 <a className="navbar-brand mt-2 mt-lg-0" href="#">
//                     <img
//                         src="../images/old_logo.png"
//                         height="40"
//                         alt=""
//                         loading="lazy"
//                     />
//                 </a>
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                     <li className="nav-item">
//                         <NavLink className='nav-link btn btn-rounded'
//                                  to="/commonAnalysis">Сотрудники</NavLink>
//                     </li>
//                     <li className="nav-item ms-4">
//                         <NavLink className='nav-link btn btn-rounded'
//                                  to="/actions">Roadmap</NavLink>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     )
// }
//
// const Settings = () => {
//     return (
//         <nav className="navbar navbar-expand-lg">
//             <div className="container-fluid d-flex align-items-center justify-content-between col-11 mt-1">
//                 <div className="d-flex">
//                     <NavLink
//                         className="text-reset me-4"
//                         to="/settings"
//                         role="button"
//                     >
//                         <i className="fas fa-cog fa-2x"></i>
//                     </NavLink>
//
//                     <a className='text-reset' href="/"><i className="fas fa-sign-out-alt fa-2x"></i></a>
//                 </div>
//
//                 <a
//                     className="dropdown-toggle d-flex align-items-center hidden-arrow"
//                     href="#"
//                     role="button"
//                     data-mdb-toggle="dropdown"
//                     aria-expanded="false"
//                 >
//                     <img
//                         src="https://mdbootstrap.com/img/new/avatars/2.jpg"
//                         className="rounded-circle"
//                         height="50"
//                         alt=""
//                         loading="lazy"
//                     />
//                 </a>
//             </div>
//         </nav>
//     )
// }
