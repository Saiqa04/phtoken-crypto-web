import { useMutation } from '@apollo/client';;
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {ADD_COIN} from '../../../services/graphql';
import { CircularProgress } from '@mui/material';
import { useChainContext } from '../../../context/ChainContext';
import MessageSnackBar from '../../../popups/MessageSnackBar';
import { Helmet } from 'react-helmet';

require('./add-coin-component.scss');

        
const initialValues = {
    name: "",
    symbol: "",
    chain: "BSC",
    address: "",
    description: "",
    isPresale: false,
    launchDate: "",
    telegram: "",
    website: "",
    twitter: "",
    discord: "",
    audit: "",
    logo: "",
    contactEmail: ""
}

export default function AddCoin(){
    const [snackBar, setSnackBar] = useState({
        type: "success",
        message: "",
        open: false
    })

    const {chains} = useChainContext();
    
    const [values, setValues] = useState(initialValues);
    
    const [addCoin, {error, loading}] = useMutation(ADD_COIN, {
        onCompleted: () => {
            setSnackBar({
                type: "success",
                message: "You have successfully added new coin.",
                open: true
            })
            setValues(initialValues)
        },
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


    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setValues({
            ...values,
            [name]: value
        })
    }


   const fieldsIsValid = () => {
        var checkDateFormat = moment(values.launchDate, "YYYY-MM-DD", true).isValid();
        if(!checkDateFormat){
            setSnackBar({
                type: "warning",
                message: "You have entered a wrong date format.",
                open: true
            })
            return false;
        }else if(values.name == "" || values.symbol == "" 
            || values.chain == "" ||values.address == ""
            || values.description == "" || values.launchDate == "" 
            || values.telegram  == "" || values.contactEmail == "") {
                
                setSnackBar({
                    type: "warning",
                    message: "Please fill in the required fields.",
                    open: true
                })
                return false;
        } else {
            return true;
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


   const handleSubmit = (e) => {      
       e.preventDefault();

       if(fieldsIsValid() === false){
            return;
       }

       addCoin({
           variables: {
            name: values.name,
            symbol: values.symbol,
            chain: values.chain,
            contractAddress: values.address, 
            description: values.description, 
            isPresale: values.isPresale, 
            launchDate: values.launchDate, 
            telegram: values.telegram, 
            website: values.website, 
            twitter: values.twitter, 
            discord: values.discord, 
            audit: values.audit, 
            logo: values.logo,
            contactEmail: values.contactEmail,
            status: "Pending"
           }
       })
    }
    return (
        <div className="add-coin-container">
            <Helmet>
                <title>Submit your token - Racoins.cc</title>
                <meta name="description" content="Finding new crypto gems made easy with Racoins.cc" />
            </Helmet>
             <MessageSnackBar open={snackBar.open} type={snackBar.type} close={handleCloseSnackbar} message={snackBar.message}/>
            <form onSubmit={handleSubmit}>
                <div className='form-wrapper'>
                    <div className='details'>
                        <h3>Coin Details</h3> 
                        <label>Name <span>Required</span></label>
                        <input type="text" name='name' value={values.name} onChange={handleInputChange} placeholder='eg. Bitcoin'/>
                        <label>Symbol <span>Required</span></label>
                        <input type="text" name='symbol' value={values.symbol} onChange={handleInputChange} placeholder='eg. BTC'/>
                        <label>Chain <span>Required</span></label>
                        <select name='chain' value={values.chain} onChange={handleInputChange}>
                           {chains?.map((chain) =>
                             <option key={chain.ChainSymbol} value={chain.ChainSymbol}>{chain.Name}</option>
                           )}
                        </select>
                        <label>Contact Address <span>Required</span></label>
                        <input type="text" name='address' value={values.address} onChange={handleInputChange} placeholder=''/>
                        <label>Description <span>Required</span></label>
                        <textarea type="text" name='description' value={values.description} onChange={handleInputChange} placeholder='' rows={4}/>
                        <div className='radio' style={{marginBottom: 10}}>
                            <label>In presale phase? 
                                <input type="checkbox" name='isPresale' checked={values.isPresale === true} onChange={handleInputChange}/>
                                Yes
                            </label>
                        </div>
                        <label>Launch Date (YYYY-MM-DD) <span>Required</span></label>
                        <input type="text" name='launchDate' value={values.launchDate} onChange={handleInputChange} placeholder=''/>

                        <h3>Contact Info<br/>
                        <span style={{fontSize:12, padding: 0, fontWeight: 300}}>For later changes, Please provide the following.</span> </h3>
                        <label>Email / Telegram <span>Required</span></label>
                        <input type="text" name='contactEmail' value={values.contactEmail} onChange={handleInputChange} placeholder=''/>
                    </div>
                    <div className='links'>
                        <h3>Links</h3>
                        <label>Telegram <span>Required</span></label>
                        <input type="text" name='telegram' value={values.telegram} onChange={handleInputChange} placeholder='eg. https://t.me/Bitcoin'/>
                        <label>Website</label>
                        <input type="text" name='website' value={values.website} onChange={handleInputChange} />
                        <label>Twitter</label>
                        <input type="text" name='twitter' value={values.twitter} onChange={handleInputChange}/>
                        <label>Discord</label>
                        <input type="text" name='discord' value={values.discord} onChange={handleInputChange}/>
                        <label>Audit</label>
                        <input type="text" name='audit' value={values.audit} onChange={handleInputChange}/>
                        <label>Logo <span>Required</span></label>
                        <input type="text" name='logo' placeholder='eg. https://i.ibb.co/42fVQ3z/logo.png' value={values.logo} onChange={handleInputChange}/>
                        <label style={{fontSize: 11}}>Upload your logo to your preferred image hosting.</label>
                    </div>
                </div>
                <div className='submit'>
                    <button disabled={loading} type='submit'>{loading ? <CircularProgress size={20}/> : "Submit"}</button>
                </div>
            </form>
        </div>
    );
}
