import React from 'react'

export default function Login(props) {
    return (
        <form method="post" className="customStyle">
            <div className="container">
                <label htmlFor="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required />
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />
                <button type="submit">Login</button>
            </div>
        </form>
    )
}
