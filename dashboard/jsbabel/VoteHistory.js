class VoteHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventHistory: null,
    };
  }

  eventChangeHandler() {
    var group = document.getElementById("eventGroup");
    const contestantGroup = document.getElementById("contestantsGroup");

    contestantGroup.addEventListener("change", function (event) {
      var selectedContestant = event.target.value;
      // var table = $("#historyTable").DataTable();
      if ($.fn.dataTable.isDataTable("#historyTable")) {
        var htable = $("#historyTable").DataTable();
      } else {
        var htable = $("#historyTable").DataTable({
          columns: [
            { searchable: false },
            { searchable: false },
            { searchable: true },
            { searchable: false },
            { searchable: false },
          ],
        });
      }
      htable.search(`${selectedContestant}`).draw();
    });

    group.addEventListener("change", function (event) {
      var selectedevent = event.target.value;
      addContestantChildNodes(selectedevent);
    });
  }
  async fetchEventList() {
    await getContestants();
  }
  async fetchHistory() {
    var response = await getHistory();

    this.setState({
      eventHistory: response,
    });
  }
  componentDidMount() {
    this.fetchEventList();
    this.eventChangeHandler();
    this.fetchHistory();
  }

  render() {
    if (this.state.eventHistory !== null) {
      return this.state.eventHistory.map((item) => {
        return (
          <tr>
            <td id="cname">{item.trans_date}</td>
            <td>{item.phone_number}</td>
            <td className="contestantId">{item.selected_contestant}</td>
            <td>{item.votes}</td>
            <td>
            <span className={`${item.status}-tx`}>{item.status}</span>
              {/* {item.status === "completed" ? (
                <span className="success-tx">{item.status}</span>
              ) : null}
              {item.status === "pending" ? (
                <span className="success-tx">{item.status}</span>
              ) : null}
              {item.status === "completed" ? (
                <span className="success-tx">{item.status}</span>
              ) : null}
               */}
            </td>
          </tr>
        );
      });
    }
    return <tr></tr>;
  }
}

async function getHistory() {
  $(".no-loading").show();
  try {
    var ur = "http://192.168.8.100:3000";

    var response = await axios({
      method: "get",
      url: "adminresources/getVoteHistory.php",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    $(".no-loading").hide();
  } catch (error) {
    //console.log(error.status)
    swal({
      text: "df" + error,
      icon: "warning",
    });
  }

  return response.data;
}

async function getContestants() {
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
    console.log(result);
    addEventChildNodes(result);
    // alert('done')
  } catch (error) {
    console.log(error.response);
  }
  //return result;
}

function addEventChildNodes(data) {
  /*   for (let i = 0; i < data.length; i++) {
       const item = array[i];
        
    } */
  sessionStorage.setItem("historydata", JSON.stringify(data));
  $("#eventGroup").append(`<option value=''></option>`);
  data.map((item, index) => {
    $("#eventGroup").append(
      `<option value='${item.eventname}'>${item.eventname}</option>`
    );
  });
}
function addContestantChildNodes(eventname) {
  var data = JSON.parse(sessionStorage.getItem("historydata"));
  data.map((item, index) => {
    if (item.eventname == eventname) {
      $("#contestantsGroup").html("<option></option>"); //clear the content
      item.contestants.map((contestant) => {
        $("#contestantsGroup").append(
          `<option value='${contestant.id}'>${contestant.contestant_name}</option>`
        );
      });
    }
  });
}
//class EventList
const addel = React.createElement;
const container = document.getElementById("table-body");
ReactDOM.render(addel(VoteHistory), container);
