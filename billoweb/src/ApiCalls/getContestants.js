var result = ""
const getContestants = async eventName => {
  var formdata = new FormData()

  formdata.append("event_name", eventName)
  var url_main =
    "https://www.admin.mediabillo.net/appbackend/getEventContestants.php"

  console.log("fetching them "+eventName)
  await timeout(
    15000,
    fetch(url_main, {
      method: "POST",
     // headers: { "Content-Type": "multipart/form-data" },
      body: formdata,
    })
  )
    .then( (response) =>{
      // process response

     return response.json()
        //console.log(result)
    })
    .then( (text)=>{
    
    result = text
    })
    .catch(function (error) {
     
      console.log(error.body)
    })
   
   

  return result //
}
function timeout(ms, promise) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}
export default getContestants
