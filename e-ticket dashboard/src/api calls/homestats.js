const getHomeStatistics = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(
    "http://localhost:4000/dashboardbackend/api/homestatistics.php",
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
      
  return    fetch("http://localhost:4000/dashboardbackend/api/getTicketCategoriesSummary.php", requestOptions)
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
export { getHomeStatistics ,fetchCategoryStats};
