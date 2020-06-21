
const otpVerification = async otp => {
    var url_main = 'http://www.admin.mediabillo.net/appbackend/VoteRecording/otp_verification.php';
    const formData = new FormData();
    formData.append('otp', otp)
    var data = {"otp":otp}
    var result = '';
   await timeout(15000,fetch(url_main, {
      method: 'POST',
      body: JSON.stringify(data),
    })).then(function(response) {
     
      result ='ok'// response.json()
      return response.json()
    }).then((res)=>{
      //console.log('hey ',res)
      result = res
    }).catch(function(error) {
      // might be a timeout error
      result = null
     console.log('err',error)
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
  export default otpVerification;
  