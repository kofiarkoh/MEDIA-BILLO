import { verifyTransaction } from "api calls/trans_status";
import React, { useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/css/tabulator.min.css";
import "react-tabulator/lib/styles.css"; // required styles
import { sweetAlertMsg } from "votingapis/api_const";
import "./tabulatorStyles.css";
import Loading from "components/Loaders/Loading";

export default function VoteTransactionsTable(props) {
//  const [isloading, props.setload] = useState(false);
  const columns = [
    { title: "Date", field: "trans_date", width: 150 },
    {
      title: "TRANS_ID",
      field: "trans_id",
      hozAlign: "left",
      cellClick: (e, cell) => {
        console.log(cell._cell.value);
        verify(cell._cell.value);
      },
    },
    {
      title: "PHONE",
      field: "phone_number",
      headerFilter: true,
      headerFilterPlaceholder: "search",
    },
    {
      title: "VOTES",
      field: "votes",
      hozAlign: "center",
      headerFilter: true,
      headerFilterPlaceholder: "search",
    },
    {
      title: "STATUS",
      field: "status",
      hozAlign: "center",
      formatter: (cell, params, rendered) => {
        var status = cell.getValue();
        if (status === "completed") {
          return `<span class='success-row'>${cell.getValue()}</span> `;
        } else if (status === "failed") {
          return `<span class='failed-row'>${cell.getValue()}</span> `;
        } else {
          return `<span class='pending-row'>${cell.getValue()}</span> `;
        }
      },
    },
  ];
  const verify = async (id) => {
    props.setload(true);
    var res = verifyTransaction(id);
    res.then((resp) => {
      props.setload(false);
      console.log(resp);
      if (resp.message) {
        sweetAlertMsg(resp.message, "success");
      } else {
        props.setload(false);
        sweetAlertMsg(resp.resp_desc, "error");
      }
    }).catch((e)=>{
      props.setload(false);
        sweetAlertMsg(e, "error");
    });
  };
  return props.data.length === 0 ? (
    <></>
  ) : (
    <>
  
    <ReactTabulator
      data={props.data}
      columns={columns}
      tooltips={true}
      options={{
        pagination: "local",
        paginationSize: 10,
        reactiveData: true,
      }}
    />
    </>
  );
}
