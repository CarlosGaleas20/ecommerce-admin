/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { size, map } from 'lodash';
import moment from 'moment';
import 'moment/locale/es';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import ModalEncuesta from "./ModalEncuestas";

const useStyles = makeStyles(styles);

export default function Dashboard({
  card,
  deposit,
  totalFavorites,
  totalUsers,
  responseEncuestas,
  encuestas,
  encuestasCard,
  totalProducts,
}) {

  const [open, setOpen] = useState(false);
  const classes = useStyles();


  return (
    <div>
      <ModalEncuesta
            open={open}
            setOpen={setOpen}
            encuestas={encuestas}
            encuestasCard={encuestasCard}
        />
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Ganacia del día</p>
              <h3 className={classes.cardTitle}>${(card.price + deposit.price).toFixed(2)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Ganancias del día: {moment().format('dddd')}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Pedidos no despachados</p>
              <h3 className={classes.cardTitle}>{card.amount + deposit.amount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Despacha esos pedidos
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>favorite</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Productos favoritos</p>
              <h3 className={classes.cardTitle}>
                {size(totalFavorites)}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <FavoriteIcon />
                Total de favoritos de tus clientes
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Clientes</p>
              <h3 className={classes.cardTitle}>{size(totalUsers)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Total de clientes
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Encuestas de satisfación</h4>
              <p className={classes.cardCategoryWhite}>
                Lo que piensas tus clientes de sus compras.
              </p>
            </CardHeader>
            <Button
              color="primary"
              style={{
                paddingTop: 10,
                fontSize: 12,
                marginBottom: -35,
                zIndex: 10,
              }}
              onClick={() => setOpen(true)}
            >Ver más detalles</Button>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={["Id", "Nivel de Satisfacción", "Total de respuestas", "Porcentaje"]}
                tableData={
                  map(responseEncuestas, (item) => [
                    item.id, item.nombre, item.totalRespuestas, `${item.porcentaje}%`
                  ])
                }
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Top 5 Productos más vendidos</h4>
              <p className={classes.cardCategoryWhite}>
                Los productos mas pedidos por tus clientes
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={["Id", "Producto", "Cantidad comprado", "Total recaudado"]}
                tableData={
                  map(totalProducts, (item, index) => [
                    `${index + 1}`, item.nombre, item.cantidad, `$${(item.precio).toFixed(2)}`
                  ])
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}