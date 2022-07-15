import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ADD_RESERVATION, GET_RESERVATION_BY_NUMBER} from '../../../services/graphql';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import MessageSnackBar from '../../../popups/MessageSnackBar';
import { PageTitle } from '../../../helpers/PageTitleHelper';

require('./booking-promo-component.scss');
require('../../../styles/calendar.scss')

function makeReservationKey() {
    var text = "";
    var possible = "0123456789";
  
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

export default function PromoteAndBooking(){
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [telegram, setTelegram] = useState("");
    const [adType, setAdType] = useState();
    const [calendarType, setCalendarType] = useState("StartDate");
    const currDate = moment(new Date()).add(1,'day');
    const [buttonCalTypeText, setButtonCalTypeText] = useState()
    const [openModal, setOpenModal] = React.useState(false);
    const [number, setNumber] = React.useState("");
    const [snackBar, setSnackBar] = useState({
        type: "success",
        message: "",
        open: false
    })

    const [addReservation, {loading: addResrvLoading}] = useMutation(ADD_RESERVATION, {
        onCompleted: () => {
            setSnackBar({
                type: "success",
                message: "You have successfully submitted your reservation.",
                open: true
            })
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

    const [getReservationByNumber, {loading, data}] = useLazyQuery(GET_RESERVATION_BY_NUMBER, {
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

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackBar({
            ...snackBar,
            open: false
        })
    };
    
    const handClickOpenDialog = () => {
        if(adType === undefined){
            setSnackBar({
                type: "error",
                message: "No Ad. type selected, cannot procced.",
                open: true
            })
            return;
        }

        if(moment(startDate).startOf('d') > moment(endDate).endOf('d')){
            setSnackBar({
                type: "error",
                message: "Invalid dates, cannot procced.",
                open: true
            })
            return;
        }
        
        setOpenModal(true);
        
    };
  
    const handleCloseDialog = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        PageTitle({
            title: `Promote your coin - Racoins.cc`,
            description: `Finding new crypto gems made easy with Racoins.cc`
        })

        setStartDate(new Date(currDate));
        setEndDate(new Date(currDate));
        setButtonCalTypeText("Click to select ending date");
    },[])

    const handleCalendarTypeClick = () => {
        if(calendarType === "StartDate"){
            setCalendarType("EndDate")
            setButtonCalTypeText("Click to select starting date");

        }else if (calendarType === "EndDate"){
            setCalendarType("StartDate")
            setButtonCalTypeText("Click to select ending date");
        }
    }
    const handleClickBookNow = (e) => {
        e.preventDefault();
        if(telegram === "" || telegram === null){
            setSnackBar({
                type: "error",
                message: "Please enter your telegram account",
                open: true
            })
            return;
        }
        addReservation({
            variables: {
                number: "CCN00" + makeReservationKey(),
                adType: adType,
                startDate: startDate,
                endDate: endDate,
                telegram: telegram,
                amountToPay: totalPrice,
                discount: discount,
                paymentStatus: "Pending"
            }
        })
        setOpenModal(false);
    }
   
    const textFieldTelegramOnChange = (e) => {
        setTelegram(e.target.value)
    }

   const DialogForm = (
        <Dialog open={openModal} onClose={handleCloseDialog}>
            <DialogTitle>Reservation</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To continue with your reservation, please enter your telegram address here.
                    We will contact you through it.
                </DialogContentText>
                <TextField autoFocus
                    margin="dense" value={telegram} onChange={textFieldTelegramOnChange} 
                    name="telegram"  id="telegram" label="Telegram" type="text"
                    fullWidth variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button disabled={addResrvLoading} onClick={handleClickBookNow}>Book now</Button>
            </DialogActions>
        </Dialog>                 
    )

    //EDIT PRICES HERE
    const price = adType === "Rotating" ? 75 : 
                  adType === "Promote" ? 100 : 
                  adType === "Fixed" ? 200 : 0;

    const numDays = moment(endDate).endOf('d') >= moment(startDate).startOf('d') ? 
                    moment(endDate).endOf('day').diff(moment(startDate).startOf('day'), 'days') + 1 : 0; // Total Number of Days

    //EDIT DISCOUNT HERE
    const discount = numDays > 13 ? 0.30 : 
                     numDays > 6 ? 0.20 : 
                     numDays > 2 ? 0.10 : 0; //Discounts Percent
                 
    const subTotal = (price*numDays); //Without discount
    const totalPrice = (subTotal-(subTotal*discount));

    const handleChange = (e) => {
        setNumber(e.target.value)
    }

    return (
        <div className='pb-container'>
            <MessageSnackBar open={snackBar.open} type={snackBar.type} close={handleCloseSnackbar} message={snackBar.message}/>
            {DialogForm}
            <div className='pb-header'>
                <h3>Racoins Ad Booking</h3>
            </div>
              <div className='flex-row'>
                <div className='booking-process'>
                    <div>Follow our booking process:</div>
                    <div>1. &nbsp;Choose ad type (Rotating Banner Ads, Promoted Coin Spot or Standard Wide Banner)</div>
                    <div>2. Select reservation starting & ending date from the calendar.</div>
                    <div>3. Check the reservation summary.</div>
                    <div>4. Provide telegram account.</div>
                    <div>5. Submit your reservation "Book now".</div>
                    <div>Note: After reservation is completed, <br />we will contact you through telegram and follow up with your payment. 
                    <br />You can also message us directly via telegram or email.</div>
                </div>
                <div className='prices'>
                   
                </div>
              </div>
              <div className='booking-wrapper flex-row'>
                <div className='calendar-container'>
                    <h4>Choose Type & Select Date</h4>
                    <p>Click on Ad-type buttons and select dates:</p>
                    <div className='ad-spot'>
                        <button className={adType === "Rotating" ? "active button-theme" : "button-theme"} onClick={() => setAdType("Rotating")}>Rotating Banner</button>
                        <button className={adType === "Promote" ? "active button-theme" : "button-theme"}  onClick={() => setAdType("Promote")}>Promote Coin</button>
                        <button className={adType === "Fixed" ? "active button-theme" : "button-theme"}  onClick={() => setAdType("Fixed")}>Fixed Banner</button>
                    </div>
                    <div className='calendar-type-label'>- Choosing {calendarType === "StartDate" ? "Starting Date" : "Ending Date"} -</div>
                    <div className='calendar-container flex-row'>
                        <div className='calendar rotating-ad'>
                           {
                            calendarType === "StartDate" ? <Calendar onChange={setStartDate} value={startDate}  minDate={new Date(currDate)}/> :
                            calendarType === "EndDate" ? <Calendar onChange={setEndDate} value={endDate} minDate={startDate}/> : <></>
                           }
                            <div>
                                <button className='button-theme start_end-date' onClick={() => handleCalendarTypeClick()}>{buttonCalTypeText}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='summary-container'>
                    <div className='info-summary-wrp'>
                        <div className='your-reservation'>
                            <h4>Your reservation</h4>
                            <p>You can check the summary of your reservation here.</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>DATES</th>
                                        <th>AD TYPE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span>{moment(startDate).format('MMM DD')}</span> - <span className={startDate > moment(endDate).endOf('day') ? "invalid" : "end-date_valid"}>{moment(endDate).format('MMM DD, YYYY')}</span></td>
                                        <td>{adType === undefined ? "[Select Type]" : adType}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Selected Ad Type:</td>
                                        <td>{adType === undefined ? "[Select Type]" : adType}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Days:</td>
                                        <td>{numDays} Day(s)</td>
                                    </tr>
                                    <tr>
                                        <td>Ad Price:</td>
                                        <td>${price}</td>
                                    </tr>
                                    <tr>
                                        <td>Subtotal:</td>
                                        <td>${subTotal}</td>
                                    </tr>
                                    <tr>
                                        <td>Discount:</td>
                                        <td>{discount*100}%</td>
                                    </tr>
                                    <tr>
                                        <td>Total Price:</td>
                                        <td>${totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={handClickOpenDialog} className='button-theme reserve'><i className="fas fa-cart-shopping"></i>&nbsp;Book now</button>
                        </div>
                    </div>
                </div>
                <div className='prices-container-wide'>
                    <div className='info-price-wrp'>
                        <h4>Promote & Ad Prices</h4>
                        <p>Prices may change without notice</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Rotating Banner (300x100px)
                                    </td>
                                    <td>75$ / Day</td>
                                </tr>
                                <tr>
                                    <td>Promote Coin</td>
                                    <td>100$ / Day</td>
                                </tr>
                                <tr>
                                    <td>Fixed Banner (440x120px)</td>
                                    <td>200$ / Day</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Update  this jsx when there's a discount */}
                        <div style={{marginTop: 20}}>
                            <h4><i className="fas fa-percent"></i>&nbsp;Discounts</h4>
                            <p>Discount will automatically apply upon booking.</p>
                            <div className='discounts'>
                                <span>3+ Days&nbsp;- 10% Discount</span><br />
                                <span>7+ Days &nbsp;- 20% Discount</span><br />
                                <span>14+ Days - 30% Discount</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/* This div will not be visible unless its mobile */}
                <div className='prices-container-mobile'>
                    <div className='info-price-wrp'>
                    <h4>Promote & Ad Prices</h4>
                        <p>Prices may change without notice</p>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Rotating Ad (440x150px)</td>
                                    <td>100$ / Day</td>
                                </tr>
                                <tr>
                                    <td>Promoted Spot</td>
                                    <td>150$ / Day</td>
                                </tr>
                                <tr>
                                    <td>Wide Banner (1240x150px)</td>
                                    <td>300$ / Day</td>
                                </tr>
                            </tbody>
                        </table>
                         {/* Update  this jsx when there's a discount */}
                         <div style={{marginTop: 20}}>
                            <h4><i className="fas fa-percent"></i>&nbsp;Discounts</h4>
                            <p>Discount will automatically apply upon booking.</p>
                            <div className='discounts'>
                                <span>3+ Days&nbsp;- 10% Discount</span><br />
                                <span>7+ Days &nbsp;- 20% Discount</span><br />
                                <span>14+ Days - 30% Discount</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='reservation-table'>
                        <div className='textbox-search'>
                            <input type="text" name="r_number" value={number} onChange={handleChange} placeholder='Number e.g CCN00XXXXXXXX'></input>
                            <button className='button-theme' onClick={
                                () =>  getReservationByNumber({
                                        variables: {
                                            number: number
                                        }
                                })}>Search</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ad Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Booked by</th>
                                    <th>Amout</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {loading ? <tr></tr> : data ? <>
                                 <tr>
                                    <td>{data.ReservationByNumber.AdType}</td>
                                    <td>{data.ReservationByNumber.StartDate}</td>
                                    <td>{data.ReservationByNumber.EndDate}</td>
                                    <td>{data.ReservationByNumber.Telegram}</td>
                                    <td>{"$" + data.ReservationByNumber.AmountToPay.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}</td>
                                    <td>{data.ReservationByNumber.PaymentStatus}</td>
                                </tr>
                            </> : <tr></tr>}
                            </tbody>
                        </table>
                </div>
                <div className='promote-qstn_email'>
                    <p>For any question or inqueries, feel free to message us:<br />
                          <span>support@racoins.cc</span> or on Telegram <span>@RacoinsSupport</span>
                    </p>
                </div>
        </div>
       );
}
