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
      var data = yield getContestants();
      console.log("the", data);

      _this.setState({
        list: data
      });
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
        }, React.createElement("table", {
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
        }, "Action"))), React.createElement("tbody", {
          class: "list"
        }, item.contestants.length == 0 ? React.createElement("h5", null) : React.createElement(TableRows, {
          items: item.contestants,
          eventName: item.eventname
        })))));
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
    var Url = "/backend/adminresources/fetchAllContestants.php";
    var formdata = new FormData();
    formdata.append("event_name", "MOST BEAUTIFUL");
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


      result = response.data; // alert('done')
    } catch (error) {
      //alert("error" + error);
      console.log(error.response);
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

function confirmDeleteion(_x, _x2) {
  return _confirmDeleteion.apply(this, arguments);
}

function _confirmDeleteion() {
  _confirmDeleteion = _asyncToGenerator(function* (id, eventname) {
    sessionStorage.setItem("eventname", eventname);
    sessionStorage.setItem("id", id);
    yield swal({
      text: "Proceed to delete  ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteContestant();
      }
    });
  });
  return _confirmDeleteion.apply(this, arguments);
}

function deleteContestant() {
  return _deleteContestant.apply(this, arguments);
}

function _deleteContestant() {
  _deleteContestant = _asyncToGenerator(function* () {
    var eventname = sessionStorage.getItem("eventname");
    var id = sessionStorage.getItem("id");
    var formdata = new FormData();
    formdata.append("event_name", eventname);
    formdata.append("id", id);

    try {
      var ur = "http://192.168.8.100:3000";
      var response = yield axios({
        method: "post",
        url: "/adminresources/deleteContestant.php",
        data: formdata,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });
      yield swal({
        text: " Deletion Succesfuldsd",
        icon: "success"
      });
      $("#" + id).hide();
      console.log("response", response);
    } catch (error) {
      console.log(error.response);
      yield swal({
        text: " Deletion Unsuccesful",
        icon: "warning"
      }); // console.log("error", error.response);
    }
  });
  return _deleteContestant.apply(this, arguments);
}

class TableRows extends React.Component {
  render() {
    return this.props.items.map((item, index) => {
      return React.createElement("tr", {
        key: item.id,
        id: item.id
      }, React.createElement("td", null, index + 1), React.createElement("td", null, item.contestant_name), React.createElement("td", null, item.votes), React.createElement("td", {
        className: "text-primary"
      }, React.createElement("span", null, React.createElement("button", {
        type: "button",
        className: "btn btn-danger mr-2",
        onClick: () => confirmDeleteion(item.id, this.props.eventName)
      }, React.createElement("i", {
        class: "fas fa-user-times"
      }))), React.createElement("span", null, React.createElement("button", {
        type: "button",
        className: "btn btn-info ",
        onClick: () => showModal(item.contestant_name, this.props.eventName, item.id)
      }, React.createElement("i", {
        class: "fas fa-user-edit"
      })))));
    });
  }

} //export default Btn


function showModal(name, eventname, id) {
  sessionStorage.setItem("eventname", eventname);
  sessionStorage.setItem("id", id);
  $("#titleName").text(name);
  $("#editModal").modal({
    keyboard: true,
    backdrop: "static",
    show: true
  });
}

function submitNewData() {
  return _submitNewData.apply(this, arguments);
} //export default Btn


function _submitNewData() {
  _submitNewData = _asyncToGenerator(function* () {
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
        icon: "warning"
      });
      return;
    }

    if ((new_name == "" || new_name == null) && photo == undefined) {
      swal({
        title: "Warning!",
        text: "You have not made any changes",
        icon: "warning"
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
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    };
    var responseCode = 0;
    fetch("/adminresources/editContestant.php", requestOptions).then(response => {
      responseCode = response.status;
      return response.text();
    }).then(result => {
      //console.log(result)
      if (responseCode == 200) {
        swal({
          title: "Success",
          text: "Changes recorded successfully",
          icon: "success"
        });
        location.reload();
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
    $("#submitBtn").prop("disabled", false);
  });
  return _submitNewData.apply(this, arguments);
}

const tableitem = React.createElement;
const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(ContestantList), eventslistContainer);