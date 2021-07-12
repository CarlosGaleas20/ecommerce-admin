/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { deleteToken, getMeUser, getToken, setToken } from './api/user';
import AuthContext from './context/AuthContext';
import AuthRouter from './routes/AuthRouter';
import { size } from 'lodash';

import Admin from "layouts/Admin.js";
import { getProducts } from 'api/products';
import NavContext from 'context/NavContext';

const AppAdmin = () => {

    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const [reloadNav, setReloadNav] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [reloaderUser, setReloaderUser] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setAuth({
                token,
                idUser: jwtDecode(token).id
            })
            setIsLogged(true);
        } else {
            setAuth(null);
            setIsLogged(false);
        }
        setReloaderUser(false);
    }, [reloaderUser])

    useEffect(async () => {
        const response = await getMeUser(logout);
        if (response) {
            setUser(response);
        } else {
            setUser(null);
        }
    }, [auth])

    useEffect(() => {
        (async () => {
            const response = await getProducts();
            if (size(response) > 0) setProducts(response);
            else (setProducts([]));
            setReloadNav(false);
        })()
    }, [reloadNav])


    const login = (token) => {
        setToken(token);
        setAuth({
            token,
            idUser: jwtDecode(token).id
        });
        setUser(jwtDecode(token));
        setIsLogged(true);
    }

    const logout = () => {
        if (auth) {
            deleteToken();
            setAuth(null);
            setReloaderUser(true);
        }
    }

    const authData = useMemo(() => ({
        auth,
        user,
        login,
        logout,
        setReloaderUser,
    }), [auth, user])

    const navData = useMemo(() => ({
        products,
        setReloadNav,
    }), [products])



    return (
        <>
            <AuthContext.Provider value={authData}>
                <NavContext.Provider value={navData}>
                    <BrowserRouter>
                        <Switch>
                            {
                                isLogged
                                    ? (
                                        <>
                                            <Route path="/admin" component={Admin} />
                                            <Redirect from="/" to="/admin/dashboard" />
                                        </>)
                                    : (
                                        <>
                                            <Route path="/auth" component={AuthRouter} />
                                            <Redirect from="/" to="/auth/login" />
                                        </>)
                            }
                        </Switch>
                    </BrowserRouter>
                </NavContext.Provider>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                />
            </AuthContext.Provider>

        </>
    )
}

export default AppAdmin;
