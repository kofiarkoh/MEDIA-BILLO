"use strict";

class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null,
    };
  }
  async getData() {
    var data = await fetchList();

    this.setState({
      list: data,
    });
  }
  componentDidMount() {
    var data = this.getData();
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
                  <span className="badge badge-dot mr-4">
                    <i className="bg-warning"></i>
                    <span className="status">Inactve</span>
                  </span>
                </td>
                <td>
                  <span id={`active${item.id}`}>
                    <button
                      type="button"
                      className="btn btn-primary mr-2"
                      onClick={() =>
                        eventStatus(item.event_name, item.id, "active")
                      }
                    >
                      Activate
                    </button>
                  </span>
                  <span>
                    <button
                      type="button"
                      className="btn btn-danger mr-2"
                      onClick={() => confirmDeleteion(item.event_name, item.id)}
                    >
                     <i class="fas fa-trash"></i>
                    </button>
                  </span>
                  <span>
                    <button
                      type="button"
                      className="btn btn-info mr-2"
                      onClick={() => showModal(item.event_name)}
                    >
                     <i class="fas fa-edit"></i>
                    </button>
                  </span>
                </td>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <td id={`status${item.id}`}>
                  <span className="badge badge-dot mr-4">
                    <i className="bg-success"></i>
                    <span className="status">Active</span>
                  </span>
                </td>
                <td>
                  <span id={`inactive${item.id}`}>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-warning mr-2"
                      onClick={() =>
                        eventStatus(item.event_name, item.id, "inactive")
                      }
                    >
                      Deactivate
                    </button>
                  </span>
                  <span>
                    <button
                      type="button"
                      className="btn btn-danger mr-2"
                      onClick={() => confirmDeleteion(item.event_name, item.id)}
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </span>
                  <span>
                    <button
                      type="button"
                      className="btn btn-info mr-2"
                      onClick={() => showModal(item.event_name)}
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                  </span>
                </td>
              </React.Fragment>
            )}
            <td>
              <button
                type="button"
                className='btn bg-info'
                onClick={() =>{
                  sessionStorage.setItem('eventname',item.event_name)
                  if(item.is_ended == 'true') {
                    sessionStorage.setItem('is_suspend','false')
                  } else{
                    sessionStorage.setItem('is_suspend','true')
                  }
                  deleteEvent('Suspend')
                } }
              >
                {item.is_ended == 'true' ? <span style={{color:'white'}}>Activate Votiong</span> : <span style={{color:'white'}}> Suspend Voting</span>}
              </button>
            </td> 
          </tr>
        );
      });
    }
  }
}
var ur = "http://192.168.8.100:3000";

async function fetchList() {
  var result = "";
  try {
    var response = await axios.get("adminresources/getEventList.php", {
      headers: {
        //`"Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    result = response.data;
  } catch (error) {
    // alert(error);
    result = null;
  }
  return result;
}

async function confirmDeleteion(eventname, id) {
  sessionStorage.setItem("eventname", eventname);
  sessionStorage.setItem("id", id);

  await swal({
    text: "Proceed to delete " + eventname + " ?",

    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteEvent();
    }
  });
}

async function deleteEvent(action='Delete') {
  var formdata = new FormData();
  var eventname = sessionStorage.getItem("eventname");
  var id = sessionStorage.getItem("id");
  var link ="adminresources/deleteEvent.php"
  if(action == 'Suspend') {
    link = "adminresources/suspendvoting.php"
    formdata.append('event_status',sessionStorage.getItem('is_suspend'))
  }
  formdata.append("event_name", eventname);
  try {
    var response = await axios({
      method: "post",
      url: link,
      data: formdata,
      headers: {
        //`"Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    //console.warn("response", response);
    await swal({
      text: action+" Succesful",

      icon: "success",
    });
    $("#" + id).hide();
  } catch (error) {
    await swal({
      text: " " + error,

      icon: "warning",
    });
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
      url: "/adminresources/eventStatus.php",
      data: formdata,
      headers: {
        //`"Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      /* headers: {
          "Content-Type": "multipart/form-data",
        
        } */
    });
    console.log("response", response);
    if (eventstatus === "active") {
      await $("#inactive" + id).html(
        '<button type="button" className="btn btn-warning mr-2" id=\'inactive' +
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
        ' <span className="badge badge-dot mr-4">\
       <i className="bg-success"></i>\
       <span className="status">Active</span>  </span>'
      );
    } else {
      await $("#inactive" + id).html(
        '<button type="button" className="btn btn-primary mr-2" id=\'active' +
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
        '<span className="badge badge-dot mr-4">\
       <i className="bg-warning"></i>\
       <span className="status">Iactive</span>  </span>'
      );
    }
    //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")
  } catch (error) {
    console.log(error.response);
    // alert("set event status" + error);
    swal({
      title: "Error!",
      text: error.response.data.message,
      icon: "warning",
    });
  }
}
//export default Btn
function showModal(name) {
  
  $("#titleName").text(name);
  
  $("#editModal").modal({
    keyboard:true,
    backdrop: 'static',
    show:true
  });
}
async function submitNewData() {
 
  var new_name = $("#newName").val();
  var photo = $("#newPhoto")[0].files[0];
  var prev_name = $("#titleName").text();
  var reg = /\s\s+/g
  var res = reg.test(new_name)
 
   if(res){
    swal({
      title: "Warning!",
      text: 'Name field cannot be white spaces only',
      icon: "warning",
    });
    return
  }
  if ((new_name == '' || new_name == null) && photo == undefined){
    swal({
      title: "Warning!",
      text: 'You have not made any changes',
      icon: "warning",
    });
    return
  } 
  $("#spinner").fadeIn()
  $('#submitBtn').prop('disabled',true)
  var data = new FormData();
  data.append("file", photo);
  data.append("prev_name", prev_name);
  data.append('new_name',new_name)
  var requestOptions = {
    method: 'POST',
    body: data,
    redirect: 'follow',
    headers: {
      //`"Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    }
  };
  var responseCode = 0
  await fetch("/adminresources/editEvent.php", requestOptions)
    .then(response =>{
      responseCode = response.status
       
      return response.text()
    } )
    .then(result => {
      if(responseCode ==200){
        location.reload()
        swal({
          title: "Success",
          text: "Changes recorded successfully",
          icon: "success",
        });
       
      }else{
        swal({
          title: "Error!",
          text: "An error has occured, please try again",
          icon: "warning",
        });
      }
    })
    .catch(error => {
      console.log(error)
      swal({
        title: "Error!",
        text: "An unknown error has occured, please try again",
        icon: "warning",
      });
    }); 
    $("#spinner").fadeOut()
    $('#submitBtn').prop('disabled',false)
}
const tableitem = React.createElement;

const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(EventList), eventslistContainer);
