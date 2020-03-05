"use strict";

class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null
    };
  }
  async showme() {
    console.error("function start");
    var data = await fetchList();

    this.setState({
        list:data
    })
    console.error("helddssdssdsd");
  }
  componentDidMount() {
    var data = this.showme();
  }
  render() {
    if (this.state.list == null) {
      return <h1>no data</h1>;
    } else {
      return this.state.list.map((item,index) => {
        return (
          <tr>
           
            <td>{index+1}</td>
            <td>{item.event_name}</td>
            <td id={`status${item.id}`}>{item.status}</td>
            <td>
              {item.status==='inactive'?<span id={`active${item.id}`}><button type="button" class="btn btn-primary "  onClick={()=>eventStatus(item.event_name,item.id,'active')}>Activate</button></span>
              :               <span id={`inactive${item.id}`}> <button type="button" class="btn btn-warning "  onClick={()=>eventStatus(item.event_name,item.id,'inactive')}>Deactivate</button></span>

            }
              <button type="button" class="btn btn-danger " onClick={()=>deleteEvent(item.event_name)}>Delete</button>
              
              
</td>
            <td class="text-primary">$36,738</td>
          </tr>
        );
      });
    }
  }
}
async function fetchList() {
  var result = ''
  try {
  var response=  await axios
    .get("http://localhost:3000/getEventList.php")
    result = response.data
  }
  catch(error) {
    alert(error)
    result = null
  }
  return  result
  
}
async function deleteEvent(eventname){
  console.log(eventname)
  var formdata = new FormData()
  formdata.append('event_name',eventname)
  try{
   var response = await axios(
      {
        method: "post",
        url: "http://localhost:3000/deleteEvent.php",
        data: formdata,
        /* headers: {
          "Content-Type": "multipart/form-data",
        
        } */
      })
      console.warn('response',response)

  }
  catch (error){
    console.warn("error",error)

  }
}

async function eventStatus(eventname,id,eventstatus) {
  //alert('called'+eventstatus)
  var formdata = new FormData()
  formdata.append('event_name',eventname)
  formdata.append('event_status',eventstatus)
  try{
   var response = await axios(
      {
        method: "post",
        url: "http://localhost:3000/eventStatus.php",
        data: formdata,
        /* headers: {
          "Content-Type": "multipart/form-data",
        
        } */
      })
      console.warn('response',response)
    if( eventstatus==='active'){
       await $("#inactive"+id).html("<button type=\"button\" class=\"btn btn-warning\" id='inactive"+id+"' onclick='eventStatus("+"\""+eventname+"\","+ id+",\"inactive\""+")'>Deactivate</button>")
       $("#status"+id).html("Inactve")
      }
    else{ 
      await $("#inactive"+id).html("<button type=\"button\" class=\"btn btn-primary\" id='active"+id+"' onclick='eventStatus("+"\""+eventname+"\","+ id+",\"active\""+")'>Activate</button>")
       $("#status"+id).html("Actve")
      }
  //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")
  }
  catch (error){
    alert("set event status"+error)

  }
}
//export default Btn
const e = React.createElement;

const domContainer = document.getElementById("table-body");
ReactDOM.render(e(EventList), domContainer);
