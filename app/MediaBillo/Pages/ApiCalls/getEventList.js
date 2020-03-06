const getEventList =async () => {
  console.log('called event list');
  
  var url1= 'http://192.168.8.101:3000/backend/getEventList.php'

  var url = 'https://www.startransittravels.org/MEDIA BILLO/backend/getEventList.php';
 
  var res = null
  
  try {
    var response = await fetch(url  )
   
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
