import React from 'react';
import { useHistory } from 'react-router-dom';
export default function Accountinfo(props) {
    const history = useHistory();
    const btnSignOut_Clicked = function() {
        delete localStorage.account_accessToken;
        delete localStorage.account_ID;
        delete localStorage.account_email;
        history.push('/home');
    }

    return (
        <div>
            <span>Email: {localStorage.account_email}</span>
            <button onClick={btnSignOut_Clicked}>Sign Out</button>
        </div>
    )
}
