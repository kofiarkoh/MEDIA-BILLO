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
const sendOtp = async (phone,eventid,ntwk,cat_id,numTickets,price)=>{
  var formdata = new FormData();
formdata.append("phone", phone);
formdata.append("eventid", eventid);
formdata.append("ntwkType", ntwk);
formdata.append("cat_id", cat_id);
formdata.append("numTickets", numTickets);
formdata.append("price", price);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

return fetch("http://192.168.8.100:4000/api/sendotp.php", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    return result
  })
  .catch(error => {console.log('error', error)
            return {resp_code:500,message:error}
})
}

const sendOtpConfirmation = async(otp)=>{
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
 return fetch("http://192.168.8.100:4000/api/verifyotp.php?otp="+otp, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      return result
    })
    .catch(error => {
      console.log('error', error)
            return {resp_code:500,message:error}
})
}
export {fetchTicketEvents,sendOtp,sendOtpConfirmation}