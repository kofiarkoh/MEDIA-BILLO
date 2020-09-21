import { VOTE_BASE_URL } from "votingapis/api_const";
import { AUTH_TOKEN } from "votingapis/api_const";

export const UserLogin = (name, password) => {
  
    var formdata = new FormData();
    formdata.append("username", name);
    formdata.append("password", password);
  
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
  
    var promise = Promise.race([
      fetch( VOTE_BASE_URL + "/auth/login.php", requestOptions).then((response) => {
        return response.json();
      }),
      new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      ),
    ]);
    return promise;
  };
  export const UserSignUp = (name, username,password,accountType) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", AUTH_TOKEN);
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append('name',name)
    formdata.append('accountType',accountType)
    formdata.append("password", password);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
    var promise = Promise.race([
      fetch( VOTE_BASE_URL + "/auth/signup.php", requestOptions).then((response) => {
        return response.json();
      }),
      new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      ),
    ]);
    return promise;
  };