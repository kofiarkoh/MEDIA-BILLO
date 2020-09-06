/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import AddTicketEvent from "./views/AddTicketEvent";
import AddTicketCategory from "./views/AddTicketCategory";
import TicketSummary from "./views/TicketSummary";
import VerifyTicket from "./views/VerifyTicket";
import TicketTransactions from "./views/TicketTransactions";
import AddTicketLogo from "./views/AddTicketLogo";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/newticketevent",
    name: "Add Ticket Event",
    icon: "ni ni-tv-2 text-primary",
    component: AddTicketEvent,
    layout: "/admin"
  },
  {
    path: "/addlogo",
    name: "Add Ticket Logo",
    icon: "ni ni-tv-2 text-primary",
    component: AddTicketLogo,
    layout: "/admin"
  },

  {
    path: "/newticketcategory",
    name: "Add Ticket Category",
    icon: "ni ni-tv-2 text-primary",
    component: AddTicketCategory,
    layout: "/admin"
  },

  {
    path: "/ticketsummary",
    name: "Tickets Summary",
    icon: "ni ni-tv-2 text-primary",
    component:TicketSummary,
    layout: "/admin"
  },

  {
    path: "/ticketverification",
    name: "Verify Ticket",
    icon: "ni ni-tv-2 text-primary",
    component:VerifyTicket,
    layout: "/admin"
  },

  {
    path: "/tickettransactions",
    name: "Ticket Transactions",
    icon: "ni ni-tv-2 text-primary",
    component:TicketTransactions,
    layout: "/admin"
  },













 /* 
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }  */
];
export default routes;
