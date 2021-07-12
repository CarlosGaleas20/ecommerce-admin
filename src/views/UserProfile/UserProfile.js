/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from '@material-ui/core/Button';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import avatar from "assets/img/faces/marc.jpg";
import { updateNameUser } from "api/user";
import { CircularProgress } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile({ user, logout, setReloaderUser }) {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { name, lastname, email, username, id } = user;

  const initialValues = {
    name: name,
    lastname: lastname,
    username: username,
    email: email,
    password: '',
    repeatPassword: '',
  };

  const validations = () => ({
    name: Yup.string().required('Su nombre es obligatorio'),
    lastname: Yup.string().required('Su apellido es obligatorio'),
    username: Yup.string().required('Su apellido es obligatorio'),
    email: Yup.string()
      .email()
      .required('Debe ingresar nuevamente el correo'),
    password: Yup.string().min(6, true)
      .required('Debe ingresar una contraseña')
      .oneOf([Yup.ref('repeatPassword')], 'Los contraseñas deben ser iguales'),
    repeatPassword: Yup.string().min(6, true)
      .required('Debe ingresar la misma contraseña')
      .oneOf([Yup.ref('password')], 'Los contraseñas deben ser iguales')
  });

  const { handleSubmit, handleChange, errors, values } = useFormik({
    initialValues,
    validationSchema: Yup.object(validations()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateNameUser(id, formData, logout);
      console.log(response);
      if (response.status === 400) {
        toast.error('Usuario o correo ya registrados. Cambie esos datos');
      } else {
        setReloaderUser(true);
        toast.success('Datos actualizados correctaemnte');
      }
      setLoading(false);
    }
  })


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edita tu perfil</h4>
              <p className={classes.cardCategoryWhite}>Completa los datos: {user.name}</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="off"
                    label="Nombre"
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
                <GridItem xs={12} sm={12} md={6}>
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="off"
                    label="Nombre de Usuario"
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
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="off"
                    label="Nueva contraseña"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    type="password"
                    name="password"
                    onChange={handleChange}
                    error={errors.password}
                    value={values.password}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="off"
                    label="Repita la contraseña"
                    id="repeatPassword"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    type="password"
                    name="repeatPassword"
                    onChange={handleChange}
                    error={errors.repeatPassword}
                    value={values.repeatPassword}
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
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Administrador</h6>
              <h4 className={classes.cardTitle}>Nombres: <span style={{ color: '#007bff' }}>{name} {lastname}</span></h4>
              <p className={classes.description}>
                Nombre de usuario: <span style={{ color: '#007bff' }}>{username}</span>
              </p>
              <p className={classes.description}>
                Correo: <span style={{ color: '#007bff' }}>{email}</span>
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
