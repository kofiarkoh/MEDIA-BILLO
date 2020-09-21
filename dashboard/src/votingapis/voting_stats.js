const { VOTE_BASE_URL, AUTH_TOKEN } = require("./api_const");

export const voteEventStats = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", AUTH_TOKEN );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  var promise = Promise.race([
    fetch(VOTE_BASE_URL + "/eventStats.php", requestOptions).then((response) => {
      return response.json();
    }),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 30000)
    ),
  ]);
  return promise;
};
