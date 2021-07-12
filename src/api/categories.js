/* eslint-disable prettier/prettier */
import authFetch from "utils/authFetch";
import { BASE_URL } from "../utils/constants";
import { size } from 'lodash';


export const getCategories = async () => {
    try {
        const url = `${BASE_URL}/categories?_sort=createdAt:desc`;

        const response = await fetch(url);
        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    }
}

export const getTotalProdcutsByCategory = async (category) => {
    try {
        const url = `${BASE_URL}/productos/count?category.url=${category}`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const getMarcas = async () => {
    try {
        const url = `${BASE_URL}/marcas`;

        const response = await fetch(url);
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const addCategory = async (formData, imagen, logout) => {
    const urlA = (formData.title);
    const urlLower = urlA.replace(/\s+/g, '-');
    const urlAccent = urlLower.toLowerCase();
    const urlPoint = urlAccent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const urlSlash = urlPoint.replace(/\./g, '-');
    const urlBody = urlSlash.replace(/\//g, '-');
    console.log(urlBody);
    try {
        const url = `${BASE_URL}/categories`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                imagen,
                url: urlBody,
            })
        }
        const response = await authFetch(url, params, logout);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateCategory = async (idCategory, formData, imagen, logout) => {
    const urlA = (formData.title);
    const urlLower = urlA.replace(/\s+/g, '-');
    const urlAccent = urlLower.toLowerCase();
    const urlPoint = urlAccent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const urlSlash = urlPoint.replace(/\./g, '-');
    const urlBody = urlSlash.replace(/\//g, '-');
    console.log(urlBody);
    try {
        const url = `${BASE_URL}/categories/${idCategory}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                imagen,
                url: urlBody,
            }),
        };

        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteCategory = async (idCategory, logout) => {
    try {
        const response = await getProductsByCategory(idCategory, logout);
        if (size(response) === 0) {
            const url = `${BASE_URL}/categories/${idCategory}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const result = await authFetch(url, params, logout);
            return result;
        } else {
            return 'found';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getProductsByCategory = async (idCategory, logout) => {
    try {
        const url = `${BASE_URL}/productos?category=${idCategory}`;
        const result = await authFetch(url, null, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}