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
import useAuth from "hooks/useAuth";
import { updateInfoDeposit } from "api/infoContact";

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

export default function InfoBody({ infoDeposit, setReloadDeposit }) {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const { logout } = useAuth()

  const initialValues = {
    nombreBanco: infoDeposit.nombreBanco,
    tipoCuenta: infoDeposit.tipoCuenta,
    nombrePropietario: infoDeposit.nombrePropietario,
    numeroCuenta: infoDeposit.numeroCuenta,
  };

  const validations = () => ({
    nombreBanco: Yup.string().required(true),
    tipoCuenta: Yup.string().required(true),
    nombrePropietario: Yup.string().required(true),
    numeroCuenta: Yup.string().min(10, true).max(10, true).required(true),
  });

  const { handleSubmit, handleChange, errors, values } = useFormik({
    initialValues,
    validationSchema: Yup.object(validations()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateInfoDeposit(formData, logout);
      console.log(response);
      if (response.status === 400) {
        toast.error('Hubo algun error');
      } else {
        setReloadDeposit(true);
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
              <h4 className={classes.cardTitleWhite}>Información de Deposito</h4>
              <p className={classes.cardCategoryWhite}>Completa la información de deposito de la página</p>
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
                    label="Nombre del Banco:"
                    id="nombreBanco"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    name="nombreBanco"
                    onChange={handleChange}
                    error={errors.nombreBanco}
                    value={values.nombreBanco}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="off"
                    label="Tipo de la cuenta"
                    id="tipoCuenta"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    name="tipoCuenta"
                    onChange={handleChange}
                    error={errors.tipoCuenta}
                    value={values.tipoCuenta}
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
                    label="Titular de la cuenta"
                    id="nombrePropietario"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    name="nombrePropietario"
                    onChange={handleChange}
                    error={errors.nombrePropietario}
                    value={values.nombrePropietario}
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
                    label="Numero de la cuenta"
                    id="numeroCuenta"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    name="numeroCuenta"
                    onChange={handleChange}
                    error={errors.numeroCuenta}
                    value={values.numeroCuenta}
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
                Banco: <span style={{ color: '#007bff' }}>{infoDeposit.nombreBanco}</span>
              </p>
              <p className={classes.description}>
                Tipo de cuenta: <span style={{ color: '#007bff' }}>{infoDeposit.tipoCuenta}</span>
              </p>
              <p className={classes.description}>
                Numero de cuenta: <span style={{ color: '#007bff' }}>{infoDeposit.numeroCuenta}</span>
              </p>
              <p className={classes.description}>
                Titular: <span style={{ color: '#007bff' }}>{infoDeposit.nombrePropietario}</span>
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}