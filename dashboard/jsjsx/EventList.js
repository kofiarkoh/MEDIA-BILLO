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
          className: "badge badge-dot mr-4"
        }, React.createElement("i", {
          className: "bg-warning"
        }), React.createElement("span", {
          className: "status"
        }, "Inactve"))), React.createElement("td", null, React.createElement("span", {
          id: `active${item.id}`
        }, React.createElement("button", {
          type: "button",
          className: "btn btn-primary mr-2",
          onClick: () => eventStatus(item.event_name, item.id, "active")
        }, "Activate")), React.createElement("span", null, React.createElement("button", {
          type: "button",
          className: "btn btn-danger mr-2",
          onClick: () => confirmDeleteion(item.event_name, item.id)
        }, React.createElement("i", {
          class: "fas fa-trash"
        }))), React.createElement("span", null, React.createElement("button", {
          type: "button",
          className: "btn btn-info mr-2",
          onClick: () => showModal(item.event_name)
        }, React.createElement("i", {
          class: "fas fa-edit"
        }))))) : React.createElement(React.Fragment, null, React.createElement("td", {
          id: `status${item.id}`
        }, React.createElement("span", {
          className: "badge badge-dot mr-4"
        }, React.createElement("i", {
          className: "bg-success"
        }), React.createElement("span", {
          className: "status"
        }, "Active"))), React.createElement("td", null, React.createElement("span", {
          id: `inactive${item.id}`
        }, " ", React.createElement("button", {
          type: "button",
          className: "btn btn-warning mr-2",
          onClick: () => eventStatus(item.event_name, item.id, "inactive")
        }, "Deactivate")), React.createElement("span", null, React.createElement("button", {
          type: "button",
          className: "btn btn-danger mr-2",
          onClick: () => confirmDeleteion(item.event_name, item.id)
        }, React.createElement("i", {
          class: "fas fa-trash"
        }))), React.createElement("span", null, React.createElement("button", {
          type: "button",
          className: "btn btn-info mr-2",
          onClick: () => showModal(item.event_name)
        }, React.createElement("i", {
          class: "fas fa-edit"
        }))))));
      });
    }
  }

}

var ur = "http://192.168.8.100:3000";

function fetchList() {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = _asyncToGenerator(function* () {
    var result = "";

    try {
      var response = yield axios.get("adminresources/getEventList.php", {
        headers: {
          //`"Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });
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
        url: "adminresources/deleteEvent.php",
        data: formdata,
        headers: {
          //`"Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
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
        url: "/adminresources/eventStatus.php",
        data: formdata,
        headers: {
          //`"Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
        /* headers: {
            "Content-Type": "multipart/form-data",
          
          } */

      });
      console.log("response", response);

      if (eventstatus === "active") {
        yield $("#inactive" + id).html('<button type="button" className="btn btn-warning mr-2" id=\'inactive' + id + "' onclick='eventStatus(" + '"' + eventname + '",' + id + ',"inactive"' + ")'>Deactivate</button>");
        $("#status" + id).html(' <span className="badge badge-dot mr-4">\
       <i className="bg-success"></i>\
       <span className="status">Active</span>  </span>');
      } else {
        yield $("#inactive" + id).html('<button type="button" className="btn btn-primary mr-2" id=\'active' + id + "' onclick='eventStatus(" + '"' + eventname + '",' + id + ',"active"' + ")'>Activate</button>");
        $("#status" + id).html('<span className="badge badge-dot mr-4">\
       <i className="bg-warning"></i>\
       <span className="status">Iactive</span>  </span>');
      } //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")

    } catch (error) {
      console.log(error.response); // alert("set event status" + error);

      swal({
        title: "Error!",
        text: error.response.data.message,
        icon: "warning"
      });
    }
  });
  return _eventStatus.apply(this, arguments);
}

function showModal(name) {
  $("#titleName").text(name);
  $("#editModal").modal({
    keyboard: true,
    backdrop: 'static',
    show: true
  });
}

function submitNewData() {
  return _submitNewData.apply(this, arguments);
}

function _submitNewData() {
  _submitNewData = _asyncToGenerator(function* () {
    var new_name = $("#newName").val();
    var photo = $("#newPhoto")[0].files[0];
    var prev_name = $("#titleName").text();
    var reg = /\s\s+/g;
    var res = reg.test(new_name);

    if (res) {
      swal({
        title: "Warning!",
        text: 'Name field cannot be white spaces only',
        icon: "warning"
      });
      return;
    }

    if ((new_name == '' || new_name == null) && photo == undefined) {
      swal({
        title: "Warning!",
        text: 'You have not made any changes',
        icon: "warning"
      });
      return;
    }

    $("#spinner").fadeIn();
    $('#submitBtn').prop('disabled', true);
    var data = new FormData();
    data.append("file", photo);
    data.append("prev_name", prev_name);
    data.append('new_name', new_name);
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
      headers: {
        //`"Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    var responseCode = 0;
    yield fetch("/adminresources/editEvent.php", requestOptions).then(response => {
      responseCode = response.status;
      return response.text();
    }).then(result => {
      if (responseCode == 200) {
        location.reload();
        swal({
          title: "Success",
          text: "Changes recorded successfully",
          icon: "success"
        });
      } else {
        swal({
          title: "Error!",
          text: "An error has occured, please try again",
          icon: "warning"
        });
      }
    }).catch(error => {
      console.log(error);
      swal({
        title: "Error!",
        text: "An unknown error has occured, please try again",
        icon: "warning"
      });
    });
    $("#spinner").fadeOut();
    $('#submitBtn').prop('disabled', false);
  });
  return _submitNewData.apply(this, arguments);
}

const tableitem = React.createElement;
const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(EventList), eventslistContainer);