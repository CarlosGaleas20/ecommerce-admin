/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import Image from 'material-ui-image';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import ModalImages from './Images/ModalImages';
import useAuth from 'hooks/useAuth';
import { addCategory } from 'api/categories';
import { CircularProgress } from '@material-ui/core';

export default function CategoryModal({ open, setOpen, setReloadCategories }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [activeImage, setActiveImage] = useState(null);
    const { logout } = useAuth();


    const initialValues = {
        title: '',
        descripcion: '',
    };

    const validations = () => ({
        title: Yup.string().required(true),
        descripcion: Yup.string().required(true),
    });

    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async (formData) => {
            setLoading(true);
            if (activeImage) {
                try {
                    const response = await addCategory(formData, activeImage, logout);
                    console.log(response);
                    if (response.statusCode === 500) {
                        toast.error('El nombre de la categoría ya existe. Cambie el nombre para agregar');
                    } else {
                        toast.success('Categoría agregada correctamente');
                        setOpen(false);
                        setReloadCategories(true);
                        values.title = '';
                        values.description = '';
                        setActiveImage(null);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                toast.error('Debe subir las imagenes');
            }

            setLoading(false);
        }
    })

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ModalImages
                openModal={openModal}
                setOpenModal={setOpenModal}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
            />
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nueva Categoría
                        </Typography>
                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            autoFocus
                            color="inherit"
                        >
                            {loading && <CircularProgress color="secondary" />}
                            {!loading && 'Guradar'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Agrega una nueva Categoría</h4>
                                <p className={classes.cardCategoryWhite}>Completa el formulario para agregar una categoría:</p>
                            </CardHeader>
                            <CardBody xs={12} sm={12} md={12}>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Nombre de la Categoría:"
                                            id="title"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="title"
                                            onChange={handleChange}
                                            error={errors.title}
                                            value={values.title}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={8}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Descripción de la Categoría"
                                            id="descripcion"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="descripcion"
                                            onChange={handleChange}
                                            error={errors.descripcion}
                                            value={values.descripcion}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Button
                                            onClick={() => setOpenModal(true)}
                                            color="primary"
                                        >
                                            Portada
                                        </Button>
                                        <div
                                            onClick={() => setOpenModal(true)}
                                            style={{
                                                margin: '0 auto',
                                                width: '40%',
                                                height: 200,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Image
                                                src={
                                                    activeImage
                                                        ? activeImage.url
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
            </Dialog>
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});