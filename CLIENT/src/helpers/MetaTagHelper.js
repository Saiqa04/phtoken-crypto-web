import React from "react";
import { Helmet } from "react-helmet";
import img from '../../public/images/logo-img-big.png';

const MetaTagHelper = ({title, description, imgUrl}) => {

    imgUrl = imgUrl || img;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title}/>
            <meta name="description" content={description}/>


            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={window.location.pathname + window.location.search}/>
            <meta property="og:image"content={imgUrl}/>

            <meta property="twitter:title" content={title}/>
            <meta property="twitter:description" content={description}/>
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={window.location.pathname + window.location.search}/>
            <meta property="twitter:image" content={imgUrl}/>
        </Helmet>
    )
}

export default MetaTagHelper;