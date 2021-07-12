/* eslint-disable prettier/prettier */
import { createContext } from "react";

const AuthContext = createContext({
    auth: null,
    user: null,
    login: () => null,
    logout: () => null,
    setReloaderUser: () => null
});

export default AuthContext;