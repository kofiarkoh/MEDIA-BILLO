const getVoteValues = async eventName => {
  var url_main =
    'https://www.admin.mediabillo.net/appbackend/getVotes/fetchVotes.php';
  var formdata = new FormData();
  formdata.append('event_name', eventName);
  var result = '';
  /* try {
    var response = await fetch(url_main, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });

    if (response.status !== 200) {
      throw 'Network Request Failed'; // alert('Network Connection Failed')
    }
    result = response.json();
  } catch (error) {
    alert(error);
  } */
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
    // might be a timeout error
    alert(error)
  })
  
  return result;
};
// Rough implementation. Untested.
function timeout(ms, promise) {

 
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export default getVoteValues;
