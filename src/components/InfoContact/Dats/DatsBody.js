/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Image from 'material-ui-image';
import InputLabel from '@material-ui/core/InputLabel';
import { CircularProgress } from '@material-ui/core';

import { toast } from 'react-toastify';

import ModalImages from './Images/ModalImages';
import EditorCustom from './EditorCustom';
import { updateDatosEmpresa } from 'api/infoContact';
import authFetch from 'utils/authFetch';

export default function DatsBody({ dats, setReloadDats }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState(false);
    const { logout } = authFetch()
    const [datosEmpresa, setDatosEmpresa] = useState({
        descripcion: dats.descripcion,
        mision: dats.mision,
        vision: dats.vision,
        valores: dats.valores,
    });
    const [datosEmpresaImages, setDatosEmpresaImages] = useState({
        imgDescripcion: dats.imgDescripcion,
        imgMision: dats.imgMision,
        imgVision: dats.imgVision,
        imgValores: dats.imgValores,
    });
    const [openModal, setOpenModal] = useState(false);
    const [activeImage, setActiveImage] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
            if (datosEmpresaImages.imgDescripcion && datosEmpresaImages.imgMision && datosEmpresaImages.imgVision && datosEmpresaImages.imgValores) {
                if(datosEmpresa.descripcion.length > 0 && datosEmpresa.mision.length > 0 && datosEmpresa.vision.length > 0 && datosEmpresa.valores.length > 0){
                    try {
                        const response = await updateDatosEmpresa(datosEmpresa, datosEmpresaImages, logout);
                        console.log(response);
                        if (response.statusCode === 500) {
                            toast.error('Hubo algun error');
                        } else {
                            toast.success('Datos de la empresa modificados correctamente');
                            setReloadDats(true);
                            setActiveImage(null);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    toast.error('Debe llenar todos los datos');
                }
            } else {
                toast.error('Debe subir las imagenes');
            }

            setLoading(false);
    }

    const handleOpen = (image, nombre) => {
        setOpenModal(true);
        setActiveImage(image);
        setNombre(nombre);
    }

    return (
        <div>
            <ModalImages
                openModal={openModal}
                setOpenModal={setOpenModal}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
                datosEmpresaImages={datosEmpresaImages}
                setDatosEmpresaImages={setDatosEmpresaImages}
                nombre={nombre}
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Datos Empresariales</h4>
                            <p className={classes.cardCategoryWhite}>Llena el texto con los datos que quieres presentar en la sección SOBRE NOSOTROS</p>
                        </CardHeader>
                        <CardBody xs={12} sm={12} md={12}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <InputLabel>Descripción de la empresa:</InputLabel>
                                    <EditorCustom
                                        val={datosEmpresa}
                                        activeVal={datosEmpresa.descripcion}
                                        name='descripcion'
                                        setVal={setDatosEmpresa}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <InputLabel>Misión de la empresa:</InputLabel>
                                    <EditorCustom
                                        val={datosEmpresa}
                                        activeVal={datosEmpresa.mision}
                                        name='mision'
                                        setVal={setDatosEmpresa}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <InputLabel>Visión de la empresa:</InputLabel>
                                    <EditorCustom
                                        val={datosEmpresa}
                                        activeVal={datosEmpresa.vision}
                                        name='vision'
                                        setVal={setDatosEmpresa}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <InputLabel>Valores de la empresa</InputLabel>
                                    <EditorCustom
                                        val={datosEmpresa}
                                        activeVal={datosEmpresa.valores}
                                        name='valores'
                                        setVal={setDatosEmpresa}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Button
                                        onClick={() => handleOpen(datosEmpresaImages.imgDescripcion, 'imgDescripcion')}
                                        color="primary"
                                    >
                                        Imagen Descripción
                                    </Button>
                                    <div
                                        onClick={() => handleOpen(datosEmpresaImages.imgDescripcion, 'imgDescripcion')}
                                        style={{
                                            margin: '0 auto',
                                            width: '40%',
                                            height: 200,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Image
                                            src={
                                                datosEmpresaImages.imgDescripcion.url
                                                    ? datosEmpresaImages.imgDescripcion.url
                                                    : "https://us.123rf.com/450wm/jabkitticha/jabkitticha1607/jabkitticha160700270/60102905-photo-icon.jpg?ver=6"
                                            }
                                            imageStyle={{
                                                position: 'realtive',
                                                paddingBottom: 10,
                                                width: '100%',
                                                height: 200,

                                            }}
                                            style={{
                                                paddingTop: 0,
                                            }}
                                        />
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Button
                                        onClick={() => handleOpen(datosEmpresaImages.imgMision, 'imgMision')}
                                        color="primary"
                                    >
                                        Imagen Misión
                                    </Button>
                                    <div
                                        onClick={() => handleOpen(datosEmpresaImages.imgMision, 'imgMision')}
                                        style={{
                                            margin: '0 auto',
                                            width: '40%',
                                            height: 200,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Image
                                            src={
                                                datosEmpresaImages.imgMision.url
                                                    ? datosEmpresaImages.imgMision.url
                                                    : "https://us.123rf.com/450wm/jabkitticha/jabkitticha1607/jabkitticha160700270/60102905-photo-icon.jpg?ver=6"
                                            }
                                            imageStyle={{
                                                position: 'realtive',
                                                paddingBottom: 10,
                                                width: '100%',
                                                height: 200,

                                            }}
                                            style={{
                                                paddingTop: 0,
                                            }}
                                        />
                                    </div>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Button
                                        onClick={() => handleOpen(datosEmpresaImages.imgVision, 'imgVision')}
                                        color="primary"
                                    >
                                        Imagen Visión
                                    </Button>
                                    <div
                                        onClick={() => handleOpen(datosEmpresaImages.imgVision, 'imgVision')}
                                        style={{
                                            margin: '0 auto',
                                            width: '40%',
                                            height: 200,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Image
                                            src={
                                                datosEmpresaImages.imgVision.url
                                                    ? datosEmpresaImages.imgVision.url
                                                    : "https://us.123rf.com/450wm/jabkitticha/jabkitticha1607/jabkitticha160700270/60102905-photo-icon.jpg?ver=6"
                                            }
                                            imageStyle={{
                                                position: 'realtive',
                                                paddingBottom: 10,
                                                width: '100%',
                                                height: 200,

                                            }}
                                            style={{
                                                paddingTop: 0,
                                            }}
                                        />
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Button
                                        onClick={() => handleOpen(datosEmpresaImages.imgValores, 'imgValores')}
                                        color="primary"
                                    >
                                        Imagen Valores
                                    </Button>
                                    <div
                                        onClick={() => handleOpen(datosEmpresaImages.imgValores, 'imgValores')}
                                        style={{
                                            margin: '0 auto',
                                            width: '40%',
                                            height: 200,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Image
                                            src={
                                                datosEmpresaImages.imgValores.url
                                                    ? datosEmpresaImages.imgValores.url
                                                    : "https://us.123rf.com/450wm/jabkitticha/jabkitticha1607/jabkitticha160700270/60102905-photo-icon.jpg?ver=6"
                                            }
                                            imageStyle={{
                                                position: 'realtive',
                                                paddingBottom: 10,
                                                width: '100%',
                                                height: 200,

                                            }}
                                            style={{
                                                paddingTop: 0,
                                            }}
                                        />
                                    </div>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button
                                disabled={loading}
                                onClick={handleSubmit}
                                color="primary"
                            >
                                {loading && <CircularProgress />}
                                {!loading && 'Guradar Cambios'} 
                            </Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));