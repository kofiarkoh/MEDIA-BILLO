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
        }, item.contestants.length == 0 ? React.createElement("h5", null) : React.createElement(TableRows, {
          items: item.contestants,
          eventName: item.eventname
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
    var Url = "/backend/adminresources/fetchAllContestants.php";
    var formdata = new FormData();
    formdata.append("event_name", "MOST BEAUTIFUL");
    var result = "";

    try {
      var response = yield axios({
        method: "get",
        url: "/backend/adminresources/fetchAllContestants.php",
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
    var eventname = sessionStorage.getItem('eventname');
    var id = sessionStorage.getItem('id');
    var formdata = new FormData();
    formdata.append("event_name", eventname);
    formdata.append("id", id);

    try {
      var response = yield axios({
        method: "post",
        url: "./adminresources/deleteContestant.php",
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
        className: "text-primary",
        onClick: () => confirmDeleteion(item.id, this.props.eventName)
      }, "Delete"));
    });
  }

} //export default Btn


const tableitem = React.createElement;
const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(ContestantList), eventslistContainer);