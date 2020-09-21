import { AUTH_TOKEN, VOTE_BASE_URL, statusHandler } from "./api_const";

export const addVoteEvent = (name, photo) => {
  var myHeaders = new Headers();
  //myHeaders.append('Content-type', "multipart/formdata",)

  myHeaders.append("Authorization", AUTH_TOKEN);
  var formdata = new FormData();
  formdata.append("event_name", name);
  formdata.append("file", photo);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  var promise = Promise.race([
    fetch(VOTE_BASE_URL + "/addEvent.php", requestOptions).then((response) => {
      return response.json();
    }),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 30000)
    ),
  ]);
  return promise;
};

export const getVoteEvents = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", AUTH_TOKEN);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  var promise = Promise.race([
    fetch(VOTE_BASE_URL + "/getEventList.php", requestOptions).then(
      (response) => {
        return response.json();
      }
    ),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 30000)
    ),
  ]);
  return promise;
};

export const editEvent = (new_name,prev_name,file)=>{
  var myHeaders = new Headers();
  //myHeaders.append('Content-type', "multipart/formdata",)

myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUSEVfSVNTVUVSIiwiYXVkIjoiVEhFX0FVRElFTkNFIiwiaWF0IjoxNjAwMzA5NzkwLCJuYmYiOjE2MDAzMDk3OTUsImV4cCI6MTYwMDMxMzM5MCwiZGF0YSI6eyJpZCI6IjMiLCJ1c2VybmFtZSI6ImxhdyIsIm5hbWUiOiJsYXcifX0.RFSMs19fA4QgapwFRJr3mWlwba7SwlOwPLrNjIgaiTc");
var formdata = new FormData();
formdata.append("new_name", new_name);
formdata.append("prev_name", prev_name);
formdata.append("file",  file);


var requestOptions = {
method: 'POST',
headers: myHeaders,
body: formdata,
redirect: 'follow'
};


var promise = Promise.race([
fetch(VOTE_BASE_URL+'/editEvent.php', requestOptions)
  .then(response => response.json()),
new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Timeout')), 30000)
)
]);
  return promise
}

export const getVoteTransactions = (name) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", AUTH_TOKEN);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
console.log(name)
  var promise = Promise.race([
    fetch(VOTE_BASE_URL + "/getVoteHistory.php?eventName="+name, requestOptions).then(
      (response) => {
        return response.json();
      }
    ),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 30000)
    ),
  ]);
  return promise;
};