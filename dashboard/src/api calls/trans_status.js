import { getHeaders } from "./baseurl";

export const verifyTransaction = async (id)=>{
    var requestOptions = {
        method: 'GET',
        headers:getHeaders(),
        redirect: 'follow'
      };
      
      //var promise =
      return Promise.race([
        fetch('https://www.admin.mediabillo.net/appbackend/VoteRecording/fetchPaymentStatus.php?id='+id, requestOptions)
          .then(response => response.json()),
        new Promise((resolve, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 30000)
        )
      ]);
   /*    
    return  promise.then(result =>{
        console.log(result)
        return result
    }).catch(error => alert(error)); */
      //promise
}