import { VOTE_BASE_URL } from "./values";

const sumbitVotes = async data => {
  var url_main = VOTE_BASE_URL+'/VoteRecording/logVotesData.php';
  var {
    phoneNumber,
    voucherCode,
    noOfVotes,
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
    //console.log('hey ',response.json())
    result ='ok'// response.json()
    return response.text()
  }).then((ed)=>{
    //console.log('hey ',ed)
  }).catch(function(error) {
    // might be a timeout error
    result = null
   //console.log('err',error)
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
