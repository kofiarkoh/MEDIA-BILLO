const createTicketEvent = (name, multiticket, price) => {
  var formdata = new FormData();
  formdata.append("name", name);
  formdata.append("multi", multiticket);
  formdata.append("price", price);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch(
    "http://localhost:4000/dashboardbackend/api/createEvent.php",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return { resp_code: 500, message: error };
    });
};
const updateTicketEvent = async (id,name,price,multiticket) => {
  var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("new_name", name);
  formdata.append("new_price", price);
  formdata.append("multi_ticket", multiticket);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

 return fetch("http://localhost:4000/dashboardbackend/api/editsingleEvent.php", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return { resp_code: 500, message: error };
    });
};
export { createTicketEvent,updateTicketEvent };
