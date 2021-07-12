/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import InicioGeneral from './InicioGeneral';
import { forEach } from 'lodash';
import moment from 'moment';
import 'moment/locale/es';


const InicioBody = ({
    orderList,
    orderListDeposit,
    totalFavorites,
    totalUsers,
    encuestas,
    encuestasCard,
    productsCard,
    productsDeposit,
}) => {

    const [deposit, setDeposit] = useState({});
    const [card, setCard] = useState({});
    const [responseEncuestas, setResponseEncuestas] = useState([]);
    const [totalProducts, setTotalProducts] = useState([]);

    useEffect(() => {

        let productoItem = [];
        forEach(productsCard, (product) => {
            const foundProduct = productoItem.find(element => element.id === product.producto.id);
            if (!foundProduct) {
                let total = product.producto.price * product.totalProducto;
                productoItem.push({
                    id: product.producto.id,
                    nombre: product.producto.title,
                    cantidad: product.totalProducto,
                    precio: total,
                });
            } else {
                let indice = productoItem.findIndex(element => element.id === product.producto.id)
                let oldItem = productoItem.splice(indice, 1);
                let suma = oldItem[0].cantidad + product.totalProducto;
                let total = product.producto.price * suma;
                productoItem.push({
                    id: product.producto.id,
                    nombre: product.producto.title,
                    cantidad: suma,
                    precio: total,
                });
            }
        })

        forEach(productsDeposit, (product) => {
            const foundProduct = productoItem.find(element => element.id === product.producto.id);
            if (!foundProduct) {
                let total = product.producto.price * product.totalProducto;
                productoItem.push({
                    id: product.producto.id,
                    nombre: product.producto.title,
                    cantidad: product.totalProducto,
                    precio: total,
                });
            } else {
                let indice = productoItem.findIndex(element => element.id === product.producto.id)
                let oldItem = productoItem.splice(indice, 1);
                let suma = oldItem[0].cantidad + product.totalProducto;
                let total = product.producto.price * suma;
                productoItem.push({
                    id: product.producto.id,
                    nombre: product.producto.title,
                    cantidad: suma,
                    precio: total,
                });
            }
        })
        productoItem.sort((a ,b) => {
            if(a.cantidad < b.cantidad){
                return 1;
            }
            if(a.cantidad > b.cantidad){
                return -1;
            }
        })

        productoItem.splice(5);
        setTotalProducts(productoItem);
    }, [productsCard, productsDeposit])

    
    useEffect(() => {
        let price = 0;
        let amount = 0;
        forEach(orderList, (order) => {
            if (moment(order.createdAt).format('MMMM Do YYYY') === moment().format('MMMM Do YYYY')) {
                price = price + order.totalPedido;
            }
            if (order.estadoEntrega === 'No entregado') {
                amount = amount + 1;
            }
        })
        setDeposit({
            price,
            amount,
        });
    }, [orderList])

    useEffect(() => {
        let price = 0;
        let amount = 0;
        forEach(orderListDeposit, (order) => {
            if (order.estadoEntrega === 'Entregado' || order.estadoEntrega === 'Despachado') {
                if (moment(order.createdAt).format('MMMM Do YYYY') === moment().format('MMMM Do YYYY')) {
                    price = price + order.totalPedido;
                }
            }
            if (order.estadoEntrega === 'Validado') {
                amount = amount + 1;
            }
        })
        setCard({
            price,
            amount,
        });
    }, [orderList])

    useEffect(() => {
        let muyBueno = 0;
        let Bueno = 0;
        let Regular = 0;
        let Malo = 0;
        let muyMalo = 0;
        forEach(encuestas, (encuesta) => {
            if (encuesta.titulo === 'Muy bueno') {
                muyBueno = muyBueno + 1;
            }
            if (encuesta.titulo === 'Bueno') {
                Bueno = Bueno + 1;
            }
            if (encuesta.titulo === 'Regular') {
                Regular = Regular + 1;
            }
            if (encuesta.titulo === 'Malo') {
                Malo = Malo + 1;
            }
            if (encuesta.titulo === 'Muy malo') {
                muyMalo = muyMalo + 1;
            }
        })
        forEach(encuestasCard, (encuesta) => {
            if (encuesta.titulo === 'Muy bueno') {
                muyBueno = muyBueno + 1;
            }
            if (encuesta.titulo === 'Bueno') {
                Bueno = Bueno + 1;
            }
            if (encuesta.titulo === 'Regular') {
                Regular = Regular + 1;
            }
            if (encuesta.titulo === 'Malo') {
                Malo = Malo + 1;
            }
            if (encuesta.titulo === 'Muy malo') {
                muyMalo = muyMalo + 1;
            }
        })

        let total = muyBueno + Bueno + Regular + Malo + muyMalo;
        let porcent1 = Math.round((muyBueno * 100) / total);
        let porcent2 = Math.round((Bueno * 100) / total);
        let porcent3 = Math.round((Regular * 100) / total);
        let porcent4 = Math.round((Malo * 100) / total);
        let porcent5 = Math.round((muyMalo * 100) / total);
        setResponseEncuestas([
            {
                id: '1',
                nombre: 'Muy bueno',
                totalRespuestas: muyBueno,
                porcentaje: porcent1,

            },
            {
                id: '2',
                nombre: 'Bueno',
                totalRespuestas: Bueno,
                porcentaje: porcent2,

            },
            {
                id: '3',
                nombre: 'Regular',
                totalRespuestas: Regular,
                porcentaje: porcent3,

            },
            {
                id: '4',
                nombre: 'Malo',
                totalRespuestas: Malo,
                porcentaje: porcent4,

            },
            {
                id: '5',
                nombre: 'Muy malo',
                totalRespuestas: muyMalo,
                porcentaje: porcent5,

            },
        ])
    }, [encuestas, encuestasCard])

    return (
        <>
            <InicioGeneral
                deposit={deposit}
                card={card}
                totalFavorites={totalFavorites}
                totalUsers={totalUsers}
                responseEncuestas={responseEncuestas}
                encuestas={encuestas}
                encuestasCard={encuestasCard}
                totalProducts={totalProducts}
            />
        </>
    )
}

export default InicioBody;
