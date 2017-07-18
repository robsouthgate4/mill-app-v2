import React, {PropTypes} from 'react'
import logo from '../assets/images/admin/header/logotype.png'
import { Link, NavLink } from 'react-router-dom'

export const Header = (props) =>{
    return (<div className="header" id="header">
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
    </div>);
}
