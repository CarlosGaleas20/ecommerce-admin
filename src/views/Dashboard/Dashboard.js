/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { size, forEach } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAuth from 'hooks/useAuth';
import InicioBody from 'components/Inicio/InicioBody';
import { getOrdersGeneral } from 'api/order';
import { getOrdersByDepositGeneral } from 'api/order';
import { getAllFavorite } from 'api/favorites';
import { getAllUsers } from 'api/user';
import { getAllEncuestaByDeposit } from 'api/infoSell';
import { getAllEncuestaByCard } from 'api/infoSell';

const Dashboard = () => {

    const [orderList, setOrderList] = useState(null);
    const [orderListDeposit, setOrderListDeposit] = useState(null);
    const [totalFavorites, setTotalFavorites] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [encuestas, setEncuestas] = useState(null);
    const [encuestasCard, setEncuestasCard] = useState(null);
    const [reloadOrder, setReloadOrder] = useState(false);
    const [productsDeposit, setProductsDeposit] = useState(false);
    const [productsCard, setProductsCard] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getOrdersGeneral(logout);
            if (size(response) > 0) {
                const orderListPrueba = [];
                const products = [];
                forEach(response, (data) => {
                    const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                    if (!found) {
                        orderListPrueba.push(data);
                    }
                    const foundProduct = products.find(element => element.producto.id === data.producto.id);
                    if (!foundProduct) {
                        products.push(data);
                    } else{
                        let indice = products.findIndex(element => element.producto.id === data.producto.id)
                        let oldItem = products.splice(indice, 1);
                        let suma = oldItem[0].totalProducto + data.totalProducto;
                        let newItem = {...data, totalProducto: suma}
                        products.push(newItem);
                    }
                });
                setOrderList(orderListPrueba);
                setProductsCard(products)
            } else {
                setOrderList([]);
                setProductsCard([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    useEffect(() => {
        (async () => {
            const response = await getOrdersByDepositGeneral(logout);
            if (size(response) > 0) {
                const orderListPrueba = [];
                const products = [];
                forEach(response, (data) => {
                    const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                    if (!found) {
                        orderListPrueba.push(data);
                    }
                    const foundProduct = products.find(element => element.producto.id === data.producto.id);
                    if (!foundProduct) {
                        products.push(data);
                    } else{
                        let indice = products.findIndex(element => element.producto.id === data.producto.id)
                        let oldItem = products.splice(indice, 1);
                        let suma = oldItem[0].totalProducto + data.totalProducto;
                        let newItem = {...data, totalProducto: suma}
                        products.push(newItem);
                    }
                });
                setOrderListDeposit(orderListPrueba);
                setProductsDeposit(products);
            } else {
                setOrderListDeposit([]);
                setProductsDeposit([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    useEffect(() => {
        (async () => {
            const response = await getAllFavorite(logout);
            if (size(response) > 0) {
                const orderListPrueba = [];
                forEach(response, (data) => {
                    const found = orderListPrueba.find(element => element.id === data.producto.id);
                    if (!found) {
                        orderListPrueba.push(data.producto);
                    }
                });
                setTotalFavorites(orderListPrueba);
            } else {
                setTotalFavorites([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    useEffect(() => {
        (async () => {
            const response = await getAllUsers(logout);
            if (size(response) > 0) {
                const orderListPrueba = [];
                forEach(response, (data) => {
                    if (data.type === 'User') {
                        orderListPrueba.push(data);
                    }
                });
                setTotalUsers(orderListPrueba);
            } else {
                setTotalUsers([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    useEffect(() => {
        (async () => {
            const response = await getAllEncuestaByDeposit(logout);
            if (size(response) > 0) {
                setEncuestas(response);
            } else {
                setEncuestas([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    useEffect(() => {
        (async () => {
            const response = await getAllEncuestaByCard(logout);
            if (size(response) > 0) {
                setEncuestasCard(response);
            } else {
                setEncuestasCard([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    return (
        <>
            {
                (orderList && orderListDeposit && totalFavorites && totalUsers && encuestas && encuestasCard && productsDeposit && productsCard)
                    ? (
                        <InicioBody
                            orderList={orderList}
                            orderListDeposit={orderListDeposit}
                            setReloadOrder={setReloadOrder}
                            totalFavorites={totalFavorites}
                            totalUsers={totalUsers}
                            encuestas={encuestas}
                            encuestasCard={encuestasCard}
                            productsDeposit={productsDeposit}
                            productsCard={productsCard}
                        />
                    )
                    : (<CircularProgress />)
            }
        </>
    )
}

export default Dashboard;
