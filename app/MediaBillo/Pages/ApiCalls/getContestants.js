const axios = require('react-native-axios');
var result = '';
const getContestants = async eventName => {
  var formdata = new FormData();

  formdata.append('event_name', eventName);
  var url_main = 'https://www.admin.mediabillo.net/appbackend/getEventContestants.php';
 

  console.log('fetching them');
await  timeout(15000, fetch(url_main, {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    body: formdata,
  })).then(function(response) {
    // process response
   
    result = response.json()
  }).catch(function(error) {
    // might be a timeout error
    alert(error)
  })
 /*  try {
    var response = await fetch(url_main, {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: formdata,
    });
    result = response.json();
   
  } catch (error) {
    alert(error);
  }
   */
 
  return result;//
};
function timeout(ms, promise) {
 
 
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}
export default getContestants;
