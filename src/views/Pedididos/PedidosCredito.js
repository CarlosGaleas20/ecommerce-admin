/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { size, forEach } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAuth from 'hooks/useAuth';
import OrdersCardBody from 'components/Orders/OrdersCard/OrdersCardBody';
import { getOrders } from 'api/order';
import { getOrdersOk } from 'api/order';
import { getOrdersDispatch } from 'api/order';

const Orders = () => {

    const [orders, setOrders] = useState(null);
    const [orderList, setOrderList] = useState(null);
    const [orderListDispatch, setOrderListDispatch] = useState(null);
    const [orderListOk, setOrderListOk] = useState(null);
    const [reloadOrder, setReloadOrder] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getOrders(logout);
            setOrders(response);
            if (size(response) > 0) {
                const orderListPrueba = [];
                forEach(response, (data) => {
                    const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                    if (!found) {
                        orderListPrueba.push(data);
                    }
                });
                setOrderList(orderListPrueba);
            } else {
                setOrderList([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    useEffect(() => {
        (async () => {
            const response = await getOrdersDispatch(logout);
            setOrders(response);
            if (size(response) > 0) {
                const orderListPrueba = [];
                forEach(response, (data) => {
                    const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                    if (!found) {
                        orderListPrueba.push(data);
                    }
                });
                setOrderListDispatch(orderListPrueba);
            } else {
                setOrderListDispatch([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    useEffect(() => {
        (async () => {
            const response = await getOrdersOk(logout);
            setOrders(response);
            if (size(response) > 0) {
                const orderListPrueba = [];
                forEach(response, (data) => {
                    const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                    if (!found) {
                        orderListPrueba.push(data);
                    }
                });
                setOrderListOk(orderListPrueba);
            } else {
                setOrderListOk([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    return (
        <>
            {
                (orders && orderList && orderListOk && orderListDispatch)
                    ? (
                        <OrdersCardBody
                            orders={orders}
                            orderList={orderList}
                            orderListOk={orderListOk}
                            setReloadOrder={setReloadOrder}
                            orderListDispatch={orderListDispatch}
                        />
                    )
                    : (<CircularProgress />)
            }
        </>
    )
}

export default Orders;