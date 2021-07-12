/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { map, size } from 'lodash';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ModalBody from "./ModalImage/ModalBody";
import moment from 'moment';
import 'moment/locale/es';
import OrderDispatch from "./OrderDispatch";

export default function OrderListDispatch({ orders, setReloadOrder }) {

    const [open, setOpen] = useState(false);
    const [openSendD, setOpenSendD] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const classes = useStyles();

    const accionView = (order) => {
        if(order){
            setActiveId(order);
            setOpen(true);
        }
    }

    const accionDelete = (order) => {
        if(order){
            setActiveId(order);
            setOpenSendD(true);
        }
        
    }

    return (
        <>
        {
            activeId &&
            <ModalBody
            open={open}
            setOpen={setOpen}
            order={activeId}
            setActiveId={setActiveId}
            setReloadOrder={setReloadOrder}
            openSendD={openSendD}
            setOpenSendD={setOpenSendD}
        />
        }
        <OrderDispatch
            open={openSendD}
            setOpen={setOpenSendD}
            setReloadOrder={setReloadOrder}
            order={activeId}
            setActiveId={setActiveId}
        />
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Pedidos despachados</h4>
                        <p className={classes.cardCategoryWhite}>
                            Tabla para la visualización de pedidos que han sido despachados.
                        </p>
                    </CardHeader>
                    <CardBody>
                        {
                            size(orders) > 0
                            ? (
                                <Table
                            tableHeaderColor="primary"
                            tableHead={["Id del Pedido", "Pedido por: ", "Total pagado: ", "Estado del pedido", "Fecha del pedido", "Visualizar detalles", "Entregado"]}
                            tableData={
                                map(orders, (order) => [
                                    order.idPedido, order.users_permissions_user.username, order.totalPedido, order.estadoEntrega, `${moment(order.createdAt).format('L')}, ${moment(order.createdAt).format('LT')}`,
                                    <>
                                        <Button
                                            color="primary"
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionView(order)}
                                        >Visualizar los datos</Button>
                                    </>,
                                    <>
                                    <Button
                                        color="primary"
                                        style={{
                                            paddingTop: 10,
                                            fontSize: 12,
                                        }}
                                        onClick={() => accionDelete(order)}
                                    >Marcar como entregado</Button>
                                </>
                                ])
                            }
                        />
                            )
                            : (
                                <Table
                            tableHeaderColor="primary"
                            tableHead={["Id del Pedido", "Pedido por: ", "Total pagado: ", "Estado del pedido", "Visualizar detalles", "Despachar"]}
                            tableData={[["No hay pedidos activos. ¡Buen Trabajo!"]]}
                        />
                            )
                        }
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        </>
    );
}

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF",
        },
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
};

const useStyles = makeStyles(styles);