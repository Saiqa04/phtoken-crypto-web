import {
    NavLink
} from "react-router-dom";
import React, { Component } from 'react';

require('./nav-component.scss');


class NavPage extends Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        return (
            <div className="navbar-container">
                <div className="left navlinks">
                    <NavLink to="/" activeclassname="active"><i className="fas fa-rocket">&nbsp;</i>&nbsp;Today's Top</NavLink>
                    <NavLink to="/new-coins"><i className="fas fa-coins">&nbsp;</i>&nbsp;New Coins</NavLink>
                    <NavLink to="/all-coins"><i className="fas fa-list-ol">&nbsp;</i>&nbsp;All Coins</NavLink>
                    <NavLink to="/all-time-best"><i className="fas fa-chart-simple">&nbsp;</i>&nbsp;All time best</NavLink>
                    <NavLink to="/doxxed"><i className="fas fa-file-shield">&nbsp;</i>&nbsp;Doxxed</NavLink>
                    <NavLink to="/presale"><i className="fas fa-bullhorn">&nbsp;</i>&nbsp;Presales</NavLink>
                </div>
                <div className="right">
                   
                </div>
            </div>
        );
    }
}


export default NavPage;