/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { map } from 'lodash';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import AdminModal from "./ClientModal";
import DeleteAdmin from "./DeleteClient";
import useAuth from "hooks/useAuth";

export default function ClientList({ users, setReloadOrder }) {

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const { auth } = useAuth();

    const classes = useStyles();

    const accionDelete = (user) => {
        if(user){
            setActiveId(user);
            setOpenDelete(true);
        }
        
    }

    return (
        <>
        <AdminModal
            open={open}
            setOpen={setOpen}
            setReloadOrder={setReloadOrder}
        />
        {
            activeId &&
            <DeleteAdmin
            open={openDelete}
            setOpen={setOpenDelete}
            setReloadOrder={setReloadOrder}
            activeId={activeId}
            setActiveId={setActiveId}
        />
        }
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Clientes</h4>
                        <p className={classes.cardCategoryWhite}>
                            Tabla para le gestión de clientes existentes.
                        </p>
                    </CardHeader>
                    <Button
                        color="primary"
                        style={{
                            paddingTop: 10,
                            fontSize: 15,
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        Agregar nuevo Cliente
                    </Button>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Nombres", "Nombre de usuario", "Correo", "Acción"]}
                            tableData={
                                map(users, (user) => [
                                    `${user.name} ${user.lastname}`, `${user.username}`, user.email,
                                    <>
                                    {
                                        user.id === auth.idUser
                                        ? (
                                            <Button
                                            variant="contained"
                                            color={
                                                user.active
                                                ? 'secondary'
                                                : 'primary'
                                            }
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            disabled="true"
                                        >
                                            Cliente Actívo
                                        </Button>
                                        )
                                        : (
                                            <Button
                                            variant="contained"
                                            color={
                                                user.active
                                                ? 'secondary'
                                                : 'primary'
                                            }
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionDelete(user)}
                                        >{
                                            user.active
                                            ? 'Desactivar'
                                            : 'Activar'
                                        }</Button>
                                        )
                                    }
                                    </>
                                ])
                            }
                        />
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