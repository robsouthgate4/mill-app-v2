import React, { Component } from 'react';
import { Link } from 'react-router'

class NavLink extends Component {
    render() {

        let isActive = this.context.router.isActive(this.props.to, true)
        let className = isActive ? "current_selected" : "";

        return (
            <span className={className}>
                <Link {...this.props}/>
            </span>
        );
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object
};

export default NavLink;
