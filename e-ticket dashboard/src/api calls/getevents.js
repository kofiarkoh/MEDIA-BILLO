const getevents = async()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
  return    fetch("http://admin.mediabillo.net/tdb/dashboardbackend/api/getEventlist.php", requestOptions)
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
      
  return    fetch("http://admin.mediabillo.net/tdb/dashboardbackend/api/getTicketEvents.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            return result
        })
        .catch(error => console.log('error', error));
}

export {getevents,getTicketEvents}