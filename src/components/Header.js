import React, {PropTypes} from 'react'
import logo from '../../assets/images/admin/header/logotype.png'
import { Link } from 'react-router'
import NavLink from './NavLink'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="header" id="header">
        <div className="header-logo">
		    <Link to="/"><img src={logo} alt=""/></Link>
	    </div>
        <div className="main-navigation">
				<div className="">
                    <NavLink to="/archives">Work</NavLink>
				</div>
				<div className="">
                    <NavLink to="/categories">Categories</NavLink>
				</div>
			</div>
    </div>);
  }
}
