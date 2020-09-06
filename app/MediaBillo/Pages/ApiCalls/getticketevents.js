const fetchTicketEvents = async()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      var ur1 = 'http://admin.mediabillo.net/tdb/api/ticketevents.php'
      var ur2 = "http://192.168.8.100:8000/ticketevents.php"
      
      return fetch(ur1, requestOptions)
        .then(response => response.json())
        .then(result =>{ console.log(result)
        return result
        })
        .catch(error => {console.log('error', error)
            return {resp_code:500,message:error}
    });
}
const sendTicketOtp = async (data)=>{
  var formdata = new FormData();
formdata.append("phone", data.phone);
formdata.append("eventid", data.eventid);
formdata.append("ntwkType", data.ntwk);
formdata.append("cat_id", data.catId);
formdata.append("numTickets", data.numTickets);
formdata.append("price", data.price);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};
var promise = Promise.race([fetch("http://admin.mediabillo.net/tdb/api/sendotp.php", requestOptions)
.then(response => response.json()),
new Promise((resolve, reject) =>
setTimeout(() => reject(new Error('Timeout')), 15000)
)
])

return promise.then(result => {
  console.log(result)
  return result
})
.catch(error => {console.log('error', error)
          return {resp_code:500,message:error}
})
/* return fetch("http://admin.mediabillo.net/tdb/api/sendotp.php", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    return result
  })
  .catch(error => {console.log('error', error)
            return {resp_code:500,message:error}
}) */

}

const sendOtpConfirmation = async(otp)=>{
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
 return fetch("http://admin.mediabillo.net/tdb/api/verifyotp.php?otp="+otp, requestOptions)
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
export {fetchTicketEvents,sendTicketOtp,sendOtpConfirmation}