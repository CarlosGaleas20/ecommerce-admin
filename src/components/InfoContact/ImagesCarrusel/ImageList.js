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
import ImageModal from "./ImageModal";
import ImageEdit from "./ImageEdit";
import DeleteCategory from "./DeleteImagen";

export default function ImageList({ images, setReloadImages }) {

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [activeEdit, setActiveEdit] = useState(null);

    const classes = useStyles();

    const accionEdit = (image) => {
        if(image){
            setActiveEdit(image);
            setOpenEdit(true);
        }
    }

    const accionDelete = (image) => {
        if(image){
            setActiveId(image);
            setOpenDelete(true);
        }
        
    }

    return (
        <>
        <ImageModal
            open={open}
            setOpen={setOpen}
            setReloadImages={setReloadImages}
        />
        {
            activeEdit &&
            <ImageEdit
            open={openEdit}
            setOpen={setOpenEdit}
            setReloadImages={setReloadImages}
            activeEdit={activeEdit}
            setActiveEdit={setActiveEdit}
        />
        }
        <DeleteCategory
            open={openDelete}
            setOpen={setOpenDelete}
            setReloadImages={setReloadImages}
            activeId={activeId}
            setActiveId={setActiveId}
        />
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Carrusel de Imagenes</h4>
                        <p className={classes.cardCategoryWhite}>
                            Tabla para le gestión del carrusel de imagenes existente.
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
                        Agregar nueva Imagen al Carrusel
                    </Button>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Imagen", "Nombre", "Descripción", "Acción"]}
                            tableData={
                                map(images, (image) => [
                                    <>
                                        <Avatar className={classes.avatar}
                                            alt="Example Alt"
                                            src={image.imagen.url}
                                        />
                                    </>, image.titulo, `${image.descripcion}`,
                                    <>
                                        <Button
                                            color="primary"
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionEdit(image)}
                                        >Modificar</Button>
                                        <Button
                                            color="primary"
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionDelete(image)}
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