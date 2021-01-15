import { VOTE_BASE_URL } from "./app_const";

const sumbitVotes = async data => {
  

  var url_main = VOTE_BASE_URL + '/VoteRecording/logVotesData.php' 
  var {
    phoneNumber,
    voucherCode,
    noOfVotes,
    ntwkType,
    event_name,
    contestantId,
    ntwkType,
  } = data;
  var voteData = {
    eventName: event_name,

    votes: noOfVotes,
    voucherCode: voucherCode,
    phoneNumber: phoneNumber,
    contestantId: contestantId,
    network: ntwkType,
  };
  var result = '';
 await timeout(15000,fetch(url_main, {
    method: 'POST',
    body: JSON.stringify(voteData),
  })).then(function(response) {
    // process response
   
    result ='ok'// response.json()
  }).catch(function(error) {
    // might be a timeout error
    alert("An error has occured")
  })
 
  return result;
};
function timeout(ms, promise) {
 
 
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}
export default sumbitVotes;
