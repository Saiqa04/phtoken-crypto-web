import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/images/logo-racoins.png';

require('./footer-component.scss');

function Footer (){
    return (
        <>
            <div className='footer-container'>
                <div className='content'>
                    <div className='logo'>
                        <a style={{float: 'left'}} href='/'><img src={logo}/></a>
                        <span style={{fontSize: 9, lineHeight: 7, color: '#fff',
                                    backgroundColor: '#c26732', borderRadius: 2, padding: '0px 2px'}}>Beta</span>
                    </div>
                    <div className='links'>
                        <div className='coin-list'>
                            <h4>Coin Lists</h4>
                            <div>
                                 <NavLink to="/">Today's Top</NavLink>
                            </div>
                            <div>
                                <NavLink to="/new-coins">New Coins</NavLink>
                            </div>
                            <div>
                                <NavLink to="/all-coins">All Coins</NavLink>
                            </div>
                            <div>
                                <NavLink to="/all-time-best">All Time Best</NavLink>
                            </div>
                            <div>
                                <NavLink to="/doxxed">Doxxed Coins</NavLink>
                            </div>
                            <div>
                                <NavLink to="/presale">Presale</NavLink>
                            </div>
                        </div>
                        <div className='services'>
                            <h4 className='header1'>Promotion & Services</h4>
                            <div>
                                 <NavLink to="/booking">Promote Coin</NavLink>
                            </div>
                            <div>
                                <NavLink to="/add-coin">Add Coin</NavLink>
                            </div>
                            <div>
                                <NavLink to="/booking">Advertise</NavLink>
                            </div>
                            <h4 className='header2'>Follow us</h4>
                            <div>
                                <a style={{marginRight: 10}} href="https://t.me/racoinsofficial"  target="_blank">Telegram</a>
                                <a style={{marginRight: 10}} href="#">Twitter</a>
                            </div>
                        </div>
                        <div className='company'>
                            <h4>Company</h4>
                            <div>
                                <a href='/terms-and-conditions'>Terms & Conditions</a>
                            </div>
                            <div>
                                <a href='/privacy-policy'>Privacy Policy</a>
                            </div>
                            <div>
                                <a href='#'>Disclaimer</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{backgroundColor: '#0e1320', borderTop: '1px solid #181e2c', padding: 20, fontSize: 11}}>
                    <div style={{margin: '0 auto', maxWidth: 1380, color:'white'}}>Racoins &copy; 2022 | 
                        <span style={{fontSize: 12, textDecoration: 'none', color: '#3CAFF0'}}> support@racoins.cc</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;