const axios = require('react-native-axios');
var result = '';
const getContestants = async eventName => {
  var formdata = new FormData();

  formdata.append('event_name', eventName);
  var url_main = 'https://www.admin.mediabillo.net/appbackend/getEventContestants.php';
 

  console.log('fetching them');
  try {
    var response = await fetch(url_main, {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: formdata,
    });
    result = response.json();
   
  } catch (error) {
    alert(error);
  }
  
 
  return result;//
};

export default getContestants;
