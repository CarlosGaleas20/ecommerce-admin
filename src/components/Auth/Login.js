/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Image from 'material-ui-image';
import { Link } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { loginUser } from "api/user";


export default function Login() {

  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const initialValues = {
    identifier: '',
    password: ''
  };

  const validations = () => ({
    identifier: Yup.string().email().required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatorio')
  });

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema: Yup.object(validations()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginUser(formData);
      if (response?.jwt) {
        if (response.user.type === 'Admin') {
          if (response.user.active) {
            login(response.jwt);
            toast.success(`Bienvenido: ${response.user.name} ${response.user.lastname}`);
          } else {
            toast.error(`Su cuenta no esta activa. Comuniquese con un administrador.`);
          }
        } else {
          toast.error(`Credenciales de la cuenta no validos`);
        }
      } else {
        toast.error(`Error de inicio: ${response.message[0].messages[0].message}`);
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
          Login de administrador
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Dirección o nombre de usuario"
            name="identifier"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            error={errors.identifier}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
            {!loading && 'Iniciar Sesión'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvido su contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/auth/register" variant="body2">
                {"¿No tiene una cuenta? Registrese"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
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
