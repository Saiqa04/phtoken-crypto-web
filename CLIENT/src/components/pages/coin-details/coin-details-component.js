import * as moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, NavLink, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet";
import {VOTE_COIN, GET_COIN_BY_PK} from '../../../services/graphql'
import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, Box } from '@mui/material';
import {svgArrowUp, svgArrowDown} from '../../../utils/SvgIcons';
import MessageSnackBar from '../../../popups/MessageSnackBar';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useMarketDataContext } from '../../../context/MarketDataContext';
import poocoinLogo from '../../../../public/icons/poocoin-logo.png';
import dextoolLogo from '../../../../public/icons/dextools-logo.png';
import pancakeswapLogo from '../../../../public/icons/pancakeswap-cake-logo.png';
import uniswapLogo from '../../../../public/icons/uniswap-uni-logo.png';
import { FetchCoin24hChange, FetchCoinMarketCap, FetchCoinPrice, FetchLiquidity } from '../../../helpers/CoinDataHelper';
require('./coin-details-component.scss');


function CoinDetails() {

    const [snackBar, setSnackBar] = useState({
        type: "success",
        message: "",
        open: false
    })

    const location = useLocation();
    const {state} = useLocation();
    const navigate = useNavigate();
    let getCoinIdInUrl = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    const [clipboard, setClipboard] = useState({
        copied: false
    })

   
    const [addVote, {loading: addVoteLoading}] = useMutation(VOTE_COIN, {
        refetchQueries: [{query: GET_COIN_BY_PK, variables: { coinId: getCoinIdInUrl }}],
        awaitRefetchQueries: true,
        onError: ({graphQLErrors}) => {
            if(graphQLErrors)
                graphQLErrors.forEach(({message}) => 
                    setSnackBar({
                        type: "error",
                        message: message,
                        open: true
                    })
                )
        }
    });
    const {loading, data} = useQuery(GET_COIN_BY_PK, {
        variables: {
            coinId: getCoinIdInUrl
        },
        onError: () => {
            navigate('/');
        }
    });

    const handleVoteClick = () => {
        if(!data?.CoinByID.IsUpvoted) {     
            addVote({
                variables: { coinId: getCoinIdInUrl },
                onCompleted: () => {
                    setSnackBar({
                        type: "success",
                        message: "Thank you for voting!.",
                        open: true
                     })
                }
            })
        }else{
            setSnackBar({
               type: "error",
               message: "You can vote the same coin once a day",
               open: true
            })
        } 
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
            setSnackBar({
                ...snackBar,
                open: false
            })
    };
    
    const twitterTimeline = (
        <>
            <a className="twitter-timeline" data-height="600px" data-theme="dark" href={`${data?.CoinByID.Twitter}`}> tweets by {data?.CoinByID.Symbol}</a>
            <Helmet><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script></Helmet>
        </>
    )

    return (
        <div className='coin-details-container'>
            <MessageSnackBar open={snackBar.open} type={snackBar.type} close={handleCloseSnackbar} message={snackBar.message}/>
            <div className='nav'>
                <NavLink to="/">Home&nbsp;/</NavLink>
                <NavLink to="/all-coins">&nbsp;Coins&nbsp;/</NavLink>
                <a>&nbsp;{data?.CoinByID.Name}</a>
            </div>
            <div className='flex-container'>
                <div className='info-wrapper'>
                    <div className="coin-info">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? <div>
                            <div className='logo-name-wrapper'>
                                <img src={data.CoinByID.LogoLink}/>
                                <div>
                                    <div className="name">
                                        <h3>{data.CoinByID.Name}</h3>
                                        <span className="symbol">{"$" + data.CoinByID.Symbol}</span>
                                        <span className="chain">{data.CoinByID.Chain}</span>
                                    </div>
                                    <div className="coin-ca">{data.CoinByID.Chain} Address: <span>{data.CoinByID.ContractAddress}</span>
                                        <CopyToClipboard text={data.CoinByID.ContractAddress} onCopy={() => setClipboard({
                                                copied: true}
                                            )}>
                                            <button className='copyToClipboard'>{clipboard.copied ? "Copied" : "Copy"}</button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            <div className="css_vlcom">
                                <div>Votes: <span>{data.CoinByID.AllTimeVote}</span></div>
                                <div>Today: <span>{data.CoinByID.VoteToday}</span></div>
                                <div>Launch: <span>{moment(data.CoinByID.LaunchDate).format("MMMM Do YYYY")}</span></div>
                            </div>
                            <p style={{fontSize:11, color: '#8f8f8f'}}>Vote to support your community.</p>
                            <div className="chart">
                                <iframe width="100%" height="600"
                                    allowFullScreen frameBorder="0" scrolling="no"
                                    src={`https://coinbrain.com/embed/${data.CoinByID.ContractAddress}?theme=dark&chart=1&trades=1`}></iframe>
                            </div>
                            <div className='vote'>
                                <button disabled={addVoteLoading} className={(data.CoinByID.IsUpvoted ? "voted" : "normal")} 
                                onClick={() => handleVoteClick()}>{data.CoinByID.IsUpvoted ? "VOTED" : `VOTE FOR ${data.CoinByID.Name}`}</button>
                            </div>
                        </div> :  <div></div>
                        }
                    </div>
                    <div className="coin-description">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? 
                            <div> <h3>Coin Description:</h3>
                                <span>{data?.CoinByID.Description}</span>
                            </div>
                        :  <div></div>
                        }
                    </div>
                </div>
                <div className="side-wrapper">
                    <div className="market-data-container">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? 
                            <div>
                            <h3>{data?.CoinByID.Symbol} Market Data</h3>
                                <div><p>Price (USD): <FetchCoinPrice data={data?.CoinByID}/></p></div>
                                <div><p>Price Change (24hr): <FetchCoin24hChange data={data?.CoinByID}/></p></div>
                                <div><p>Marketcap: <FetchCoinMarketCap data={data?.CoinByID}/></p></div>
                                <div><p>Total Liquidity (USD): <FetchLiquidity data={data?.CoinByID}/></p></div>
                            </div> 
                        :  <div></div>
                        } 
                    </div>
                    <div className="charts-container">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? 
                            <div>
                                <h3>Charts & Prices</h3>
                                {data?.CoinByID.Chain === 'BSC' ? 
                                    <>  
                                    <a target="_blank" href={`https://poocoin.app/tokens/${data?.CoinByID.ContractAddress}`} className="chart"><img src={poocoinLogo}/>PooCoin</a>
                                    <a target="_blank" href={`https://www.dextools.io/app/bsc/pair-explorer/${data?.CoinByID.ContractAddress}`} className="chart"><img src={dextoolLogo}/>DexTools</a>
                                    </>
                                   : data?.CoinByID.Chain === 'ETH' ? 
                                    <a target="_blank" href={`https://www.dextools.io/app/ether/pair-explorer/${data?.CoinByID.ContractAddress}`} className="chart"><img src={dextoolLogo}/>DexTools</a>
                                   : <></>}
                                </div>
                        :  <div></div>
                        }
                    </div>
                    <div className="swaps-container">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? 
                            <div className='swap-wrapper'>
                                <span>Trade on</span>
                               {data?.CoinByID.Chain === 'BSC' ? 
                                 <a className='swap' target="_blank" href={`https://pancakeswap.finance/swap?outputCurrency=${data?.CoinByID.ContractAddress}`}><img src={pancakeswapLogo}/>PancakeSwap</a>
                               : data?.CoinByID.Chain === 'ETH' ? 
                                 <a  className='swap' target="_blank" href={`https://app.uniswap.org/#/swap?inputCurrency=${data?.CoinByID.ContractAddress}`}><img src={uniswapLogo}/>UniSwap</a>
                               : <span className='swap swap-noExchange'>No exchange</span>}
                            </div>
                        :  <div></div>
                        }
                    </div>
                    <div className="community-container">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? 
                            <div>
                                <div>
                                    {data.CoinByID.Telegram !== "" ? <a target="_blank" href={data.CoinByID.Telegram} className="telegram"><i className="fa-brands fa-telegram"></i>&nbsp;Telegram</a> : ""}
                                    {data.CoinByID.Twitter !== "" ?  <a target="_blank" href={data.CoinByID.Twitter} className="twitter"><i className="fa-brands fa-twitter"></i>&nbsp;Twitter</a> : ""}
                                    {data.CoinByID.Discord !== "" ? <a target="_blank" href={data.CoinByID.Discord} className="discord"><i className="fa-brands fa-discord"></i>&nbsp;Discord</a> : ""}
                                    {data.CoinByID.Website !== "" ? <a target="_blank" href={data.CoinByID.Website} className="website"><i className="fa-solid fa-globe"></i>&nbsp;Website</a> : ""}
                                </div>
                            </div>
                        :  <div></div>
                        }
                    </div>
                    <div>
                         {twitterTimeline}
                     </div>
                </div>
            </div>
        </div>
    )
};

export default CoinDetails;