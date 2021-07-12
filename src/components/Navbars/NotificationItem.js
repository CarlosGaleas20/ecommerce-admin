/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function NotificationItem({product, setOpen}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Cantidad restante: {product.amount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link to="/admin/products">
        <Button size="small" color="primary" onClick={() => setOpen(false)}>
          Ir a sus productos
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}