/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Header, Image, Modal, Grid, Icon } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import useAuth from 'hooks/useAuth';
import { getOrdersByIdPedido } from 'api/order';
import { CircularProgress } from '@material-ui/core';
import OrderSend from './OrderSend';
import OrderDispatch from './OrderDispatch';

function ModalOrder({ order, open, setOpen, setActiveId, setReloadOrder, openSend, setOpenSend, openSendD, setOpenSendD }) {

    const classes = useStyles();
    const [orders, setOrders] = useState(null);
    const { logout } = useAuth();
    const { direccion, users_permissions_user } = order;
    const { name, lastname, username, email } = users_permissions_user;

    useEffect(() => {
        (async () => {
            const response = await getOrdersByIdPedido(order.idPedido, logout);
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
                                                <Header>A continuacion se muestran los detalles del pedido</Header>
                                                <Grid>
                                                    <Grid.Row>
                                                        <Grid.Column mobile={16} tablet={16} computer={8}>
                                                            <div className="container-user">
                                                                <h3>El pedido fue realizado por:</h3>
                                                                <p>Nombres: <span style={{ color: '#007bff' }}>{name} {lastname}</span></p>
                                                                <p>Nombre de usuario: <span style={{ color: '#007bff' }}>{username}</span></p>
                                                                <p>Correo: <span style={{ color: '#007bff' }}>{email}</span></p>
                                                            </div>
                                                        </Grid.Column>
                                                        <Grid.Column mobile={16} tablet={16} computer={8}>
                                                            <div className="container-direccion">
                                                                <h3>{
                                                                    order.estadoEntrega === 'Entregado'
                                                                        ? 'El pedido fue enviado a:'
                                                                        : 'El pedido se enviara a:'
                                                                }
                                                                </h3>
                                                                <p>Titulo de la direccin: <span style={{ color: '#007bff' }}>{direccion.title}</span></p>
                                                                <p>Provincia: <span style={{ color: '#007bff' }}>{direccion.provincia}</span></p>
                                                                <p>Cantón: <span style={{ color: '#007bff' }}>{direccion.canton}</span></p>
                                                                <p>Cuidad: <span style={{ color: '#007bff' }}>{direccion.cuidad}</span></p>
                                                                <p>Calle: <span style={{ color: '#007bff' }}>{direccion.calle}</span></p>
                                                            </div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                                <h3>Los productos comprados son:</h3>
                                                <Grid>
                                                    {
                                                        map(orders, (order) => (
                                                            <Grid.Column mobile={16} tablet={16} computer={16} key={order._id}>
                                                                <div className={classes.container}>
                                                                    <div className={classes.containerInfo}>
                                                                        <Image className={classes.image} src={order.producto.poster.url} alt={order.producto.title} />
                                                                    </div>
                                                                    <div className={classes.containerData}>
                                                                        <h2 className={classes.title}>Nombre del producto: {order.producto.title}</h2>
                                                                        <p>Total a pagar: ${order.producto.price - ((order.producto.price * order.producto.discount)) / 100}</p>
                                                                        <p>Cantidad comprada: {order.totalProducto}</p>
                                                                    </div>
                                                                </div>
                                                            </Grid.Column>
                                                        ))
                                                    }
                                                </Grid>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                        {
                                                order.estadoEntrega === 'No entregado'
                                                && (
                                                    <Button color='orange' inverted onClick={() => setOpenSend(true)}>
                                                        <Icon name='checkmark' /> ¿Despachar Pedido?
                                                    </Button>
                                                )
                                            }
                                            {
                                                order.estadoEntrega === 'Despachado'
                                                && (
                                                    <Button color='orange' inverted onClick={() => setOpenSendD(true)}>
                                                        <Icon name='checkmark' /> ¿Marcar como entregado?
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