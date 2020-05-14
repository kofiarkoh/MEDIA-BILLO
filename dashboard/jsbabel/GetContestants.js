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
    console.log('the',data)
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
            <div class="table-responsive"></div>

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
                  <th scope="col"></th>
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
      url: ur + "/adminresources/fetchAllContestants.php",

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
      url: ur + "/adminresources/deleteContestant.php",
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
          <td
            className="text-primary"
            onClick={() => confirmDeleteion(item.id, this.props.eventName)}
          >
            Delete
          </td>
        </tr>
      );
    });
  }
}

//export default Btn
const tableitem = React.createElement;

const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(ContestantList), eventslistContainer);
