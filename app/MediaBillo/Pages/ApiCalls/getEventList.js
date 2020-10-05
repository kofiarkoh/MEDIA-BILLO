import { VOTE_BASE_URL } from "./app_const";

const getEventList = async () => {
  var url_main = VOTE_BASE_URL+ '/getEventList.php'//'https://www.admin.mediabillo.net/appbackend/getEventList.php';
   var res = null;
await   timeout(15000,fetch(url_main)).then(function(response) {
    // process response
    res = response.json()
  }).catch(function(error) {
    res = null
  })
 
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
