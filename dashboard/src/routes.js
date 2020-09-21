import React from "react";
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

/* import AddTicketEvent from "./views/AddTicketEvent";
import AddTicketCategory from "./views/AddTicketCategory";
import TicketSummary from "./views/TicketSummary";
import VerifyTicket from "./views/VerifyTicket";
import TicketTransactions from "./views/TicketTransactions";
import AddTicketLogo from "./views/AddTicketLogo";
import TransactionStatus from "./views/TransactionStatus";
import AddVoteEvent from "./voting/AddVoteEvent";
import AddContestant from "./voting/AddContestant";
import VoteEvents from "./voting/VoteEvents";
import Contestants from "./voting/Contestants"; */
/* import VoteTransactions from "voting/VoteTransactions";
import VotingDashboard from "voting/VotingDashboard";
 */
const VoteTransactions = React.lazy(() => import("voting/VoteTransactions"));
const VotingDashboard = React.lazy(() => import("voting/VotingDashboard"));
const Contestants = React.lazy(() => import("./voting/Contestants"));
const VoteEvents = React.lazy(() => import("./voting/VoteEvents"));
const AddContestant = React.lazy(() => import("./voting/AddContestant"));
const AddVoteEvent = React.lazy(() => import("./voting/AddVoteEvent"));
const TransactionStatus = React.lazy(() => import("./views/TransactionStatus"));
const AddTicketLogo = React.lazy(() => import("./views/AddTicketLogo"));
const TicketTransactions = React.lazy(() =>
  import("./views/TicketTransactions")
);
const VerifyTicket = React.lazy(() => import("./views/VerifyTicket"));
const TicketSummary = React.lazy(() => import("./views/TicketSummary"));
const AddTicketCategory = React.lazy(() => import("./views/AddTicketCategory"));
const AddTicketEvent = React.lazy(() => import("./views/AddTicketEvent"));
const AddUser = React.lazy(()=>import('./Users/AddUser'))
var routes = [
  {
    groupname: "Tickets",
    id: "menu1",
    icon: "ni ni-badge text-primary",
    access: ["super-admin", "ticketChecker", "admin",'contentCreator'],
    links: [
      {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/admin",
        access: ["super-admin", "admin"],
      },
      {
        path: "/newticketevent",
        name: "Add Ticket Event",
        icon: "ni ni-tv-2 text-primary",
        component: AddTicketEvent,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },
      {
        path: "/addlogo",
        name: "Add Ticket Logo",
        icon: "ni ni-tv-2 text-primary",
        component: AddTicketLogo,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },

      {
        path: "/newticketcategory",
        name: "Add Ticket Category",
        icon: "ni ni-tv-2 text-primary",
        component: AddTicketCategory,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },

      {
        path: "/ticketsummary",
        name: "Tickets Summary",
        icon: "ni ni-tv-2 text-primary",
        component: TicketSummary,
        layout: "/admin",
        access: ["super-admin", "admin"],
      },

      {
        path: "/ticketverification",
        name: "Verify Ticket",
        icon: "ni ni-tv-2 text-primary",
        component: VerifyTicket,
        layout: "/admin",
        access: ["ticketChecker",'contentCreator'],
      },
    ],
  },
  {
    groupname: "Voting",
    id: "menu2",
    icon: "ni ni-paper-diploma text-primary",
    access: ["super-admin", "admin",'contentCreator'],
    links: [
      {
        path: "/votedashboard",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: VotingDashboard,
        layout: "/admin",
        access: ["super-admin", "admin"],
      },
      {
        path: "/newvoteevent",
        name: "New Event",
        icon: "ni ni-tv-2 text-primary",
        component: AddVoteEvent,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },
      {
        path: "/addcontestant",
        name: "Add Contestant",
        icon: "ni ni-tv-2 text-primary",
        component: AddContestant,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },
      {
        path: "/votingevents",
        name: "Events",
        icon: "ni ni-tv-2 text-primary",
        component: VoteEvents,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },
      {
        path: "/contestants",
        name: "Contestants",
        icon: "ni ni-tv-2 text-primary",
        component: Contestants,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },
    ],
  },
  {
    groupname: "Transactions",
    id: "menu3",
    access: ["super-admin", "admin",'contentCreator'],
    icon: "ni ni-money-coins text-primary",
    links: [
      {
        path: "/tickettransactions",
        name: "Ticket Transactions",
        icon: faExchangeAlt,
        component: TicketTransactions,
        layout: "/admin",
        access: ["super-admin", "admin"],
      },
      {
        path: "/votetransactions",
        name: "Voting Transactions",
        icon: faExchangeAlt,
        component: VoteTransactions,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },
      {
        path: "/transstatus",
        name: "Transaction Status",
        icon: "ni ni-tv-2 text-primary",
        component: TransactionStatus,
        layout: "/admin",
        access: ["super-admin", "admin",'contentCreator'],
      },
    ],
  },
  {
    groupname: "Users",
    id: "menu4",
    access: ["super-admin", "admin"],
    icon: "ni ni-money-coins text-primary",
    links: [
      {
        path: "/adduser",
        name: "Add User",
        icon: faExchangeAlt,
        component: AddUser,
        layout: "/admin",
        access: ["super-admin", "admin"],
      },
    ]
  }
  
];
export default routes;
