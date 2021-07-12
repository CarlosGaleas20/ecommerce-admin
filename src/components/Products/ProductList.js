/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { map } from 'lodash';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProductModal from "./ProductModal";
import ProductEdit from "./ProductEdit";
import DeleteProduct from "./DeleteProduct";
import { size } from 'lodash';

export default function ProductList({ products, categories, setReloadProducts, title }) {

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [activeEdit, setActiveEdit] = useState(null);

    const classes = useStyles();

    const accionEdit = (product) => {
        if(product){
            setActiveEdit(product);
            setOpenEdit(true);
        }
    }

    const accionDelete = (product) => {
        if(product){
            setActiveId(product);
            setOpenDelete(true);
        }
    }

    return (
        <>
        <ProductModal
            open={open}
            setOpen={setOpen}
            categories={categories}
            setReloadProducts={setReloadProducts}
        />
        {
            activeEdit &&
            <ProductEdit
            open={openEdit}
            setOpen={setOpenEdit}
            setReloadProducts={setReloadProducts}
            activeEdit={activeEdit}
            setActiveEdit={setActiveEdit}
            categories={categories}
        />
        }
        {
            activeId &&
            <DeleteProduct
            open={openDelete}
            setOpen={setOpenDelete}
            setReloadProducts={setReloadProducts}
            activeId={activeId}
            setActiveId={setActiveId}
        />
        }
        
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Productos {title}</h4>
                        <p className={classes.cardCategoryWhite}>
                            Tabla para le gestión de productos {title} existentes.
                        </p>
                    </CardHeader>
                    {
                        title === 'Activos'
                        && (
                            <Button
                        color="primary"
                        style={{
                            paddingTop: 10,
                            fontSize: 15,
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        Agregar nuevo Producto
                    </Button>
                        )
                    }                  
                    <CardBody>
                        {
                            size(products) > 0
                            ? (
                                <Table
                            tableHeaderColor="primary"
                            tableHead={["Imagen", "Nombre", "Precio", "Cantidad", "Descuento", "Acción", "Cambiar de estado"]}
                            tableData={
                                map(products, (product) => [
                                    <>
                                        <Avatar className={classes.avatar}
                                            alt="Example Alt"
                                            src={product.poster.url}
                                        />
                                    </>, product.title, `$${product.price}`, product.amount, `${product.discount}%`,
                                    <>
                                        <Button
                                            color="primary"
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionEdit(product)}
                                        >Modificar</Button>
                                    </>
                                    ,
                                    <>
                                        <Button
                                            variant="contained"
                                            color={
                                                product.estado === 'Activo'
                                                ? 'secondary'
                                                : 'primary'
                                            }
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionDelete(product)}
                                        >{
                                            product.estado === 'Activo'
                                            ? 'Desactivar'
                                            : 'Activar'
                                        }</Button>
                                    </>
                                ])
                            }
                        />
                            )
                            : (
                                <Table
                            tableHeaderColor="primary"
                            tableHead={["Imagen", "Nombre", "Precio", "Cantidad", "Descuento", "Acción"]}
                            tableData={[[`No tienes productos ${title}`]]}
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