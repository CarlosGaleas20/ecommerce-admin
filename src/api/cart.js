/* eslint-disable prettier/prettier */
import { toast } from 'react-toastify';
import { size, includes, remove, map } from 'lodash';
import { BASE_URL } from '../utils/constants';
import authFetch from '../utils/authFetch';

export const getProductsCart = () => {
    const cart = localStorage.getItem('cart');

    if (!cart) {
        return null;
    } else {
        const products = cart.split(',');
        return products;
    }
}


export const getProductsCartServer = () => {

    const ISSERVER = typeof window === "undefined";

    if (!ISSERVER) {
        const cart = localStorage.getItem('cart');

        if (!cart) {
            return null;
        } else {
            const products = cart.split(',');
            return products;
        }
    }
}

export const getProductCartApi = async (idUser, idProduct, logout) => {
    try {
        const url = `${BASE_URL}/carritos?users_permissions_user=${idUser}&producto=${idProduct}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const updateAmountProductCart = async( id, amount, logout ) =>{
    try {
        const url = `${BASE_URL}/carritos/${id}`;
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cantidad: amount
            })
        }

        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsCartUser = async (idUser, logout) => {
    try {
        const url = `${BASE_URL}/carritos?users_permissions_user=${idUser}`;
        const response = await authFetch(url, null, logout);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const addProductCartApi = async (idUser, idProduct, logout) => {
    try {
        const cart = await getProductCartApi(idUser, idProduct, logout);
        if (size(cart) > 0 || !cart) {
            return "El producto ya existe";
        } else {
            const url = `${BASE_URL}/carritos`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users_permissions_user: idUser,
                    producto: idProduct,
                    cantidad: 1
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

export const addProductCart = (product) => {
    const cart = getProductsCart();

    if (!cart) {
        localStorage.setItem('cart', product);
        toast.success('Producto añadido al carrito');
    } else {
        const productFound = includes(cart, product);
        if (productFound) {
            toast.warning('Este producto ya fue agregado al carrito');
        } else {
            cart.push(product);
            localStorage.setItem('cart', cart);
            toast.success('Producto añadido al carrito')
        }
    }
}

export const countProductsCart = () => {
    const cart = getProductsCart();

    if (!cart) {
        return 0;
    } else {
        return size(cart);
    }
}

export const countProductsCartApi = async (idUser) => {
    try {
        const url = `${BASE_URL}/carritos/count?users_permissions_user=${idUser}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const removeProductCart = (product) => {
    const cart = getProductsCart();

    remove(cart, (item) => {
        return item === product;
    });

    if (size(cart) > 0) {
        localStorage.setItem('cart', cart);
    } else {
        localStorage.removeItem('cart');
    }
}

export const removeProductCartApi = async (idUser, idProduct, logout) => {
    try {
        const dataFound = await getProductCartApi(idUser, idProduct, logout);
        if (size(dataFound) > 0 || !dataFound) {
            const url = `${BASE_URL}/carritos/${dataFound[0]?._id}`;
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

export const paymentCart = async (token, productsData, idUser, address, logout) => {
    try {
        const direccion = address;

        const url = `${BASE_URL}/pedidos`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                productsData,
                idUser,
                direccion
            })
        };

        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const removeAll = () => {
    localStorage.removeItem('cart');
}

export const removeAllProductCartApi = async (idUser, products, logout) => {
    try {
        map(products, async(product) => {
            const dataFound = await getProductCartApi(idUser, product.id, logout);
        if (size(dataFound) > 0 || !dataFound) {
            const url = `${BASE_URL}/carritos/${dataFound[0]?._id}`;
            const params = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
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