/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { map, size } from 'lodash';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import 'moment/locale/es';

export default function EncuestaList({ encuestas, title }) {

    const classes = useStyles();


    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Encuestas con satisfacción: {title}</h4>
                            <p className={classes.cardCategoryWhite}>
                                Tabla para ver los detalles de las encuetas con satisfacción: {title}
                            </p>
                        </CardHeader>
                        <CardBody>
                            {
                                size(encuestas) > 0
                                    ? (
                                        <Table
                                            tableHeaderColor="primary"
                                            tableHead={["Id de la compra", "Comprado por: ", "Nivel de satisfacción", "Mensaje"]}
                                            tableData={
                                                map(encuestas, (encuesta) => [
                                                    encuesta.pedido
                                                        ? encuesta.pedido.idPedido
                                                        : encuesta.pedido_deposito.idPedido
                                                    , encuesta.users_permissions_user.username, encuesta.titulo, 
                                                    encuesta.descripcion
                                                        ? encuesta.descripcion
                                                        : encuesta.comentario
                                                    ,
                                                ])
                                            }
                                        />
                                    )
                                    : (
                                        <Table
                                            tableHeaderColor="primary"
                                            tableHead={["Id de la compra", "Comprado por: ", "Nivel de satisfacción", "Mensaje"]}
                                            tableData={[[`Por el momento no hay encuetas con satifacción: ${title}`]]}
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