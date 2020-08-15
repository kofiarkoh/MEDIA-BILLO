const getHomeStatistics = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    "http://admin.mediabillo.net/tdb/dashboardbackend/api/homestatistics.php",
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
        redirect: 'follow'
      };
      
  return    fetch("http://admin.mediabillo.net/tdb/dashboardbackend/api/getTicketCategoriesSummary.php", requestOptions)
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
    redirect: 'follow'
  };
  
return  fetch(`http://admin.mediabillo.net/tdb/dashboardbackend/api/ticketsellingstatus.php?id=${eventid}&status=${status}`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch((error) => {
      console.log("error", error);
      return { resp_code: 500, message: error };
    });}
export { getHomeStatistics ,fetchCategoryStats,updateTicketSellingStatus};
