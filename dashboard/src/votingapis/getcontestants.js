import { AUTH_TOKEN, VOTE_BASE_URL, statusHandler } from "./api_const";

export const getContestants = ()=> {
    var formdata = new FormData();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", AUTH_TOKEN);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow'
    };
    
    var promise = Promise.race([
      fetch( VOTE_BASE_URL+'/fetchAllContestants.php', requestOptions)
        .then(response => response.json()),
      new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 30000)
      )
    ]);
    
   return promise
  }


  export const addContestant = (name, eventid,photo) => {
    var myHeaders = new Headers();
    //myHeaders.append('Content-type', "multipart/formdata",)
  
    myHeaders.append("Authorization", AUTH_TOKEN);
    var formdata = new FormData();
    formdata.append('name',name)
    formdata.append("event_name", eventid);
    formdata.append("file", photo);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
    var promise = Promise.race([
      fetch(VOTE_BASE_URL + "/addContestant.php", requestOptions).then((response) => {
        return response.json();
      }),
      new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      ),
    ]);
    return promise;
  };
  