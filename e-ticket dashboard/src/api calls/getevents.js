import { BASE_URL } from "./baseurl";

const getevents = async()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
  return    fetch(BASE_URL+"/api/getEventlist.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            return result
        })
        .catch(error => console.log('error', error));
}
const getTicketEvents = async()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
  return    fetch(BASE_URL+"/api/getTicketEvents.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            return result
        })
        .catch(error => console.log('error', error));
}

export {getevents,getTicketEvents}