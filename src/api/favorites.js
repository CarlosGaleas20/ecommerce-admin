/* eslint-disable prettier/prettier */
import { size } from 'lodash';
import authFetch from '../utils/authFetch';
import { BASE_URL } from "../utils/constants";


export const searchFavorite = async (idUser, idProduct, logout) => {
    try {
        const url = `${BASE_URL}/favoritos?users_permissions_user=${idUser}&producto=${idProduct}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const addFavoriteProduct = async (idUser, idProduct, logout) => {
    try {
        const dataFound = await searchFavorite(idUser, idProduct, logout);
        if (size(dataFound) > 0 || !dataFound) {
            return "El produto ya es un favorito";
        } else {
            const url = `${BASE_URL}/favoritos`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users_permissions_user: idUser,
                    producto: idProduct
                })
            }

            const response = await authFetch(url, params, logout);
            return response;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteFavoriteProduct = async (idUser, idProduct, logout) => {
    try {
        const dataFound = await searchFavorite(idUser, idProduct, logout);
        if (size(dataFound) > 0 || !dataFound) {
            const url = `${BASE_URL}/favoritos/${dataFound[0]?._id}`;
            const params = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }

            const response = await authFetch(url, params, logout);
            return response;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getFavoriteProduct = async (idUser, logout) => {
    try {
        const url = `${BASE_URL}/favoritos?users_permissions_user=${idUser}`;
        const response = await authFetch(url, null, logout);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAllFavorite = async (logout) => {
    try {
        const url = `${BASE_URL}/favoritos`;
        const response = await authFetch(url, null, logout);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}