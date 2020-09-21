import { AUTH_TOKEN, VOTE_BASE_URL, statusHandler } from "./api_const";

export const suspendVoting = (event_name, status) => {
  var myHeaders = new Headers();
  //myHeaders.append('Content-type', "multipart/formdata",)

  myHeaders.append("Authorization", AUTH_TOKEN);
  var formdata = new FormData();
  formdata.append("event_name", event_name);
  formdata.append("event_status", status);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  var promise = Promise.race([
    fetch(VOTE_BASE_URL + "/suspendvoting.php", requestOptions).then((response) => {
      return response.json();
    }),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 30000)
    ),
  ]);
  return promise; 
};
export const setVotingStatus = (event_name, status) => {
  var myHeaders = new Headers();
  //myHeaders.append('Content-type', "multipart/formdata",)

  myHeaders.append("Authorization", AUTH_TOKEN);
  var formdata = new FormData();
  formdata.append("event_name", event_name);
  formdata.append("event_status", status);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  var promise = Promise.race([
    fetch(VOTE_BASE_URL + "/eventStatus.php", requestOptions).then((response) => {
      return response.json();
    }),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 30000)
    ),
  ]);
  return promise; 
};
