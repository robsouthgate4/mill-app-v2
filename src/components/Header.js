import React, {PropTypes} from 'react'
import logo from '../assets/images/admin/header/logotype.png'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import {logout} from '../modules/login/actions'

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {logout, location} = this.props
        const isArchiveSection = location.pathname.includes('/archive')

        return (
            <div className="header" id="header">
                <div className="header-logo">
                    <Link to="/"><img src={logo} alt=""/></Link>
                </div>
                <div className="main-navigation">
                    <div className="">
                        <NavLink activeClassName="current_selected" to="/archives">Work</NavLink>
                    </div>
                    <div className="">
                        <NavLink activeClassName="current_selected" to="/categories">Categories</NavLink>
                    </div>
                </div>
                {isArchiveSection && (
                    <div className="search-container">
                        <input type="text" placeholder="Search works" name="search" id="search"/>
                    </div>
                )}

                <div className="log-out">
                    <a href="#" onClick={(evt) => {
                        evt.preventDefault();
                        logout()
                    }} title="Logout">Logout</a>
                </div>
            </div>
        );
    }
}

const connected = connect(state => ({}), {logout})(Header)

export default connected
