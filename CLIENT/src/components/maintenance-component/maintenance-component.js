import React from "react";
import logo from '../../../public/images/logo-racoins.png';
import twitter from '../../../public/images/twitter.png';
import telegram from '../../../public/images/telegram.png';
import discord from '../../../public/images/discord.png';
import bg from '../../../public/images/maintenance-bg.jpg';

require('./maintenance-component.scss');

export default function Maintenance() {
    return(
        <div className="maintenance-container">
                <div className="left-content">
                    <div className="header">
                        <div className="logo-wrapper"><img src={logo}/></div>
                    </div>
                    <div className="content">
                        <p>We're currently <br />down for maintenance</p>
                        <span>Sorry for any inconveniences caused, <br />
                            We'll be back online as soon as possible. Thanks for your patience.</span>
                        <a className="button" href="mailTo:support@racoins.cc" target="_blank">Contact us</a>

                        <div className="groups">
                            <a href="https://t.me/racoinsofficial" target="_blank"><img src={telegram}/></a>
                            <a href="#" target="_blank"><img src={discord}/></a>
                            <a href="#" target="_blank"><img src={twitter}/></a>
                        </div>
                    </div>
                </div>
                <div className="bg">
                    <img src={bg}/>
                </div>
        </div>
    );
}