"use strict";

class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null
    };
  }
  async showme() {
   
    var data = await fetchList();

    this.setState({
      list: data
    });
  }
  componentDidMount() {
    var data = this.showme();
  }
  render() {
    if (this.state.list == null) {
      return <h1>no data</h1>;
    } else {
      return this.state.list.map((item, index) => {
        return (
          <tr key={item.id} id={item.id}>
            <td>{index + 1}</td>
            <td>{item.event_name}</td>

            {item.status === "inactive" ? (
              <React.Fragment>
                <td id={`status${item.id}`}>
                  <span class="badge badge-dot mr-4">
                    <i class="bg-warning"></i>
                    <span class="status">Inactve</span>
                  </span>
                </td>
                <td>
                  <span id={`active${item.id}`}>
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={() =>
                        eventStatus(item.event_name, item.id, "active")
                      }
                    >
                      Activate
                    </button>
                  </span>
                </td>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <td id={`status${item.id}`}>
                  <span class="badge badge-dot mr-4">
                    <i class="bg-success"></i>
                    <span class="status">Active</span>
                  </span>
                </td>
                <td>
                  <span id={`inactive${item.id}`}>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-warning "
                      onClick={() =>
                        eventStatus(item.event_name, item.id, "inactive")
                      }
                    >
                      Deactivate
                    </button>
                  </span>
                </td>
              </React.Fragment>
            )}
            <td>
              <button
                type="button"
                className="btn btn-danger "
                onClick={() => confirmDeleteion(item.event_name,item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
  }
}
async function fetchList() {
  
  var result = "";
  try {
    var response = await axios.get("/backend/adminresources/getEventList.php",
   { headers: {
      //`"Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    }
  }
    );
    result = response.data;
  } catch (error) {
   // alert(error);
    result = null;
  }
  return result;
}

async function confirmDeleteion(eventname,id) {
  sessionStorage.setItem("eventname",eventname)
  sessionStorage.setItem("id",id)

 await swal({
    text: "Proceed to delete "+eventname+" ?",
    
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
     deleteEvent()
    } 
  });
}
async function deleteEvent() {
 
   var formdata = new FormData();
   var eventname=sessionStorage.getItem("eventname")
   var id=sessionStorage.getItem("id")

  formdata.append("event_name", eventname);
  try {
    var response = await axios({
      method: "post",
      url: "/backend/adminresources/deleteEvent.php",
      data: formdata,
      headers: {
        //`"Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
     
    });
    //console.warn("response", response);
    await swal({
      text: " Deletion Succesful",
      
      icon: "success",
      
    })
    $("#"+id).hide()
  } catch (error) {
    await swal({
      text: " "+error,
      
      icon: "warning",
     
    })
   // console.warn("error", error);
  } 
}

async function eventStatus(eventname, id, eventstatus) {
  //alert('called'+eventstatus)
  
  var formdata = new FormData();
  formdata.append("event_name", eventname);
  formdata.append("event_status", eventstatus);
  try {
    
    var response = await axios({
      method: "post",
      url: "/backend/adminresources/eventStatus.php",
      data: formdata,
      headers: {
        //`"Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
      /* headers: {
          "Content-Type": "multipart/form-data",
        
        } */
    });
    console.warn("response", response);
    if (eventstatus === "active") {
      await $("#inactive" + id).html(
        '<button type="button" class="btn btn-warning" id=\'inactive' +
          id +
          "' onclick='eventStatus(" +
          '"' +
          eventname +
          '",' +
          id +
          ',"inactive"' +
          ")'>Deactivate</button>"
      );
      $("#status" + id).html(
        ' <span class="badge badge-dot mr-4">\
       <i class="bg-success"></i>\
       <span class="status">Active</span>  </span>'
      );
    } else {
      await $("#inactive" + id).html(
        '<button type="button" class="btn btn-primary" id=\'active' +
          id +
          "' onclick='eventStatus(" +
          '"' +
          eventname +
          '",' +
          id +
          ',"active"' +
          ")'>Activate</button>"
      );
      $("#status" + id).html(
        '<span class="badge badge-dot mr-4">\
       <i class="bg-warning"></i>\
       <span class="status">Iactive</span>  </span>'
      );
    }
    //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")
  } catch (error) {
    //console.log(error.response)
   // alert("set event status" + error);
   swal({
    title: "Error!",
    text: error.response.data.message,
    icon: "warning",
   
  });
  }
}
//export default Btn
const tableitem = React.createElement;

const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(EventList), eventslistContainer);
