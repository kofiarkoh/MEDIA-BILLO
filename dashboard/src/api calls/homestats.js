import { BASE_URL, getHeaders } from "./baseurl";

const getHomeStatistics = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: getHeaders()
  };

  return fetch(
    BASE_URL+"/api/homestatistics.php",
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
const fetchCategoryStats = ()=>{
    var requestOptions = {
        method: 'GET',
        headers: getHeaders(),
        redirect: 'follow'
      };
      
  return    fetch(BASE_URL+"/api/getTicketCategoriesSummary.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result) 
            return result
        })
        .catch((error) => {
            console.log("error", error);
            return { resp_code: 500, message: error };
          });
}

const updateTicketSellingStatus = (eventid,status )=>{
  var requestOptions = {
    method: 'GET',
    headers:getHeaders(),
    redirect: 'follow'
  };
  
return  fetch(BASE_URL+`/api/ticketsellingstatus.php?id=${eventid}&status=${status}`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch((error) => {
      console.log("error", error);
      return { resp_code: 500, message: error };
    });}
export { getHomeStatistics ,fetchCategoryStats,updateTicketSellingStatus};
