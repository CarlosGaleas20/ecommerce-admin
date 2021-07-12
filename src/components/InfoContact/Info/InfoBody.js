/* eslint-disable prettier/prettier */
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

import { CircularProgress } from "@material-ui/core";
import { updateInfoContact } from "api/infoContact";
import useAuth from "hooks/useAuth";

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

export default function InfoBody({ info, setReloadInfo }) {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const { logout } = useAuth()

  const initialValues = {
    email: info.email,
    direccion: info.direccion,
    horarioApertura: info.horarioApertura,
    telefono: info.telefono,
  };

  const validations = () => ({
    email: Yup.string().email().required(true),
    direccion: Yup.string().required(true),
    horarioApertura: Yup.string().required(true),
    telefono: Yup.string().min(9, true).max(10, true).required(true),
  });

  const { handleSubmit, handleChange, errors, values } = useFormik({
    initialValues,
    validationSchema: Yup.object(validations()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateInfoContact(formData, logout);
      console.log(response);
      if (response.status === 400) {
        toast.error('Hubo algun error');
      } else {
        setReloadInfo(true);
        toast.success('Actualización Correcta');
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
              <h4 className={classes.cardTitleWhite}>Información de Contacto</h4>
              <p className={classes.cardCategoryWhite}>Completa la información de contacto de la página</p>
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
                    label="Correo de la empresa:"
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
                    required
                    fullWidth
                    autoComplete="off"
                    label="Dirección de la empresa"
                    id="direccion"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    name="direccion"
                    onChange={handleChange}
                    error={errors.direccion}
                    value={values.direccion}
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
                    label="Horario de atención"
                    id="horarioApertura"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    name="horarioApertura"
                    onChange={handleChange}
                    error={errors.horarioApertura}
                    value={values.horarioApertura}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    type='number'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="off"
                    label="Telefono de Contacto"
                    id="telefono"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    name="telefono"
                    onChange={handleChange}
                    error={errors.telefono}
                    value={values.telefono}
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
                <img src='https://ecommerce-tesis.s3.amazonaws.com/logo_c3d9d660cb.png' alt="Logo Señor de Maca" />
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Información actual:</h6>
              <p className={classes.description}>
                Correo: <span style={{ color: '#007bff' }}>{info.email}</span>
              </p>
              <p className={classes.description}>
                Dirección: <span style={{ color: '#007bff' }}>{info.direccion}</span>
              </p>
              <p className={classes.description}>
                Horario de apertura: <span style={{ color: '#007bff' }}>{info.horarioApertura}</span>
              </p>
              <p className={classes.description}>
                Teléfono: <span style={{ color: '#007bff' }}>{info.telefono}</span>
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}