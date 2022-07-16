import { useLazyQuery, useQuery } from '@apollo/client';
import React, { Component, useEffect, useState } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import {GET_COIN_BY_NAME_OR_ADDRESS, LOGIN} from '../../services/graphql';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../public/images/logo-racoins.png';
import {twitter, telegram} from '../../utils/SvgIcons';
require('./header-component.scss');

export default function Header() {

    const [searchQuery, setSearchQuery] = React.useState("");
    const [hasResult, setHasResult] = React.useState();
    const [expand, setExpand] = React.useState(false);

    const [getCoin, {loading: coinLoading, data: coinData}] = useLazyQuery(GET_COIN_BY_NAME_OR_ADDRESS)


    const handleBlur = () => {
        if(searchQuery !== ""){
            getCoin({
                variables: {
                    name: searchQuery,
                    contractAddress:searchQuery
                }
            })

            setHasResult(true);
        }   
    }
    const handleSearch = (event) => {
        const target = event.target;

        setSearchQuery(target.value);

        if(target.value === ""){
            setHasResult(false);
        }
    }
    const navigate = useNavigate();
    const viewCoinDetails = (coinInfo) => {
        navigate(`/coin/${coinInfo.Symbol}`, {
            state: coinInfo
        });
        setSearchQuery("");
        setHasResult(false);
    };

    const handleMobileViewNav = () => {
        if(expand){
            setExpand(false);
        }else{
            setExpand(true);
        }
    }

    const location = useLocation();
    useEffect(() => {
        setExpand(false);
    },[location])
    return (
        <div className="header-container">
            <div className='mini-header-container'>
                <div>
                    <p>List your token for <span>FREE</span>&nbsp;&nbsp;-&nbsp;Discover the next <span>GEM</span> with <span>Racoins.cc</span></p>
                </div>
                <div className='our-group'>
                    <span>Twitter</span><a style={{marginRight: 15}}>{twitter}</a>
                    <span>Telegram</span><a href='https://t.me/racoinsofficial' target='_blank'>{telegram}</a>
                    
                </div>
            </div>
            <div className='header-wrapper'>
                <div className="logo">
                    <a style={{float: 'left'}} href='/'><img src={logo}/></a>
                </div>
                <div className='responsive-wide'>
                    <div className='search-box'>
                            <input type="text" onChange={(e) => handleSearch(e)} onBlur={handleBlur}  
                                value={searchQuery} placeholder="Search Name / Address..."/> 
                            <i className="fa-solid fa-magnifying-glass icon"></i>                   
                            {
                                ///the user typed anything on the search box -- Handled by onBlur Event
                            hasResult === true ? 
                            <>
                                <div className='result-wrapper'>
                                    {coinLoading ? <p>Loading...</p> : coinData ? 
                                    <>
                                        <p>Results ({coinData.CoinByNameOrAddress.length})</p>
                                        <div className='result'>
                                            <table>
                                                <tbody>
                                                    {coinData.CoinByNameOrAddress.map((row) => 
                                                    <tr key={row.CoinID}>
                                                        <td><img src={row.LogoLink}/></td>
                                                        <td onClick={() => viewCoinDetails(row)}>{row.Name}</td>
                                                        <td>{row.Symbol}</td>
                                                    </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div> 
                                    </> : <p>No result found.</p>
                                    }
                                </div>
                            </>   
                            : <></>
                            }
                    </div>
                    <hr />
                    <div className='action-button'>
                        <a href="/booking" className='promote-coin-button'>Service Booking</a>
                        <a href="/add-coin" className='list-coin-button'>Submit Coin</a>
                    </div>
                </div>
                <div className='responsive-mobile'>
                        <a onClick={handleMobileViewNav}><i className="fas fa-bars"></i></a>
                        <div className={expand === true ? "mobile-nav open" : "mobile-nav collapse"}>
                            <div className='nav-buttons'>
                                <NavLink to="/add-coin">Submit Coin</NavLink>
                            </div>
                            <div className='nav-buttons'>
                                <NavLink to="/booking">Advertise | Services</NavLink>
                            </div>
                            <div className='nav-buttons'>
                                <input type="text" onChange={(e) => handleSearch(e)} onBlur={handleBlur}  
                                    value={searchQuery} placeholder="Search Name / Contract address"/>
                                {
                                    ///the use typed anything on the search box -- Handled by onBlur Event
                                hasResult === true ? 
                                <>
                                    <div className='result-mobile-wrapper'>
                                        {coinLoading ? <p>Loading...</p> : coinData ? 
                                        <>
                                            <p>Results</p>
                                            <div className='result'>
                                                <table>
                                                    <tbody>
                                                        {coinData.CoinByNameOrAddress.map((row) => 
                                                        <tr key={row.CoinID}>
                                                            <td><img src={row.LogoLink}/></td>
                                                            <td onClick={() => viewCoinDetails(row)}>{row.Name}</td>
                                                            <td>{row.Symbol}</td>
                                                        </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div> 
                                        </> : <p>No result found.</p>
                                        }
                                    </div>
                                </>   
                                : <></>
                                }
                            </div>
                            <div className='coin-nav'>
                                <div className='nav-buttons'>
                                    <NavLink to="/">All Coins</NavLink>
                                </div>
                                <div className='nav-buttons'>
                                    <NavLink to="/new-coins">New Coins</NavLink>
                                </div>
                                <div className='nav-buttons'>
                                    <NavLink to="/doxxed">Doxxed</NavLink>
                                </div>
                                <div className='nav-buttons'>
                                    <NavLink to="/presale">Presale</NavLink>
                                </div>
                            </div>
                        </div>
                </div>
            </div>  
        </div>
    );
}