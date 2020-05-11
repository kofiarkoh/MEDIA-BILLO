const axios = require('react-native-axios')
const getContestants =async( eventName) => {
  console.log('called event list');
  var url_main = 'https://www.admin.mediabillo.net/appbackend/getEventContestants.php';

  var url = 'http://192.168.8.100:5000/getEventContestants.php';
  var formdata = new FormData();
  formdata.append('event_name', eventName );
  var result = '';
  try {
    var response =await axios({
      method: 'POST',
      url:url_main,
      data: formdata,
      headers: {'Content-Type': 'multipart/form-data' }
      })
    // console.log(response.text())
    if (response.status !== 200) {
      throw 'Network Request Failed'; // alert('Network Connection Failed')
    }
    result = response.data;
   // alert('done')
  } catch (error) {
    alert("error"+error);
    //alert("ds"+error)
    console.log(error)
  }
  return result;
 
};
export default getContestants;
