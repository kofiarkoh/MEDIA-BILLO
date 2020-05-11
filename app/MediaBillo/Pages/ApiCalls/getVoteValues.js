const getVoteValues = async eventName => {
  var url1 = 'http://192.168.8.100:5000/getVotes/fetchVotes.php';
  var url_main = 'https://www.admin.mediabillo.net/appbackend/getVotes/fetchVotes.php';
  var formdata = new FormData();
  formdata.append('event_name', eventName);
  var result = '';
  try {
    var response = await fetch(url_main, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });
    // console.log(response.text())
    if (response.status !== 200) {
      throw 'Network Request Failed'; // alert('Network Connection Failed')
    }
    result = response.json();
  } catch (error) {
    alert(error);
    //alert("ds"+error)
  }
  return result;
};
export default getVoteValues;
