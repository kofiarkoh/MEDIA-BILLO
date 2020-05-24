const getEventList = async () => {
  var url_main1 = 'http://localhost:3000/getEventList.php';
  var url_main = 'https://www.admin.mediabillo.net/appbackend/getEventList.php';

   var res = null;
await   timeout(15000,fetch(url_main)).then(function(response) {
    // process response
   
    res = response.json()
  }).catch(function(error) {
    // might be a timeout error
    //alert(error)
    res = []
  })
 /*  try {
    var response = await fetch(url_main);
    res = response.json();
  } catch (error) {
    res = null;
  } */
  return res;
};
async function timeout(ms, promise) {
  
  return new Promise(async function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("Connection timeout"))
    }, ms)
   promise.then(resolve, reject)
  })
}
export default getEventList;
