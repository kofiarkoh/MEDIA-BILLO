const getVoteValues = async eventName => {
  var url_main =
    'https://www.admin.mediabillo.net/appbackend/getVotes/fetchVotes.php';
  var formdata = new FormData();
  formdata.append('event_name', eventName);
  var result = '';

 await timeout(10000, fetch(url_main, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  })).then(function(response) {
    // process response
   
    result = response.json()
  }).catch(function(error) {
    alert(error)
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

export default getVoteValues;
