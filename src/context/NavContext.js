/* eslint-disable prettier/prettier */
import { createContext } from "react";

const NavContext = createContext({
    products: null,
    setReloadNav: () => null,
});

export default NavContext;