import  React, { createContext, useContext } from "react";
import axios from "axios";

const ClientInfoContext = createContext();

export const ClientInfoContextProvider = ({children}) => {
    
    const GetIPAddress = async () => {
        const res = await axios.get('http://ip-api.com/json/');
        return res.data.query
    }
    const [clientIP, setClientIP] = React.useState();

    React.useEffect(() => {
        GetIPAddress().then(result => setClientIP(result))
    }, [])

    return (
        <ClientInfoContext.Provider value={{clientIP}}>
            {children}
        </ClientInfoContext.Provider>
    );
}

export const useClientInfo = () => useContext(ClientInfoContext)