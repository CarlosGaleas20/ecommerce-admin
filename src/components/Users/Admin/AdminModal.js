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

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { CircularProgress } from '@material-ui/core';
import { registerAdmin } from 'api/user';

export default function AdminModal({ open, setOpen, setReloadOrder }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);


    const initialValues = {
        name:'',
        lastname: '',
        username: '',
        email: '',
        password: ''
    };

    const validations = () => ({
        name: Yup.string().required('El nombre es obligatorio'),
        lastname: Yup.string().required('El apellido es obligatorio'),
        username: Yup.string().required('El User Name es obligatorio'),
        email: Yup.string().email().required('El email es obligatorio'),
        password: Yup.string().min(6, true).required('La contraseña es obligatorio')
    });

    const {handleSubmit, handleChange, errors, values} = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async(formData) =>{
            setLoading(true);
            const response = await registerAdmin(formData);
            if(response?.jwt){
              toast.success('Administrador agregado correctamente');
              setReloadOrder(true);
              handleClose();
            }else {
              toast.error(`Error de registro: ${response.message[0].messages[0].message}`);
            }
            setLoading(false);
        }
    })

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nuevo Administrador
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Guardar
                        </Button>
                    </Toolbar>
                </AppBar>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Agrega un nuevo Administrador</h4>
                                <p className={classes.cardCategoryWhite}>Completa el formulario para agregar un administrador:</p>
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
                                            label="Nombre:"
                                            id="name"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="name"
                                            onChange={handleChange}
                                            error={errors.name}
                                            value={values.name}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Apellido"
                                            id="lastname"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="lastname"
                                            onChange={handleChange}
                                            error={errors.lastname}
                                            value={values.lastname}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Nombre de usuario:"
                                            id="username"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="username"
                                            onChange={handleChange}
                                            error={errors.username}
                                            value={values.username}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Correo"
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="email"
                                            onChange={handleChange}
                                            error={errors.email}
                                            value={values.email}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            type="password"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Contraseña"
                                            id="password"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="password"
                                            onChange={handleChange}
                                            error={errors.password}
                                            value={values.password}
                                        />
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