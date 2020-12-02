import React from 'react';

const VerifyTicket =  React.lazy(()=>import("./views/VerifyTicket"))


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
