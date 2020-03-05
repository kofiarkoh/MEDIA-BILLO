
const sumbitVotes = async data => {
  var url1 = 'http://52e9b5bd.ngrok.io/VoteRecording/getVotes.php';

  var url = 'https://www.startransittravels.org/MEDIA BILLO/backend/VoteRecording/getVotes.php';
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
  try {
    var response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(voteData),
    });
    console.log(response.text());
    result = 'ok'; //response.json()
  } catch (error) {
    alert("error"+error)
  }
  return result;
};
export default sumbitVotes;
