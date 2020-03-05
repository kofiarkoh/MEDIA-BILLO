const axios = require('react-native-axios')
const getContestants =async( eventName) => {
  console.log('called event list');
  var url1 = 'https://www.startransittravels.org/MEDIA BILLO/backend/getEventContestants.php';

  var url = 'http://192.168.43.165:3000/getEventContestants.php';
  var formdata = new FormData();
  formdata.append('event_name', eventName );
  var result = '';
  try {
    var response =await axios({
      method: 'POST',
      url:url1,
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
  }
  return result;
 
};
export default getContestants;
