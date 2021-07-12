/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
// core components
import Button from "components/CustomButtons/Button.js";

import { Link } from 'react-router-dom';

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import useAuth from "hooks/useAuth";
import ModalNotification from "./ModalNotification";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks({ products, count }) {

  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const handleOpen = () => {
    setOpen(true);
  }

  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <div>
      <ModalNotification
        open={open}
        setOpen={setOpen}
        products={products}
      />
      <div className={classes.searchWrapper}>
        <p style={{
          paddingRight: 15,
        }}>
          {
            user && (`${user.name} ${user.lastname}`)
          }
        </p>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Inicio</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={handleOpen ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleOpen}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          {
            count > 0 &&
            <span className={classes.notifications}>{count}</span>
          }
          <Hidden mdUp implementation="css">
            <p onClick={handleOpen} className={classes.linkText}>
              Notificaciones
            </p>
          </Hidden>
        </Button>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Perfil de Usuario</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <Link to="/admin/user">
                      <MenuItem
                        className={classes.dropdownItem}
                      >
                        Tu perfil
                      </MenuItem>
                    </Link>
                    <Divider light />
                    <MenuItem
                      onClick={logout}
                      className={classes.dropdownItem}
                    >
                      Salir
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
