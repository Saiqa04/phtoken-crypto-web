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
                    <NavLink to="/"><i className="fas fa-list-ol">&nbsp;</i>&nbsp;All Coins</NavLink>
                    <NavLink to="/new-coins"><i className="fas fa-coins">&nbsp;</i>&nbsp;New Coins</NavLink>
                    <NavLink to="/doxxed"><i className="fas fa-file-shield">&nbsp;</i>&nbsp;Doxxed</NavLink>
                    <NavLink to="/presale"><i className="fas fa-bullhorn">&nbsp;</i>&nbsp;Presales</NavLink>
                    
                    <div className="right">
                        <span>Coin can be upvoted every 24 hours.</span>
                    </div>
                </div>
            </div>
        );
    }
}


export default NavPage;