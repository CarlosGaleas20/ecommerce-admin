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

import EditorCustom from './EditorCustom';
import { toast } from 'react-toastify';

import useAuth from 'hooks/useAuth';
import { CircularProgress, InputLabel } from '@material-ui/core';
import { updateTerms } from 'api/infoContact';

export default function TermModal({ open, setOpen, setReloadTerms, activeEdit, setActiveEdit }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [terms, setTerms] = useState({
        titulo: activeEdit.titulo,
        descripcion: activeEdit.descripcion,
    });
    const { logout } = useAuth();

    const handleChange = ({ target }) => {
        setTerms({
            ...terms,
            [target.name]: target.value,
        })
    }


    const handleSubmit = async () => {
        setLoading(true);
        if (terms.titulo && terms.descripcion) {
            try {
                const response = await updateTerms(activeEdit.id, terms, logout);
                console.log(response);
                if (response.statusCode === 500) {
                    toast.error('El nombre del t??rmino o condici??n ya existe. Cambie el nombre para agregar');
                } else {
                    toast.success('T??rmino o condici??n modificada correctamente');
                    setOpen(false);
                    setReloadTerms(true);
                    setTerms({
                        titulo: '',
                        descripcion: '',
                    });
                    setActiveEdit(null);

                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error('Debe llenar todos los datos para continuar');
        }
        setLoading(false);
    };

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
                            T??rmino o Condici??n: {activeEdit.titulo}
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
                                <h4 className={classes.cardTitleWhite}>Modif??ca un T??rmino o Condici??n</h4>
                                <p className={classes.cardCategoryWhite}>Completa el formulario para modificar un T??rmino o Condici??n:</p>
                            </CardHeader>
                            <CardBody xs={12} sm={12} md={12}>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="off"
                                            label="Nombre del t??rmino o condici??n:"
                                            id="titulo"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            name="titulo"
                                            onChange={handleChange}
                                            value={terms.titulo}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <InputLabel style={{
                                            marginTop: 20,
                                        }}>Descripci??n del t??rmino o condici??n:</InputLabel>
                                        <EditorCustom
                                            val={terms}
                                            activeVal={terms.descripcion}
                                            name='descripcion'
                                            setVal={setTerms}
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