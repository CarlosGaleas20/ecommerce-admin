/* eslint-disable prettier/prettier */
import { checkToken, getToken } from "../api/user";

const authFetch = async(url, params, logout) => {
    const token = getToken();

    if( ! token ){
        logout();
    } else {
        if( checkToken(token) ){
            logout();
        } else {
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                },
            };
            try {
                const response = await fetch(url, paramsTemp);
                const result = await response.json();
                return result;
            } catch (error) {
                return error;
            }
        }
    }
}

export default authFetch;