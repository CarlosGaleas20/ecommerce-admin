/* eslint-disable prettier/prettier */
import { useContext } from "react";
import NavContext from "../context/NavContext";


const useNav = () => useContext(NavContext);

export default useNav;