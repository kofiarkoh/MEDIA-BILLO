const fetchTicketEvents = async()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return fetch("http://192.168.8.100:4000/api/ticketevents.php", requestOptions)
        .then(response => response.json())
        .then(result =>{ console.log(result)
        return result
        })
        .catch(error => {console.log('error', error)
            return {resp_code:500,message:error}
    });
}

export {fetchTicketEvents}