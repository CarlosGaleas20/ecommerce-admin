/* eslint-disable prettier/prettier */
import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/constants";


export const getEncuestaByDeposit = async(idUser, idPedido, logout) =>{
    try {
        const url = `${BASE_URL}/encuestas-pedidos?_sort=createdAt:desc&users_permissions_user=${idUser}&pedido_deposito=${idPedido}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getEncuestaByCard = async(idUser, idPedido, logout) =>{
    try {
        const url = `${BASE_URL}/encuestas?_sort=createdAt:desc&users_permissions_user=${idUser}&pedido=${idPedido}`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllEncuestaByDeposit = async(logout) =>{
    try {
        const url = `${BASE_URL}/encuestas-pedidos?_sort=createdAt:desc`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllEncuestaByCard = async(logout) =>{
    try {
        const url = `${BASE_URL}/encuestas?_sort=createdAt:desc`;
        const response = await authFetch(url, null, logout);
        return response;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

