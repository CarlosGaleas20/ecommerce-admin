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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Image from 'material-ui-image';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { map, size } from 'lodash';

import ModalImages from './Images/ModalImages';
import ModalImagesA from './Images/ModalImagesA';
import ImagenBox from './Images/ImagenBox';
import { addProduct } from 'api/products';
import useAuth from 'hooks/useAuth';
import { CircularProgress } from '@material-ui/core';

export default function ProductModal({ open, setOpen, categories, setReloadProducts }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalA, setOpenModalA] = useState(false);
    const [activeImage, setActiveImage] = useState(null);
    const [activeImageA, setActiveImageA] = useState([]);
    const [activeImageId, setActiveImageId] = useState([]);
    const { logout } = useAuth();


    const initialValues = {
        title: '',
        category: '',
        price: 1,
        amount: 10,
        discount: 0,
        description: '',
    };

    const validations = () => ({
        title: Yup.string().required(true),
        category: Yup.string().required(true),
        price: Yup.number().min(1, true).required(true),
        amount: Yup.number().integer().min(10, true).required(true),
        discount: Yup.number().integer().min(0, true).max(100, true).required(true),
        description: Yup.string().required(true),
    });

    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async (formData) => {
            setLoading(true);
            if (activeImage && size(activeImageId) > 0) {
                try {
                    const response = await addProduct(formData, activeImage, activeImageId, logout);
                    console.log(response);
                    if (response.statusCode === 500) {
                        toast.error('El nombre de producto ya existe. Cambie el nombre para agregar');
                    } else {
                        toast.success('Producto agregado correctamente');
                        setOpen(false);
                        setReloadProducts(true);
                        values.title = '';
                        values.category = '';
                        values.price = 1;
                        values.amount = 1;
                        values.discount = 0;
                        values.description = '';
                        setActiveImage(null);
                        setActiveImageA([]);
                        setActiveImageId([]);
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
            <ModalImagesA
                openModal={openModalA}
                setOpenModal={setOpenModalA}
                activeImage={activeImageA}
                setActiveImage={setActiveImageA}
                activeImageId={activeImageId}
                setActiveImageId={setActiveImageId}
            />
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nuevo Producto
                        </Typography>
                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            autoFocus
                            color="inherit"
                        >
                            {loading && <CircularProgress color="secondary" />}
                            {!loading && 'Guardar'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Agrega un nuevo Producto</h4>
                                <p className={classes.cardCategoryWhite}>Completa el formulario para agregar un producto:</p>
                            </CardHeader>
                            <CardBody xs={12} sm={12} md={12}>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Nombre del Producto:"
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
                                    <GridItem xs={12} sm={12} md={6}>
                                        <InputLabel id="demo-simple-select-label">Categoría:</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="category"
                                            value={values.category}
                                            error={errors.category}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                height: 50,
                                                padding: 10,
                                            }}
                                        >
                                            {
                                                map(categories, (categoryItem) => (
                                                    <MenuItem
                                                        key={categoryItem._id}
                                                        value={categoryItem._id}
                                                    >{categoryItem.title}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </GridItem>  
                                </GridContainer>
                                <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            type='number'
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Precio:"
                                            id="price"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="price"
                                            onChange={handleChange}
                                            error={errors.price}
                                            value={values.price}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            type='number'
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Cantidad"
                                            id="amount"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="amount"
                                            onChange={handleChange}
                                            error={errors.amount}
                                            value={values.amount}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            type='number'
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Descuento"
                                            id="discount"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="discount"
                                            onChange={handleChange}
                                            error={errors.discount}
                                            value={values.discount}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Descripción del producto"
                                            id="description"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="description"
                                            onChange={handleChange}
                                            error={errors.description}
                                            value={values.description}
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
                                    <GridItem xs={12} sm={12} md={6}>
                                        <Button
                                            onClick={() => setOpenModalA(true)}
                                            color="primary"
                                        >
                                            Imagenes del producto
                                        </Button>
                                        <div
                                            onClick={() => setOpenModalA(true)}
                                            style={{
                                                margin: '0 auto',
                                                height: 200,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {
                                                size(activeImageA) === 0
                                                    ? (<Image
                                                        src="https://us.123rf.com/450wm/jabkitticha/jabkitticha1607/jabkitticha160700270/60102905-photo-icon.jpg?ver=6"
                                                        imageStyle={{
                                                            position: 'realtive',
                                                            paddingBottom: 10,
                                                            width: '40%',
                                                            height: 200,

                                                        }}
                                                        style={{
                                                            paddingTop: 0,
                                                        }}
                                                    />)
                                                    : (<ImagenBox
                                                        activeImageA={activeImageA}
                                                    />)
                                            }

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