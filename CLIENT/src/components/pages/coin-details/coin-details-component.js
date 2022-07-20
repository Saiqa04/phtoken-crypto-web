import * as moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, NavLink, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet";
import {VOTE_COIN, GET_COIN_BY_PK, GET_COIN_DETAILS} from '../../../services/graphql'
import { useMutation, useQuery } from '@apollo/client';
import { Skeleton, Box } from '@mui/material';
import MessageSnackBar from '../../../popups/MessageSnackBar';
import HumanVerification from '../../../popups/HumanVerification';
import CopyToClipboard from 'react-copy-to-clipboard';
import { copyIcon, moneyHand } from '../../../utils/SvgIcons';
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
    
    const [captchaOpen, setCaptchaOpen] = useState(false);
    const [captchaValue, setCaptchaValue] = useState();

    const location = useLocation();
    const {state} = useLocation();
    const navigate = useNavigate();
    let getCoinIdInUrl = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    const [clipboard, setClipboard] = useState({
        copied: false
    })

   
    const [addVote, {loading: addVoteLoading}] = useMutation(VOTE_COIN, {
        refetchQueries: [{query: GET_COIN_DETAILS, variables: { coinId: parseInt(getCoinIdInUrl) }}],
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
    const {loading, data} = useQuery(GET_COIN_DETAILS, {
        variables: {
            coinId: parseInt(getCoinIdInUrl)
        },
        onError: () => {
            setSnackBar({
                type: "error",
                message: `Cannot find ${getCoinIdInUrl}. You will be redirected to home page in 3s`,
                open: true
            })
            setTimeout(() => {
                window.location = "/"
            }, 3000);
        }
    });

    const handleVoteClick = () => {
        if(data?.CoinDetails.IsUpvoted) {     
            setSnackBar({
                type: "error",
                message: "You can vote the same coin once a day",
                open: true
            })
        }else{
            setCaptchaOpen(true);
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

    const handleCloseCaptcha = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCaptchaOpen(false);
    }
    
    const captchaCallBack = (value) => {
        if(value){
            addVote({
                variables: { coinId: data?.CoinDetails.CoinID },
                onCompleted: () => {
                    setSnackBar({
                        type: "success",
                        message: "Thank you for voting!.",
                        open: true
                     })
                }
            })
            setCaptchaOpen(false)
        }
    }

    const twitterTimeline = (
        <>
            <a className="twitter-timeline" data-height="600px" data-theme="dark" href={`${data?.CoinDetails.Twitter}`}> tweets by {data?.CoinDetails.Symbol}</a>
            <Helmet><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script></Helmet>
        </>
    )
    return (
        <div className='coin-details-container'>
            <MessageSnackBar open={snackBar.open} type={snackBar.type} close={handleCloseSnackbar} message={snackBar.message}/>
            <HumanVerification open={captchaOpen} close={handleCloseCaptcha} verificationResCallBack={(value) => captchaCallBack(value)}/>
            <div className='nav'>
                <NavLink to="/">Home&nbsp;/</NavLink>
                <NavLink to="/all-coins">&nbsp;Coins&nbsp;/</NavLink>
                <a>&nbsp;{data?.CoinDetails.Name}</a>
            </div>
            <div className='flex-container'>
                <div className='info-wrapper'>
                    <div className="coin-info">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? <div>
                            <div className='logo-name-wrapper'>
                                <img src={data.CoinDetails.LogoLink}/>
                                <div>
                                    <div className="name">
                                        <h3>{data.CoinDetails.Name}</h3>
                                        <span className="symbol">{"$" + data.CoinDetails.Symbol}</span>
                                        <span className="chain">{data.CoinDetails.Chain}</span>
                                    </div>
                                    <div className="coin-ca"><span>{data.CoinDetails.ContractAddress}</span>
                                        <CopyToClipboard text={data.CoinDetails.ContractAddress} onCopy={() => setClipboard({
                                                copied: true}
                                            )}>
                                            <button className='copyToClipboard'>{clipboard.copied ? "Copied" : copyIcon}</button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            <div className="css_vlcom">
                                <div>Votes: <span>{data.CoinDetails.AllTimeVote}</span></div>
                                <div>Today: <span>{data.CoinDetails.VoteToday}</span></div>
                                <div>Launch: <span>{moment(data.CoinDetails.LaunchDate).format("MMMM Do YYYY")}</span></div>
                            </div>
                            <p style={{fontSize:11, color: '#8f8f8f'}}>Vote to support your community.</p>
                            <div className='action-buttons'>
                                <button disabled={addVoteLoading} className={(data.CoinDetails.IsUpvoted ? "voted" : "normal")} 
                                onClick={() => handleVoteClick()}>{data.CoinDetails.IsUpvoted ? "VOTED" : `VOTE NOW`}</button>
                                {data.CoinDetails.IsPresale ? <a href={data.CoinDetails.PresaleLink} target="_blank">{moneyHand}Go to presale page</a> : <></>}
                            </div>
                        </div> :  <div></div>
                        }
                    </div>
                    <div className="chart">
                        <iframe width="100%" height="600" style={{borderRadius: 10, border: '1px solid #1d2744'}} allowFullScreen frameBorder="0" scrolling="no"
                            src={`https://coinbrain.com/embed/${data?.CoinDetails.ContractAddress}?theme=dark&chart=1&trades=1`}></iframe>
                    </div>
                    <div className="coin-description">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? 
                            <div> <h3>About {data?.CoinDetails.Name}</h3>
                                <span>{data?.CoinDetails.Description}</span>
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
                            <h3>{data?.CoinDetails.Symbol} Market Data</h3>
                                <div><p>Price (USD): <FetchCoinPrice data={data?.CoinDetails}/></p></div>
                                <div><p>Price Change (24hr): <FetchCoin24hChange data={data?.CoinDetails}/></p></div>
                                <div><p>Marketcap: <FetchCoinMarketCap data={data?.CoinDetails}/></p></div>
                                <div><p>Total Liquidity (USD): <FetchLiquidity data={data?.CoinDetails}/></p></div>
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
                                {data?.CoinDetails.Chain === 'BSC' ? 
                                    <>  
                                    <a target="_blank" href={`https://poocoin.app/tokens/${data?.CoinDetails.ContractAddress}`} className="chart"><img src={poocoinLogo}/>PooCoin</a>
                                    <a target="_blank" href={`https://www.dextools.io/app/bsc/pair-explorer/${data?.CoinDetails.ContractAddress}`} className="chart"><img src={dextoolLogo}/>DexTools</a>
                                    </>
                                   : data?.CoinDetails.Chain === 'ETH' ? 
                                    <a target="_blank" href={`https://www.dextools.io/app/ether/pair-explorer/${data?.CoinDetails.ContractAddress}`} className="chart"><img src={dextoolLogo}/>DexTools</a>
                                   : <span className='no-available'>No available charts</span>}
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
                               {data?.CoinDetails.Chain === 'BSC' ? 
                                 <a className='swap' target="_blank" href={`https://pancakeswap.finance/swap?outputCurrency=${data?.CoinDetails.ContractAddress}`}><img src={pancakeswapLogo}/>PancakeSwap</a>
                               : data?.CoinDetails.Chain === 'ETH' ? 
                                 <a  className='swap' target="_blank" href={`https://app.uniswap.org/#/swap?inputCurrency=${data?.CoinDetails.ContractAddress}`}><img src={uniswapLogo}/>UniSwap</a>
                               : <span className='swap no-available'>No exchange</span>}
                            </div>
                        :  <div></div>
                        }
                    </div>
                    <div className="community-container">
                        {loading ?  <Box sx={{ width: '100%' }}>
                                        <Skeleton /><Skeleton animation="wave" /><Skeleton animation={false} />
                                    </Box> : data ? 
                            <div>
                            <h3>Community</h3>
                                <div>
                                    {data.CoinDetails.Telegram !== "" ? <a target="_blank" href={data.CoinDetails.Telegram} className="telegram"><i className="fa-brands fa-telegram"></i>&nbsp;Telegram</a> : ""}
                                    {data.CoinDetails.Twitter !== "" ?  <a target="_blank" href={data.CoinDetails.Twitter} className="twitter"><i className="fa-brands fa-twitter"></i>&nbsp;Twitter</a> : ""}
                                    {data.CoinDetails.Discord !== "" ? <a target="_blank" href={data.CoinDetails.Discord} className="discord"><i className="fa-brands fa-discord"></i>&nbsp;Discord</a> : ""}
                                    {data.CoinDetails.Website !== "" ? <a target="_blank" href={data.CoinDetails.Website} className="website"><i className="fa-solid fa-globe"></i>&nbsp;Website</a> : ""}
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