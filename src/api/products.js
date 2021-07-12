/* eslint-disable prettier/prettier */
import { map, size } from "lodash";
import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/constants";


export const getProducts = async () => {
    try {
        const url = `${BASE_URL}/productos?_sort=createdAt:desc`;
        const response = await fetch(url);
        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    }
}

export const getProductsByUrl = async (path) => {
    try {
        const url = `${BASE_URL}/productos?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        return error;
    }
}

export const getProductsById = async (idProduct, logout) => {
    try {
        const url = `${BASE_URL}/productos?id=${idProduct}`;
        const response = await authFetch(url, null, logout);
        return response;
    } catch (error) {
        return error;
    }
}

export const searchProducts = async (title) => {
    try {
        const url = `${BASE_URL}/productos?_q=${title}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const updateAmountProductBySell = async (products, logout) => {
    try {
        map(products, async (product) => {
            const dataFound = await getProductsById(product.producto.id, logout);
            console.log(dataFound);
            if (size(dataFound) > 0 || !dataFound) {
                const url = `${BASE_URL}/productos/${dataFound[0]?._id}`;
                const newAmount = dataFound[0].amount - product.cantidad;
                const params = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: newAmount
                    })
                }

                const response = await authFetch(url, params, logout);
                return response;
            }
        })
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const addProduct = async (formData, poster, screenshots, logout) => {
    const urlA = (formData.title);
    const urlLower = urlA.replace(/\s+/g, '-');
    const urlAccent = urlLower.toLowerCase();
    const urlPoint = urlAccent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const urlSlash = urlPoint.replace(/\./g, '-');
    const urlBody = urlSlash.replace(/\//g, '-');
    const price = (formData.price).toFixed(2);
    console.log(urlBody);
    try {
        const url = `${BASE_URL}/productos`;
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                poster,
                screenshots,
                url: urlBody,
                price,
            })
        }
        const response = await authFetch(url, params, logout);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateProduct = async (idProduct, formData, poster, screenshots, logout) => {
    const urlA = (formData.title);
    const urlLower = urlA.replace(/\s+/g, '-');
    const urlAccent = urlLower.toLowerCase();
    const urlPoint = urlAccent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const urlSlash = urlPoint.replace(/\./g, '-');
    const urlBody = urlSlash.replace(/\//g, '-');
    console.log(urlBody);
    const price = (formData.price).toFixed(2);
    try {
        const url = `${BASE_URL}/productos/${idProduct}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                poster,
                screenshots,
                url: urlBody,
                price,
            }),
        };

        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteProduct = async (idProduct, logout) => {
    try {
        const url = `${BASE_URL}/productos/${idProduct}`;
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const actionProduct = async (idProduct, data, logout) => {
    try {
        if (data) {
            const url = `${BASE_URL}/productos/${idProduct}`;
            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    estado: 'Activo',
                }),
            };

            const result = await authFetch(url, params, logout);
            return result;
        } else {
            const url = `${BASE_URL}/productos/${idProduct}`;
            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    estado: 'Inactivo',
                }),
            };

            const result = await authFetch(url, params, logout);
            return result;
        }

    } catch (error) {
        console.log(error);
        return null;
    }
};

