import React, { Component, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import useWindowDimensions from '../../utils/ScreenDimention';
import {GET_BANNER_ADS} from '../../services/graphql';
import { useQuery } from '@apollo/client';
import {telegramWithColor, pancake, websiteWWW} from '../../utils/SvgIcons';

require('./ads-component.scss');

export default function AdListing(){

    const {width} = useWindowDimensions();
    const {loading,data} = useQuery(GET_BANNER_ADS);
    const [swiperProps, setSwiperProps] = useState({
        loop: true,
        slidesPerView: 0
    })

    const displayRotatingBanner = () => {
        const bannerCount = data?.BannerAds.filter((e) => e.BannerType === "Rotating").length;
        if(width > 870) {
            setSwiperProps({
                loop: bannerCount > 4 ? true : false,
                slidesPerView: bannerCount > 4 ? 4 : bannerCount
            })
        }else {
            if(width < 870) {
                setSwiperProps({
                    loop: bannerCount > 4 ? true : false,
                    slidesPerView: 3
                })
            }
            if(width < 600) {
                setSwiperProps({
                    loop: bannerCount > 4 ? true : false,
                    slidesPerView: 2
                })
            }
        }
        
    }

    useEffect(() => {
        displayRotatingBanner();
    },[data, width])

    return (
        <div className='banner'>
             <div className='classic fixed-banner'>
                    {data?.BannerAds.filter((e) => e.BannerType === "Fixed").map((item) =>
                    <div className='wrapper' key={Math.random()}>
                        <div className='image-container'><a href={item.Telegram} target="_blank"><img src={item.ImageLocation}/></a></div>
                        <div className='banner-info'>
                            <span>{item.BannerName}</span>
                            <div className='links'>
                                <a href={item.Swap} target="_blank">{pancake}</a>
                                <a href={item.Website} target="_blank">{websiteWWW}</a>
                                <a href={item.Telegram} target="_blank">{telegramWithColor}</a>
                            </div>
                            <a className='join-button' href={item.Telegram} target="_blank">Join us!</a>
                        </div>
                    </div>
                )}
             </div>
            
             <Swiper
                loop={swiperProps.loop}
                slidesPerView={swiperProps.slidesPerView}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay]}
                className="rotating-coin-box">
                {data?.BannerAds.filter((e) => e.BannerType === "Rotating").map((item) =>
                <SwiperSlide style={{alignItems: 'left'}} key={Math.random()}>
                    <div className='rotating-coin-box'>
                        <div className='wrapper'>
                            <div className='box-coin-body'>
                                <img src={item.ImageLocation}/>
                                <div className='links'>
                                    <a href={item.Telegram} target="_blank">{telegramWithColor}</a>   
                                    <a href={item.Swap} target="_blank">{pancake}</a>
                                    <a href={item.Website} target="_blank">{websiteWWW}</a>
                                </div>
                            </div>
                            <p className='description'><span className='name'>{item.BannerName}&nbsp;</span>{item.Description}</p>
                        </div>
                    </div>
                </SwiperSlide>
                )}
             </Swiper>
        </div>
       );
}
