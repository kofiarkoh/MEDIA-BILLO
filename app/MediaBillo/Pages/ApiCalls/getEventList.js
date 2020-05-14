const getEventList = async () => {
  var url_main = 'https://www.admin.mediabillo.net/appbackend/getEventList.php';
   var res = null;
  try {
    var response = await fetch(url_main);
    res = response.json();
  } catch (error) {
    res = null;
  }
  return res;
};
export default getEventList;
