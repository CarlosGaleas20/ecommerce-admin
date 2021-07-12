/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Image from 'material-ui-image';
import { Link, useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { registerUser } from "api/user";

export default function Register() {

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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

    const {handleSubmit, handleChange, errors} = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async(formData) =>{
            setLoading(true);
            const response = await registerUser(formData);
            if(response?.jwt){
              toast.success('Usuario Registrado Correctamente');
              history.push('/auth/login');
            }else {
              toast.error(`Error de registro: ${response.message[0].messages[0].message}`);
            }
            setLoading(false);
        }
    })



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Image
          src="https://ecommerce-tesis.s3.amazonaws.com/logo_c3d9d660cb.png"
          imageStyle={{
            position: 'realtive',
            paddingBottom: 10,
            
          }}
          style={{
            paddingTop: 0,
          }}
        />
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                onChange={handleChange}
                error={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Apellido"
                name="lastname"
                autoComplete="off"
                onChange={handleChange}
                error={errors.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Nombre de usuario"
                name="username"
                autoComplete="off"
                onChange={handleChange}
                error={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo"
                name="email"
                autoComplete="off"
                onChange={handleChange}
                error={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                error={errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading && <CircularProgress />}
            {!loading && 'Registrate'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/auth/login" variant="body2">
                ¿Ya tienes una cuenta? Logueate.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Señor de Maca
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
