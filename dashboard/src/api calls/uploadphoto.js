const { BASE_URL, getHeaders } = require("./baseurl");

export const uploadPhoto = (file,eventid)=>{
var formdata = new FormData()
formdata.append("photo", file);
formdata.append("eventid", eventid);

var requestOptions = {
  method: 'POST',
  body: formdata,
  headers:getHeaders(),
  redirect: 'follow'
};

return fetch(BASE_URL+"/api/addLogo.php", requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)
    return result
})
.catch((error) => {
    console.log("error", error);
    return { resp_code: 500, message: error };
  });}