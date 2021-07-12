/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { size, forEach } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAuth from 'hooks/useAuth';
import OrdersCardBody from 'components/Orders/OrdersDeposit/OrdersCardBody';
import { getOrdersByDeposit } from 'api/order';
import { getOrdersValidateByDeposit } from 'api/order';
import { getOrdersOkByDeposit } from 'api/order';
import { getOrdersDeleteByDeposit } from 'api/order';
import { getOrdersDispatchByDeposit } from 'api/order';

const PedidosDeposito = () => {

    const [orders, setOrders] = useState(null);
    const [orderList, setOrderList] = useState(null);
    const [orderValidate, setOrderValidate] = useState(null);
    const [orderListDispatch, setOrderListDispatch] = useState(null);
    const [orderListOk, setOrderListOk] = useState(null);
    const [orderListDelete, setOrderListDelete] = useState(null);
    const [reloadOrder, setReloadOrder] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getOrdersByDeposit(logout);
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
            const response = await getOrdersValidateByDeposit(logout);
            setOrders(response);
            if (size(response) > 0) {
                const orderListPrueba = [];
                forEach(response, (data) => {
                    const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                    if (!found) {
                        orderListPrueba.push(data);
                    }
                });
                setOrderValidate(orderListPrueba);
            } else {
                setOrderValidate([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    useEffect(() => {
        (async () => {
            const response = await getOrdersDispatchByDeposit(logout);
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
            const response = await getOrdersOkByDeposit(logout);
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

    useEffect(() => {
        (async () => {
            const response = await getOrdersDeleteByDeposit(logout);
            setOrders(response);
            if (size(response) > 0) {
                const orderListPrueba = [];
                forEach(response, (data) => {
                    const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                    if (!found) {
                        orderListPrueba.push(data);
                    }
                });
                setOrderListDelete(orderListPrueba);
            } else {
                setOrderListDelete([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    return (
        <>
            {
                (orders && orderList && orderValidate && orderListOk && orderListDelete && orderListDispatch)
                    ? (
                        <OrdersCardBody
                            orders={orders}
                            orderList={orderList}
                            orderValidate={orderValidate}
                            orderListOk={orderListOk}
                            orderListDispatch={orderListDispatch}
                            orderListDelete={orderListDelete}
                            setReloadOrder={setReloadOrder}
                        />
                    )
                    : (<CircularProgress />)
            }
        </>
    )
}

export default PedidosDeposito;