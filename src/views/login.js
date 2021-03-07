import React from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import { axiosInstance, parseJwt } from '../utils';

export default function Login(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    const onSubmit = async function (data) {
        try {
          const res = await axiosInstance.post('/auth', data);
          if (res.data.authenticated) {
            localStorage.todoApp_accessToken = res.data.accessToken;
            localStorage.todoApp_userId = parseJwt(res.data.accessToken).userId;
            // history.push(from.pathname);
            history.replace(from);
          } else {
            alert('Invalid login.');
          }
        } catch (err) {
          console.log(err.response.data);
        }
      }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Login</h3>
                <div className="fg">
                    <input type="text" name="email" placeholder="email" ref={register({ required: true })} autoFocus />
                    {errors.username && <span>*</span>}
                </div>
                <div className="fg">
                    <input type="password" name="password" placeholder="password" ref={register({ required: true })} />
                    {errors.password && <span>*</span>}
                </div>
                <div className="fg mt-3">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}