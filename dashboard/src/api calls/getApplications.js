import { BASE_URL, getHeaders } from "./baseurl";
////
const base_link = 'http://admin.mediabillo.net/backend/applications' // 'http://localhost:3001/applications'
const getApplications = async()=>{
    var requestOptions = {
        method: 'GET',
        headers: getHeaders(),
        redirect: 'follow'
      };
      
  return    fetch( base_link+"/getApplications.php", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            return result
        })
        .catch(error => console.log('error', error));
}
const editApplicant = (id,status)=>{
    var formdata = new FormData();
  formdata.append("id", id);
  formdata.append("status", status);
  
  
  var requestOptions = {
  method: 'POST',
  body: formdata,
  };
  
  
  var promise = Promise.race([
  fetch( base_link+'/editApplicant.php', requestOptions)
    .then(response => response.json()),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 30000)
  )
  ]);
    return promise
  }
export {getApplications,editApplicant}