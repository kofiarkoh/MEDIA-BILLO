
var routes = [
  {
    groupname: 'Tickets',
    id:'menu1',
    //icon :'ni ni-badge text-primary',

    links: [
      {path: "/index",
      name: "Dashboard",
      //icon: "ni ni-tv-2 text-primary",
      //component: Index,
      layout: "/admin"
    },
    {
      path: "/newticketevent",
      name: "Add Ticket Event",
      //icon: "ni ni-tv-2 text-primary",
      //component: AddTicketEvent,
      layout: "/admin"
    },
    {
      path: "/addlogo",
      name: "Add Ticket Logo",
      //icon: "ni ni-tv-2 text-primary",
      //component: AddTicketLogo,
      layout: "/admin"
    },
  
    {
      path: "/newticketcategory",
      name: "Add Ticket Category",
      //icon: "ni ni-tv-2 text-primary",
      //component: AddTicketCategory,
      layout: "/admin"
    },
  
    {
      path: "/ticketsummary",
      name: "Tickets Summary",
      //icon: "ni ni-tv-2 text-primary",
      //component:TicketSummary,
      layout: "/admin"
    },
  
    {
      path: "/ticketverification",
      name: "Verify Ticket",
      //icon: "ni ni-tv-2 text-primary",
      //component:VerifyTicket,
      layout: "/admin"
    },
    ]
  },
  {
    groupname : 'Voting',
    id:'menu2',
    //icon :'ni ni-paper-diploma text-primary',

    links: [
      {
        path: "/votedashboard",
        name: "Dashboard",
        //icon: "ni ni-tv-2 text-primary",
        //component:VotingDashboard,
        layout: "/admin"
      },
      {
        path: "/newvoteevent",
        name: "New Event",
        //icon: "ni ni-tv-2 text-primary",
        //component:AddVoteEvent,
        layout: "/admin"
      },
      {
        path: "/addcontestant",
        name: "Add Contestant",
        //icon: "ni ni-tv-2 text-primary",
        //component:AddContestant,
        layout: "/admin"
      },
      {
        path: "/votingevents",
        name: "Events",
        //icon: "ni ni-tv-2 text-primary",
        //component:VoteEvents,
        layout: "/admin"
      },
      {
        path: "/contestants",
        name: "Contestants",
        //icon: "ni ni-tv-2 text-primary",
        //component:Contestants,
        layout: "/admin"
      },
    ]
    
  },
  {
    groupname:'Transactions',
    id:'menu3',
    //icon :"ni ni-money-coins text-primary",
    links: [
      {
        path: "/tickettransactions",
        name: "Ticket Transactions",
        //icon: faExchangeAlt,
        //component:TicketTransactions,
        layout: "/admin"
      },
      {
        path: "/votetransactions",
        name: "Voting Transactions",
        //icon: faExchangeAlt,
        //component:VoteTransactions,
        layout: "/admin"
      },
      {
        path: "/transstatus",
        name: "Transaction Status",
        //icon: "ni ni-tv-2 text-primary",
        //component:TransactionStatus,
        layout: "/admin"
      }
    ]
  }

  /* {
    path: "/index",
    name: "Dashboard",
    //icon: "ni ni-tv-2 text-primary",
    //component: Index,
    layout: "/admin"
  },
  {
    path: "/newticketevent",
    name: "Add Ticket Event",
    //icon: "ni ni-tv-2 text-primary",
    //component: AddTicketEvent,
    layout: "/admin"
  },
  {
    path: "/addlogo",
    name: "Add Ticket Logo",
    //icon: "ni ni-tv-2 text-primary",
    //component: AddTicketLogo,
    layout: "/admin"
  },

  {
    path: "/newticketcategory",
    name: "Add Ticket Category",
    //icon: "ni ni-tv-2 text-primary",
    //component: AddTicketCategory,
    layout: "/admin"
  },

  {
    path: "/ticketsummary",
    name: "Tickets Summary",
    //icon: "ni ni-tv-2 text-primary",
    //component:TicketSummary,
    layout: "/admin"
  },

  {
    path: "/ticketverification",
    name: "Verify Ticket",
    //icon: "ni ni-tv-2 text-primary",
    //component:VerifyTicket,
    layout: "/admin"
  },

  {
    path: "/tickettransactions",
    name: "Ticket Transactions",
    //icon: "ni ni-tv-2 text-primary",
    //component:TicketTransactions,
    layout: "/admin"
  },
  {
    path: "/transstatus",
    name: "Transaction Status",
    //icon: "ni ni-tv-2 text-primary",
    //component:TransactionStatus,
    layout: "/admin"
  }, */













 /* 
  {
    path: "///icons",
    name: "//Icons",
    //icon: "ni ni-planet text-blue",
    //component: //Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    //icon: "ni ni-pin-3 text-orange",
    //component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    //icon: "ni ni-single-02 text-yellow",
    //component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    //icon: "ni ni-bullet-list-67 text-red",
    //component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    //icon: "ni ni-key-25 text-info",
    //component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    //icon: "ni ni-circle-08 text-pink",
    //component: Register,
    layout: "/auth"
  }  */
];

const access_levels = ['super-admin','admin','ticket-checker']
var current_user  = 'admin' 
var links = routes
console.log(links)