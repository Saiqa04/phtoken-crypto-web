import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function HumanVerification(props){
    const {open, close, verificationResCallBack} = props;


    const onChangeRecaptcha = (value) => {
        verificationResCallBack(value)
    };

    return(
        <div>
            <Dialog
                open={open} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle style={{fontSize: 16}} id="alert-dialog-title">
                    {"Prove you are not a robot"}
                </DialogTitle>
                <DialogContent>
                    <ReCAPTCHA sitekey={`${process.env.SITE_KEY}`} onChange={onChangeRecaptcha}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}
