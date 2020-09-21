import { BASE_URL, getHeaders } from "./baseurl";
import { AUTH_TOKEN } from "votingapis/api_const";

const createTicketCategory = async(event_id,categories)=>{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append('Authorization'+AUTH_TOKEN)
//var raw = JSON.stringify({"event_id":"MBE-3325","categories":[{"name":"cat 1","price":49},{"name":"cat 2","price":439},{"name":"cat 3","price":349}]});
var raw = JSON.stringify(
    {"event_id":event_id,
    "categories": categories});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

return fetch( BASE_URL+"/api/createTicketCategory.php", requestOptions)
  .then(response => response.json())
  .then(result => {
      console.log(result)
      return result
  })
  .catch(error => console.log('error', error));
}
const updateTicketCategory = async (catId,name,price,soldout) => {
  var formdata = new FormData();
  formdata.append("id", catId);
  formdata.append("new_name", name);
  formdata.append("new_price", price);
  formdata.append("sold_out", soldout);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: getHeaders(),
    redirect: "follow",
  };

 return fetch(BASE_URL+"/api/editTicketCategory.php", requestOptions)
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
export {createTicketCategory,updateTicketCategory}