/* eslint-disable prettier/prettier */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import LoginPage from '../components/Auth/Login';
import RegisterPage from '../components/Auth/Register';

const AuthRouter = () => {
    return (
        <>
            <div>
                <div>
                    <Switch>
                        <Route path='/auth/login' component={LoginPage} />
                        <Route path='/auth/register' component={RegisterPage} />
                        <Redirect from="/" to='/auth/login' />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default AuthRouter;
