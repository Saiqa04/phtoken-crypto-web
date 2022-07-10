import React from "react";

export function ErrorHandler({error}) {
    return (
        <div>
            <p style={{color: 'white',
                marginLeft: 20, fontSize: 12
            }}>An error occurred, Please contact administrator of the page</p>
        </div>
    );
}