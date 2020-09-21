import { BASE_URL, getHeaders } from "./baseurl";

const createTicketEvent = (name, multiticket, price) => {
  var formdata = new FormData();
  formdata.append("name", name);
  formdata.append("multi", multiticket);
  formdata.append("price", price);

  var requestOptions = {
    method: "POST",
    headers:getHeaders(),
    body: formdata,
    redirect: "follow",
  };

  return fetch(
    BASE_URL+"/api/createEvent.php",
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
    headers:getHeaders(),
    body: formdata,
    redirect: "follow",
  };

 return fetch(BASE_URL+"/api/editsingleEvent.php", requestOptions)
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
