function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class VoteHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventHistory: null
    };
  }

  eventChangeHandler() {
    var group = document.getElementById("eventGroup");
    const contestantGroup = document.getElementById("contestantsGroup");
    contestantGroup.addEventListener("change", function (event) {
      var selectedContestant = event.target.value; // var table = $("#historyTable").DataTable();

      if ($.fn.dataTable.isDataTable("#historyTable")) {
        var htable = $("#historyTable").DataTable();
      } else {
        var htable = $("#historyTable").DataTable({
          columns: [{
            searchable: false
          }, {
            searchable: false
          }, {
            searchable: true
          }, {
            searchable: false
          }, {
            searchable: false
          }]
        });
      }

      htable.search(`${selectedContestant}`).draw();
    });
    group.addEventListener("change", function (event) {
      var selectedevent = event.target.value;
      addContestantChildNodes(selectedevent);
    });
  }

  fetchEventList() {
    return _asyncToGenerator(function* () {
      yield getContestants();
    })();
  }

  fetchHistory() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var response = yield getHistory();

      _this.setState({
        eventHistory: response
      });
    })();
  }

  componentDidMount() {
    this.fetchEventList();
    this.eventChangeHandler();
    this.fetchHistory();
  }

  render() {
    if (this.state.eventHistory !== null) {
      return this.state.eventHistory.map(item => {
        return React.createElement("tr", null, React.createElement("td", {
          id: "cname"
        }, item.trans_date), React.createElement("td", null, item.phone_number), React.createElement("td", {
          className: "contestantId"
        }, item.selected_contestant), React.createElement("td", null, item.votes), React.createElement("td", null, React.createElement("span", {
          className: `${item.status}-tx`
        }, item.status)));
      });
    }

    return React.createElement("tr", null);
  }

}

function getHistory() {
  return _getHistory.apply(this, arguments);
}

function _getHistory() {
  _getHistory = _asyncToGenerator(function* () {
    $(".no-loading").show();

    try {
      var ur = "http://192.168.8.100:3000";
      var response = yield axios({
        method: "get",
        url: "adminresources/getVoteHistory.php",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });
      $(".no-loading").hide();
    } catch (error) {
      //console.log(error.status)
      swal({
        text: "df" + error,
        icon: "warning"
      });
    }

    return response.data;
  });
  return _getHistory.apply(this, arguments);
}

function getContestants() {
  return _getContestants.apply(this, arguments);
}

function _getContestants() {
  _getContestants = _asyncToGenerator(function* () {
    var result = "";

    try {
      var ur = "http://192.168.8.100:3000";
      var response = yield axios({
        method: "get",
        url: "/adminresources/fetchAllContestants.php",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });

      if (response.status !== 200) {
        throw "Network Request Failed"; // alert('Network Connection Failed')
      } // console.error(response.data);


      result = response.data;
      console.log(result);
      addEventChildNodes(result); // alert('done')
    } catch (error) {
      console.log(error.response);
    } //return result;

  });
  return _getContestants.apply(this, arguments);
}

function addEventChildNodes(data) {
  /*   for (let i = 0; i < data.length; i++) {
       const item = array[i];
        
    } */
  sessionStorage.setItem("historydata", JSON.stringify(data));
  $("#eventGroup").append(`<option value=''></option>`);
  data.map((item, index) => {
    $("#eventGroup").append(`<option value='${item.eventname}'>${item.eventname}</option>`);
  });
}

function addContestantChildNodes(eventname) {
  var data = JSON.parse(sessionStorage.getItem("historydata"));
  data.map((item, index) => {
    if (item.eventname == eventname) {
      $("#contestantsGroup").html("<option></option>"); //clear the content

      item.contestants.map(contestant => {
        $("#contestantsGroup").append(`<option value='${contestant.id}'>${contestant.contestant_name}</option>`);
      });
    }
  });
} //class EventList


const addel = React.createElement;
const container = document.getElementById("table-body");
ReactDOM.render(addel(VoteHistory), container);