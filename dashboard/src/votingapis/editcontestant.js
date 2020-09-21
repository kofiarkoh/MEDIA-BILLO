import { VOTE_BASE_URL } from "./api_const";

export const updateContestant = (name,eventname,file,id)=>{
    var myHeaders = new Headers();
    //myHeaders.append('Content-type', "multipart/formdata",)

myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUSEVfSVNTVUVSIiwiYXVkIjoiVEhFX0FVRElFTkNFIiwiaWF0IjoxNjAwMzA5NzkwLCJuYmYiOjE2MDAzMDk3OTUsImV4cCI6MTYwMDMxMzM5MCwiZGF0YSI6eyJpZCI6IjMiLCJ1c2VybmFtZSI6ImxhdyIsIm5hbWUiOiJsYXcifX0.RFSMs19fA4QgapwFRJr3mWlwba7SwlOwPLrNjIgaiTc");
var formdata = new FormData();
formdata.append("new_name", name);
formdata.append("event_name", eventname);
formdata.append("file",  file);
formdata.append("id", id);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};


var promise = Promise.race([
  fetch(VOTE_BASE_URL+'/editContestant.php', requestOptions)
    .then(response => response.json()),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 30000)
  )
]);
    return promise
}