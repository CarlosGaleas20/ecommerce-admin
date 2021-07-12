/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { Modal } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';

import './ImagesStyle.css';
import { uploadImage } from 'api/images';

export default function NewImage({
    images,
    setOpenModal,
    setReload,
    datosEmpresaImages,
    setDatosEmpresaImages,
    nombre
}) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [imagenU, setImagenU] = useState(null);
    const [imagenM, setImagenM] = useState(null);

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            const file = URL.createObjectURL(e.target.files[0]);
            setImagenU(file);
            setImagenM(e.target.files[0])
        } else {
            setImagenU(null);
            setImagenM(null);
        }
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log(imagenM);
        if (imagenM) {
            try {
                const response = await uploadImage(imagenM);
                console.log(response);
                if (response.statusCode === 400) {
                    toast.error('Error al subir la Imagen');
                } else {
                    toast.success('Imagen agregada correctamente');
                    setOpenModal(false);
                    setReload(true);
                    setDatosEmpresaImages({
                        ...datosEmpresaImages,
                        [nombre]: response.data[0],
                    })
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error('Debe seleccionar una imagen');
        }

        setLoading(false);
    }

    return (
        <div>
            <Modal.Content>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Suba una imagen</h2>
                    <Button
                        onClick={handleClose}
                        color="primary"
                    >
                        Terminar
                    </Button>
                    {
                        images &&
                        (
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                        <CardBody xs={12} sm={12} md={12}>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <div>
                                                        <form>
                                                            <p>Suba una imagen</p>
                                                            <input
                                                                type='file'
                                                                name='poster'
                                                                accept='image/gift, image/jpeg, image/png'
                                                                onChange={handleChange}
                                                            />
                                                            <Button
                                                                disabled={loading}
                                                                onClick={handleSubmit}
                                                                color="primary"
                                                                style={{
                                                                    marginTop: 30,
                                                                }}
                                                            >
                                                                {loading && <CircularProgress />}
                                                                {!loading && 'Guradar Cambios'}
                                                            </Button>
                                                        </form>
                                                    </div>
                                                </GridItem>
                                                <GridItem xs={12} sm={12} md={6}>
                                                    <div>
                                                        <p>Su imagen: </p>
                                                        {
                                                            setImagenU &&
                                                            <img
                                                                style={{
                                                                    width: '100%'
                                                                }}
                                                                src={imagenU}
                                                            />
                                                        }
                                                    </div>
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        )
                    }
                </div>
            </Modal.Content>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    imageSelected: {
        border: '1px solid #007bff',
    },
    imageNoSelected: {
        border: 'none',
    },
}));