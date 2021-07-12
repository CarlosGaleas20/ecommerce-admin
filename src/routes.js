/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import WorkIcon from "@material-ui/icons/Work";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import InfoContact from "views/InfoContact/InfoContact";
import Products from "views/Products/Products";
import PedidosCredito from "views/Pedididos/PedidosCredito";
import PedidosDeposito from "views/Pedididos/PedidosDeposito";
import Users from "views/Users/Users";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/info",
    name: "Datos empresariales",
    icon: WorkIcon,
    component: InfoContact,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Gestión de productos",
    icon: PhoneIphoneIcon,
    component: Products,
    layout: "/admin",
  },
  {
    path: "/orders-credit",
    name: "Pedidos con Tarjeta",
    icon: CreditCardIcon,
    component: PedidosCredito,
    layout: "/admin",
  },
  {
    path: "/orders-deposit",
    name: "Pedidos con Deposito",
    icon: AccountBalanceIcon,
    component: PedidosDeposito,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Gestión de usuarios",
    icon: AccountCircleIcon,
    component: Users,
    layout: "/admin",
  },
];

export default dashboardRoutes;
