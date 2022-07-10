import React, { useState } from "react";


export const NumberFormats = ({value}) => {
    
    const number = []
    let decimalSeparator = null;
    let power = 1;
    
    for (let i = 0; i < value.length; i++) {
        if(i < 2) {
            number.push(value[i]);
        }else if (i === 3) {
            number.push("_");
        }else{
            if(value[i] === "0"){
                power = power + 1;
            }else {
                number.push(value[i])
            }
        }
    }
    
    return number.toString().replace(/,/g, "").slice(0, 10);
}