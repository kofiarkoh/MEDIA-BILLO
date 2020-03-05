"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ContestantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
  }

  fetchData() {
    var _this = this;

    return _asyncToGenerator(function* () {
      //console.error("function sdsssstart");
      var data = yield getContestants();

      _this.setState({
        list: data
      }); //  console.error("helddssdssdsd");

    })();
  }

  componentDidMount() {
    var data = this.fetchData();
  }

  render() {
    if (this.state.list == null) {
      return React.createElement("h1", null, "no data");
    } else {
      return this.state.list.map((item, index) => {
        //alert(index)
        return React.createElement("div", {
          class: "card"
        }, React.createElement("div", {
          class: "card-header border-0"
        }, React.createElement("h3", {
          class: "mb-0"
        }, item.eventname)), React.createElement("div", {
          class: "table-responsive"
        }), React.createElement("table", {
          class: "table align-items-center table-flush"
        }, React.createElement("thead", {
          class: "thead-light"
        }, React.createElement("tr", null, React.createElement("th", {
          scope: "col",
          class: "sort",
          "data-sort": "name"
        }, "No"), React.createElement("th", {
          scope: "col",
          class: "sort",
          "data-sort": "budget"
        }, "Name"), React.createElement("th", {
          scope: "col",
          class: "sort",
          "data-sort": "status"
        }, "Accumulated Votes"), React.createElement("th", {
          scope: "col"
        }, "Action"), React.createElement("th", {
          scope: "col"
        }))), React.createElement("tbody", {
          class: "list"
        }, item.contestants.length == 0 ? React.createElement("h5", null, "No  Contestants Found") : React.createElement(TableRows, {
          items: item.contestants
        }))));
      });
    }
  }

}

function getContestants() {
  return _getContestants.apply(this, arguments);
}

function _getContestants() {
  _getContestants = _asyncToGenerator(function* () {
    var result = "";
    var url = "http://localhost:3000/fetchAllContestants.php";
    var formdata = new FormData();
    formdata.append("event_name", "MOST BEAUTIFUL");
    var result = "";

    try {
      var response = yield axios.get(url); // console.log(response.text())

      if (response.status !== 200) {
        throw "Network Request Failed"; // alert('Network Connection Failed')
      }

      console.error(response.data);
      result = response.data; // alert('done')
    } catch (error) {
      //alert("error" + error);
      yield swal({
        text: " " + error + "...Please reload this page",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }); //alert("ds"+error)
    }

    return result;
  });
  return _getContestants.apply(this, arguments);
}

function deleteEvent(_x) {
  return _deleteEvent.apply(this, arguments);
}

function _deleteEvent() {
  _deleteEvent = _asyncToGenerator(function* (eventname) {
    console.log(eventname);
    var formdata = new FormData();
    formdata.append("event_name", eventname);

    try {
      var response = yield axios({
        method: "post",
        url: "http://localhost:3000/deleteEvent.php",
        data: formdata
        /* headers: {
            "Content-Type": "multipart/form-data",
          
          } */

      });
      console.warn("response", response);
    } catch (error) {
      console.warn("error", error);
    }
  });
  return _deleteEvent.apply(this, arguments);
}

function eventStatus(_x2, _x3, _x4) {
  return _eventStatus.apply(this, arguments);
}

function _eventStatus() {
  _eventStatus = _asyncToGenerator(function* (eventname, id, eventstatus) {
    //alert('called'+eventstatus)
    var formdata = new FormData();
    formdata.append("event_name", eventname);
    formdata.append("event_status", eventstatus);

    try {
      var response = yield axios({
        method: "post",
        url: "http://localhost:3000/eventStatus.php",
        data: formdata
        /* headers: {
            "Content-Type": "multipart/form-data",
          
          } */

      });
      console.warn("response", response);

      if (eventstatus === "active") {
        yield $("#inactive" + id).html('<button type="button" class="btn btn-warning" id=\'inactive' + id + "' onclick='eventStatus(" + '"' + eventname + '",' + id + ',"inactive"' + ")'>Deactivate</button>");
        $("#status" + id).html("Inactve");
      } else {
        yield $("#inactive" + id).html('<button type="button" class="btn btn-primary" id=\'active' + id + "' onclick='eventStatus(" + '"' + eventname + '",' + id + ',"active"' + ")'>Activate</button>");
        $("#status" + id).html("Actve");
      } //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")

    } catch (error) {
      alert("set event status" + error);
    }
  });
  return _eventStatus.apply(this, arguments);
}

class TableRows extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return this.props.items.map((item, index) => {
      return React.createElement("tr", {
        key: item.id
      }, React.createElement("td", null, index + 1), React.createElement("td", null, item.contestant_name), React.createElement("td", null, item.votes), React.createElement("td", {
        className: "text-primary"
      }, "Delete"));
    });
  }

} //export default Btn


const tableitem = React.createElement;
const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(ContestantList), eventslistContainer);