import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { axiosInstance } from '../utils';

export default function Accountinfo(props) {
    const history = useHistory();
    const btnSignOut_Clicked = function() {
        delete localStorage.account_accessToken;
        delete localStorage.account_userID;
        delete localStorage.account_expToken;
        delete localStorage.account_refreshToken;
        delete localStorage.account_email;
        delete localStorage.account_type;
        history.push('/home');
        
    }

    return (
        <div>
            <span>Email: {localStorage.account_email}</span>
            {/* <button onClick={btnSignOut_Clicked}><Link to="/home" replace >Sign Out</Link></button> */}
            <button onClick={btnSignOut_Clicked}>Sign Out</button>
        </div>
    )
}
