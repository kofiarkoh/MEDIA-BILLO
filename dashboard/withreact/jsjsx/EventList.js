"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
  }

  showme() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var data = yield fetchList();

      _this.setState({
        list: data
      });
    })();
  }

  componentDidMount() {
    var data = this.showme();
  }

  render() {
    if (this.state.list == null) {
      return React.createElement("h1", null, "no data");
    } else {
      return this.state.list.map((item, index) => {
        return React.createElement("tr", {
          key: item.id,
          id: item.id
        }, React.createElement("td", null, index + 1), React.createElement("td", null, item.event_name), item.status === "inactive" ? React.createElement(React.Fragment, null, React.createElement("td", {
          id: `status${item.id}`
        }, React.createElement("span", {
          class: "badge badge-dot mr-4"
        }, React.createElement("i", {
          class: "bg-warning"
        }), React.createElement("span", {
          class: "status"
        }, "Inactve"))), React.createElement("td", null, React.createElement("span", {
          id: `active${item.id}`
        }, React.createElement("button", {
          type: "button",
          className: "btn btn-primary ",
          onClick: () => eventStatus(item.event_name, item.id, "active")
        }, "Activate")))) : React.createElement(React.Fragment, null, React.createElement("td", {
          id: `status${item.id}`
        }, React.createElement("span", {
          class: "badge badge-dot mr-4"
        }, React.createElement("i", {
          class: "bg-success"
        }), React.createElement("span", {
          class: "status"
        }, "Active"))), React.createElement("td", null, React.createElement("span", {
          id: `inactive${item.id}`
        }, " ", React.createElement("button", {
          type: "button",
          className: "btn btn-warning ",
          onClick: () => eventStatus(item.event_name, item.id, "inactive")
        }, "Deactivate")))), React.createElement("td", null, React.createElement("button", {
          type: "button",
          className: "btn btn-danger ",
          onClick: () => confirmDeleteion(item.event_name, item.id)
        }, "Delete")));
      });
    }
  }

}

function fetchList() {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = _asyncToGenerator(function* () {
    var result = "";

    try {
      var response = yield axios.get("http://localhost:3000/getEventList.php");
      result = response.data;
    } catch (error) {
      // alert(error);
      result = null;
    }

    return result;
  });
  return _fetchList.apply(this, arguments);
}

function confirmDeleteion(_x, _x2) {
  return _confirmDeleteion.apply(this, arguments);
}

function _confirmDeleteion() {
  _confirmDeleteion = _asyncToGenerator(function* (eventname, id) {
    sessionStorage.setItem("eventname", eventname);
    sessionStorage.setItem("id", id);
    yield swal({
      text: "Proceed to delete " + eventname + " ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteEvent();
      }
    });
  });
  return _confirmDeleteion.apply(this, arguments);
}

function deleteEvent() {
  return _deleteEvent.apply(this, arguments);
}

function _deleteEvent() {
  _deleteEvent = _asyncToGenerator(function* () {
    var formdata = new FormData();
    var eventname = sessionStorage.getItem("eventname");
    var id = sessionStorage.getItem("id");
    formdata.append("event_name", eventname);

    try {
      var response = yield axios({
        method: "post",
        url: "http://localhost:3000/deleteEvent.php",
        data: formdata
      }); //console.warn("response", response);

      yield swal({
        text: " Deletion Succesful",
        icon: "success"
      });
      $("#" + id).hide();
    } catch (error) {
      yield swal({
        text: " " + error,
        icon: "warning"
      }); // console.warn("error", error);
    }
  });
  return _deleteEvent.apply(this, arguments);
}

function eventStatus(_x3, _x4, _x5) {
  return _eventStatus.apply(this, arguments);
} //export default Btn


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
        $("#status" + id).html(' <span class="badge badge-dot mr-4">\
       <i class="bg-success"></i>\
       <span class="status">Active</span>  </span>');
      } else {
        yield $("#inactive" + id).html('<button type="button" class="btn btn-primary" id=\'active' + id + "' onclick='eventStatus(" + '"' + eventname + '",' + id + ',"active"' + ")'>Activate</button>");
        $("#status" + id).html('<span class="badge badge-dot mr-4">\
       <i class="bg-warning"></i>\
       <span class="status">Iactive</span>  </span>');
      } //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")

    } catch (error) {
      // alert("set event status" + error);
      swal({
        title: "Error!",
        text: "A problem occured while Fetching data , please reload this page",
        icon: "warning"
      });
    }
  });
  return _eventStatus.apply(this, arguments);
}

const tableitem = React.createElement;
const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(EventList), eventslistContainer);