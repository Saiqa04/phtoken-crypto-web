import React, { useEffect, useState } from "react";
import logo from '../../../public/images/logo-racoins.png';
import twitter from '../../../public/images/twitter.png';
import telegram from '../../../public/images/telegram.png';
import discord from '../../../public/images/discord.png';
import AddCoin from "../pages/add-coin/add-coin-component";
import moment from "moment";

require('./coming-soon-component.scss');

const targetDate = moment("2022-07-15 00:00:00");
  
export default function ComingSoon() {

    const [currentDate, setCurrentDate] = useState(moment());
    const timeBetween = moment.duration(targetDate.diff(currentDate));
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(moment());
        }, 1000);

        return () => clearInterval(interval);
      },[])

    return(
        <div className="coming-soon-container">
                <div className="left-content">
                    <div className="header">
                        <div className="logo-wrapper"><img src={logo}/></div>
                    </div>
                    <div className="content">
                        <p>SOMETHING AWESOME <br />IS COMING SOON</p>
                        <span>We are almost there, stay tuned! For the meantime, 
                            <br />you can join our group or submit your coin.</span>
               
                        <div className="timer">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div className="time">{timeBetween.days()}</div>
                                </div>
                                <span className="timer-label">Days</span>
                            </div>
                            <div className="separator">:</div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div className="time">{timeBetween.hours()}</div>
                                </div>
                                <span className="timer-label">Hours</span>
                            </div>
                            <div className="separator">:</div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div className="time">{timeBetween.minutes()}</div>
                                </div>
                                <span className="timer-label">Minutes</span>
                            </div>
                            <div className="separator">:</div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div className="time">{timeBetween.seconds()}</div>
                                </div>
                                <span className="timer-label">Seconds</span>
                            </div>
                        </div>

                        <a className="button" href="mailTo:support@racoins.cc" target="_blank">Contact us</a>

                        <div className="groups">
                            <a href="https://t.me/racoinsofficial" target="_blank"><img src={telegram}/></a>
                            <a href="#" target="_blank"><img src={discord}/></a>
                            <a href="#" target="_blank"><img src={twitter}/></a>
                        </div>
                    </div>
                </div>
                
                <div className="add-coin-form">
                    <div className="form-header">
                        <span>
                            LIST YOUR COIN
                        </span>
                    </div>
                   <AddCoin />
                </div>
                <div className="groups-mobile-view">
                    <a href="https://t.me/racoinsofficial" target="_blank"><img src={telegram}/></a>
                    <a href="#" target="_blank"><img src={discord}/></a>
                    <a href="#" target="_blank"><img src={twitter}/></a>
                </div>
        </div>
    );
}