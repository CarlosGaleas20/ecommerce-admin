/* eslint-disable prettier/prettier */
import { BASE_URL } from "../utils/constants";
import { size } from 'lodash';
import { getOrdersByIdPedido, getOrdersByIdPedidoByDeposit } from "./order";
import moment from 'moment';
import 'moment/locale/es';

export const sendEmailDispatch = async (idPedido, data, logout) => {
    try {
        const orders = await getOrdersByIdPedido(idPedido, logout);
        if (size(orders) > 0) {
            const fechaCompra = moment(orders[0].createdAt).format(' Do MMMM YYYY');
            const url = `${BASE_URL}/sendCardDispatch`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orders,
                    data,
                    fechaCompra,
                }),
            }

            const result = await fetch(url, params);
            const response = await result.json();
            return response;
        } else {
            return 'Hubo algun error';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const sendEmailSend = async (idPedido, logout) => {
    try {
        const orders = await getOrdersByIdPedido(idPedido, logout);
        if (size(orders) > 0) {
            const fechaCompra = moment(orders[0].createdAt).format(' Do MMMM YYYY');
            const url = `${BASE_URL}/sendCardSend`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orders,
                    fechaCompra,
                }),
            }

            const result = await fetch(url, params);
            const response = await result.json();
            return response;
        } else {
            return 'Hubo algun error';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const sendEmailDispatchByDeposit = async (idPedido, data, logout) => {
    try {
        const orders = await getOrdersByIdPedidoByDeposit(idPedido, logout);
        if (size(orders) > 0) {
            const fechaCompra = moment(orders[0].createdAt).format(' Do MMMM YYYY');
            const url = `${BASE_URL}/sendCardDispatch`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orders,
                    data,
                    fechaCompra,
                }),
            }

            const result = await fetch(url, params);
            const response = await result.json();
            return response;
        } else {
            return 'Hubo algun error';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const sendEmailSendByDeposit = async (idPedido, logout) => {
    try {
        const orders = await getOrdersByIdPedidoByDeposit(idPedido, logout);
        if (size(orders) > 0) {
            const fechaCompra = moment(orders[0].createdAt).format(' Do MMMM YYYY');
            const url = `${BASE_URL}/sendCardSend`;
            const params = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orders,
                    fechaCompra,
                }),
            }

            const result = await fetch(url, params);
            const response = await result.json();
            return response;
        } else {
            return 'Hubo algun error';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}