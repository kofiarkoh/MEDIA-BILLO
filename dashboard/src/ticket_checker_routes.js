import React from 'react'
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
const VoteTransactions = React.lazy(()=>import('voting/VoteTransactions'))
const VotingDashboard  = React.lazy(()=>import('voting/VotingDashboard'))
const Contestants =  React.lazy(()=>import("./voting/Contestants"))
const VoteEvents =  React.lazy(()=>import("./voting/VoteEvents"))
const AddContestant=  React.lazy(()=>import("./voting/AddContestant"))
const AddVoteEvent =  React.lazy(()=>import("./voting/AddVoteEvent"))
const TransactionStatus =  React.lazy(()=>import("./views/TransactionStatus"))
const AddTicketLogo=  React.lazy(()=>import("./views/AddTicketLogo"))
const TicketTransactions =  React.lazy(()=>import("./views/TicketTransactions"))
const VerifyTicket =  React.lazy(()=>import("./views/VerifyTicket"))
const TicketSummary =  React.lazy(()=>import("./views/TicketSummary"))
const AddTicketCategory =  React.lazy(()=>import("./views/AddTicketCategory"))
const AddTicketEvent =  React.lazy(()=>import("./views/AddTicketEvent"))

var ticketCheckerRoutes = [
  {
    groupname: 'Tickets',
    id:'menu1',
    icon :'ni ni-badge text-primary',

    links: [
      
    {
      path: "/ticketverification",
      name: "Verify Ticket",
      icon: "ni ni-tv-2 text-primary",
      component:VerifyTicket,
      layout: "/admin"
    },
    ]
  },
  
 

  
];
export default ticketCheckerRoutes;
