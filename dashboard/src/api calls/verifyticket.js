import { BASE_URL, getHeaders } from "./baseurl";

export const verifyTicket = async (id)=>{
    var requestOptions = {
        method: 'GET',
        headers: getHeaders(),
        redirect: 'follow'
      };
      
  return    fetch(BASE_URL+"/api/checkticketstatus.php?id="+id, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch((error) => {
            console.log("error", error);
            return { resp_code: 500, message: error };
          });}

export const getTransactions = (id)=>{
  var requestOptions = {
    method: 'GET',
    headers: getHeaders(),
    redirect: 'follow'
  };
  
 return fetch(BASE_URL+"/api/gettransactions.php?id="+id, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch((error) => {
      console.log("error", error);
      return { resp_code: 500, message: error };
    });}
export const fetchTicketEvents = async()=>{
      var requestOptions = {
          method: 'GET',
          headers: getHeaders(),
          redirect: 'follow'
        };
        
        return fetch( BASE_URL+"/api/getTicketEvents.php", requestOptions)
          .then(response => response.json())
          .then(result =>{ console.log(result)
          return result
          })
          .catch(error => {console.log('error', error)
              return {resp_code:500,message:error}
      });
  }