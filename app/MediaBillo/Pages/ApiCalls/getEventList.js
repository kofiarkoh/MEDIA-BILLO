const getEventList =async () => {
  console.log('called event list');
  
  var url1= 'http://192.168.8.100:5000/getEventList.php'

  var url_main = 'https://www.admin.mediabillo.net/appbackend/getEventList.php';
 
  var res = null
  
  try {
    var response = await fetch(url_main  )
   
    res = response.json()
    //alert(res)
    
  }
  catch(error) {
   // alert(error)
    res = null
    //return error

  }
  //alert(res.data)
  return res
  
   

};
export default getEventList;
