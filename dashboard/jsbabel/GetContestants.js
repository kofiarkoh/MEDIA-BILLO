"use strict";

class ContestantList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null,
    };
  }
  async fetchData() {
    var data = await getContestants();
    console.log("the", data);
    this.setState({
      list: data,
    });
  }
  componentDidMount() {
    var data = this.fetchData();
  }
  render() {
    if (this.state.list == null) {
      return <h1>no data</h1>;
    } else {
      return this.state.list.map((item, index) => {
        //alert(index)
        return (
          <div class="card">
            {/* <!-- Card header --> */}
            <div class="card-header border-0">
              <h3 class="mb-0">{item.eventname}</h3>
            </div>
            {/* <!-- Light table --> */}
            <div class="table-responsive">

            <table class="table align-items-center table-flush">
              <thead class="thead-light">
                <tr>
                  <th scope="col" class="sort" data-sort="name">
                    No
                  </th>
                  <th scope="col" class="sort" data-sort="budget">
                    Name
                  </th>
                  <th scope="col" class="sort" data-sort="status">
                    Accumulated Votes
                  </th>
                  <th scope="col">Action</th>
                  {/* <th scope="col"></th> */}
                </tr>
              </thead>
              <tbody class="list">
                {item.contestants.length == 0 ? (
                  <h5></h5>
                ) : (
                  <TableRows
                    items={item.contestants}
                    eventName={item.eventname}
                  />
                )}
              </tbody>
            </table>
            </div>
          </div>
        );
      });
    }
  }
}
async function getContestants() {
  var result = "";
  var Url = "/backend/adminresources/fetchAllContestants.php";
  var formdata = new FormData();
  formdata.append("event_name", "MOST BEAUTIFUL");
  var result = "";
  try {
    var ur = "http://192.168.8.100:3000";

    var response = await axios({
      method: "get",
      url: "/adminresources/fetchAllContestants.php",

      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      throw "Network Request Failed"; // alert('Network Connection Failed')
    }
    // console.error(response.data);
    result = response.data;
    // alert('done')
  } catch (error) {
    //alert("error" + error);
    console.log(error.response);
    await swal({
      text: " " + error + "...Please reload this page",

      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    //alert("ds"+error)
  }
  return result;
}
async function confirmDeleteion(id, eventname) {
  sessionStorage.setItem("eventname", eventname);
  sessionStorage.setItem("id", id);

  await swal({
    text: "Proceed to delete  ?",

    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteContestant();
    }
  });
}
async function deleteContestant() {
  var eventname = sessionStorage.getItem("eventname");
  var id = sessionStorage.getItem("id");
  var formdata = new FormData();
  formdata.append("event_name", eventname);
  formdata.append("id", id);
  try {
    var ur = "http://192.168.8.100:3000";

    var response = await axios({
      method: "post",
      url: "/adminresources/deleteContestant.php",
      data: formdata,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    await swal({
      text: " Deletion Succesfuldsd",

      icon: "success",
    });

    $("#" + id).hide();
    console.log("response", response);
  } catch (error) {
    console.log(error.response);
    await swal({
      text: " Deletion Unsuccesful",

      icon: "warning",
    });
    // console.log("error", error.response);
  }
}

class TableRows extends React.Component {
  render() {
    return this.props.items.map((item, index) => {
      return (
        <tr key={item.id} id={item.id}>
          <td>{index + 1}</td>
          <td>{item.contestant_name}</td>
          <td>{item.votes}</td>
          <td className="text-primary">
            <span>
              <button
                type="button"
                className="btn btn-danger mr-2"
                onClick={() => confirmDeleteion(item.id, this.props.eventName)}
              >
                <i class="fas fa-user-times"></i>
              </button>
            </span>

            <span>
              <button
                type="button"
                className="btn btn-info "
                onClick={() =>
                  showModal(item.contestant_name, this.props.eventName, item.id)
                }
              >
               <i class="fas fa-user-edit"></i>
              </button>
            </span>
          </td>
        </tr>
      );
    });
  }
}
//export default Btn
function showModal(name, eventname, id) {
  sessionStorage.setItem("eventname", eventname);
  sessionStorage.setItem("id", id);
  $("#titleName").text(name);

  $("#editModal").modal({
    keyboard: true,
    backdrop: "static",
    show: true,
  });
}
async function submitNewData() {
  var eventname = sessionStorage.getItem("eventname");
  var id = sessionStorage.getItem("id");
  var new_name = $("#newName").val();
  var photo = $("#newPhoto")[0].files[0];
  var prev_name = $("#titleName").text();
  var reg = /\s\s+/g;
  var res = reg.test(new_name);
  console.log(photo);
  if (res) {
    swal({
      title: "Warning!",
      text: "Name field cannot be white spaces only",
      icon: "warning",
    });
    return;
  }
  if ((new_name == "" || new_name == null) && photo == undefined) {
    swal({
      title: "Warning!",
      text: "You have not made any changes",
      icon: "warning",
    });
    return;
  }
  $("#spinner").fadeIn();
  $("#submitBtn").prop("disabled", true);
  var data = new FormData();
  data.append("event_name", eventname);
  data.append("file", photo);
  data.append("id", id);
  data.append("new_name", new_name);
  var requestOptions = {
    method: "POST",
    body: data,
    redirect: "follow",
    headers: {
      //`"Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  var responseCode = 0;
  fetch("/adminresources/editContestant.php", requestOptions)
    .then((response) => {
      responseCode = response.status;

      return response.text();
    })
    .then((result) => {
      //console.log(result)
      if (responseCode == 200) {
        swal({
          title: "Success",
          text: "Changes recorded successfully",
          icon: "success",
        });
        location.reload();
      } else {
        swal({
          title: "Error!",
          text: "An error has occured, please try again",
          icon: "warning",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      swal({
        title: "Error!",
        text: "An unknown error has occured, please try again",
        icon: "warning",
      });
    });
  $("#spinner").fadeOut();
  $("#submitBtn").prop("disabled", false);
}

//export default Btn
const tableitem = React.createElement;

const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(ContestantList), eventslistContainer);
