/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { size } from 'lodash';
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import useAuth from 'hooks/useAuth';
import { CircularProgress } from '@material-ui/core';
import OrderSend from '../OrderSend';
import { getOrdersByIdPedidoByDeposit } from 'api/order';
import DatsBody from './DatsBody';
import OrderDispatch from 'components/Orders/OrdersDeposit/OrderDispatch';

function ModalOrder({ order, open, setOpen, setActiveId, setReloadOrder, openSend, setOpenSend, openSendD, setOpenSendD }) {

    const classes = useStyles();
    const [orders, setOrders] = useState(null);
    const { logout } = useAuth();
    

    useEffect(() => {
        (async () => {
            const response = await getOrdersByIdPedidoByDeposit(order.idPedido, logout);
            console.log(response);
            if (size(response) > 0) setOrders(response);
            else setOrders([]);
        })()
    }, [order])

    const handleClose = () => {
        setActiveId(null);
        setOpen(false);
    }

    return (
        <>
            {
                order &&
                <OrderSend
                    open={openSend}
                    setOpen={setOpenSend}
                    setReloadOrder={setReloadOrder}
                    order={order}
                    setActiveId={setActiveId}
                />
            }
            {
                order &&
                <OrderDispatch
                    open={openSendD}
                    setOpen={setOpenSendD}
                    setReloadOrder={setReloadOrder}
                    order={order}
                    setActiveId={setActiveId}
                />
            }
            <Modal
                closeIcon
                onClose={handleClose}
                onOpen={() => setOpen(true)}
                open={open}
            >
                {
                    order && orders
                        ? (
                            size(orders) > 0
                                ? (
                                    <>
                                        <Modal.Header>Detalles del pedido: {order.idPedido} </Modal.Header>
                                        <Modal.Content image>
                                            <Modal.Description>
                                                <DatsBody
                                                    orders={orders}
                                                    order={order}
                                                />
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                        {
                                                order.estadoEntrega === 'Validado'
                                                && (
                                                    <Button color='orange' inverted onClick={() => setOpenSend(true)}>
                                                        <Icon name='checkmark' /> Despachar Pedido?
                                                    </Button>
                                                )
                                            }
                                            {
                                                order.estadoEntrega === 'Despachado'
                                                && (
                                                    <Button color='orange' inverted onClick={() => setOpenSendD(true)}>
                                                        <Icon name='checkmark' /> Marcar como Entregado?
                                                    </Button>
                                                )
                                            }
                                            <Button
                                                content="Cerrar"
                                                labelPosition='right'
                                                icon='checkmark'
                                                onClick={() => setOpen(false)}
                                                positive
                                            />
                                        </Modal.Actions>
                                    </>
                                )
                                : (
                                    <>
                                        <Card>
                                            <CardHeader color="primary">
                                                <h4 className={classes.cardTitleWhite}>Hubo algun error</h4>
                                                <p className={classes.cardCategoryWhite}>
                                                    Pronto solucionaremos el error.
                                                </p>
                                            </CardHeader>
                                        </Card>
                                    </>
                                )
                        )
                        : (<CircularProgress />)
                }
            </Modal>
        </>
    )
}

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
    container: {
        boxShadow: '1px 1px 2px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-around',
        height: 100,
        marginBottom: 10,
    },
    containerInfo: {
        display: 'flex',
    },
    image: {
        height: '100%',
        marginRight: 20,
    },
    containerData: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    }
};

const useStyles = makeStyles(styles);

export default ModalOrder;