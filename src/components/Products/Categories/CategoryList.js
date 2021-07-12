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
import CategoryModal from "./CategoryModal";
import CategoryEdit from "./CategoryEdit";
import DeleteCategory from "./DeleteCategory";

export default function CategoryList({ categories, setReloadCategories }) {

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [activeEdit, setActiveEdit] = useState(null);

    const classes = useStyles();

    const accionEdit = (category) => {
        if(category){
            setActiveEdit(category);
            setOpenEdit(true);
        }
    }

    const accionDelete = (category) => {
        if(category){
            setActiveId(category);
            setOpenDelete(true);
        }
        
    }

    return (
        <>
        <CategoryModal
            open={open}
            setOpen={setOpen}
            setReloadCategories={setReloadCategories}
        />
        {
            activeEdit &&
            <CategoryEdit
            open={openEdit}
            setOpen={setOpenEdit}
            setReloadCategories={setReloadCategories}
            activeEdit={activeEdit}
            setActiveEdit={setActiveEdit}
        />
        }
        <DeleteCategory
            open={openDelete}
            setOpen={setOpenDelete}
            setReloadCategories={setReloadCategories}
            activeId={activeId}
            setActiveId={setActiveId}
        />
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Categorías</h4>
                        <p className={classes.cardCategoryWhite}>
                            Tabla para le gestión de categorías existentes.
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
                        Agregar nueva Categoría
                    </Button>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Imagen", "Nombre", "Descripción", "Acción"]}
                            tableData={
                                map(categories, (category) => [
                                    <>
                                        <Avatar className={classes.avatar}
                                            alt="Example Alt"
                                            src={category.imagen.url}
                                        />
                                    </>, category.title, `${category.descripcion}`,
                                    <>
                                        <Button
                                            color="primary"
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionEdit(category)}
                                        >Modificar</Button>
                                        <Button
                                            color="primary"
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionDelete(category)}
                                        >Eliminar</Button>
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