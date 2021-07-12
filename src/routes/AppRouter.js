/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config'
import JournalPage from '../components/journal/JournalPage';
import AuthRouter  from './AuthRouter';
import { login } from '../actions/auth';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { startLoadingNotes } from '../actions/notes';

const AppRouter = () => {

    const dispatch = useDispatch();
    const [check, setCheck] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {
            if( user?.uid ){
                dispatch(login(user.uid, user.displayName));
                setIsLogged(true);
                dispatch(startLoadingNotes(user.uid));
            }else{
                setIsLogged(false);
            }

            setCheck(false);
        })
    }, [ dispatch, setCheck, setIsLogged ])

    if(check){
        return <div className="auth__login-screen"></div>
    }




    return (
        <Router>
            <div>

                <Switch>
                    <PublicRoutes
                        isLogged={isLogged}
                        path='/auth' 
                        component={AuthRouter} />
                    <PrivateRoutes
                        isLogged={isLogged}
                        exact 
                        path='/' 
                        component={JournalPage} />
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;
