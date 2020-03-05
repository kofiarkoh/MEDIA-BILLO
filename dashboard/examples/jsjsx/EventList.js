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
      console.error("function start");
      var data = yield fetchList();

      _this.setState({
        list: data
      });

      console.error("helddssdssdsd");
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
        return React.createElement("tr", null, React.createElement("td", null, index + 1), React.createElement("td", null, item.event_name), React.createElement("td", {
          id: `status${item.id}`
        }, item.status), React.createElement("td", null, item.status === 'inactive' ? React.createElement("span", {
          id: `active${item.id}`
        }, React.createElement("button", {
          type: "button",
          class: "btn btn-primary ",
          onClick: () => eventStatus(item.event_name, item.id, 'active')
        }, "Activate")) : React.createElement("span", {
          id: `inactive${item.id}`
        }, " ", React.createElement("button", {
          type: "button",
          class: "btn btn-warning ",
          onClick: () => eventStatus(item.event_name, item.id, 'inactive')
        }, "Deactivate")), React.createElement("button", {
          type: "button",
          class: "btn btn-danger ",
          onClick: () => deleteEvent(item.event_name)
        }, "Delete")), React.createElement("td", {
          class: "text-primary"
        }, "$36,738"));
      });
    }
  }

}

function fetchList() {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = _asyncToGenerator(function* () {
    var result = '';

    try {
      var response = yield axios.get("http://localhost:3000/getEventList.php");
      result = response.data;
    } catch (error) {
      alert(error);
      result = null;
    }

    return result;
  });
  return _fetchList.apply(this, arguments);
}

function deleteEvent(_x) {
  return _deleteEvent.apply(this, arguments);
}

function _deleteEvent() {
  _deleteEvent = _asyncToGenerator(function* (eventname) {
    console.log(eventname);
    var formdata = new FormData();
    formdata.append('event_name', eventname);

    try {
      var response = yield axios({
        method: "post",
        url: "http://localhost:3000/deleteEvent.php",
        data: formdata
        /* headers: {
          "Content-Type": "multipart/form-data",
        
        } */

      });
      console.warn('response', response);
    } catch (error) {
      console.warn("error", error);
    }
  });
  return _deleteEvent.apply(this, arguments);
}

function eventStatus(_x2, _x3, _x4) {
  return _eventStatus.apply(this, arguments);
} //export default Btn


function _eventStatus() {
  _eventStatus = _asyncToGenerator(function* (eventname, id, eventstatus) {
    //alert('called'+eventstatus)
    var formdata = new FormData();
    formdata.append('event_name', eventname);
    formdata.append('event_status', eventstatus);

    try {
      var response = yield axios({
        method: "post",
        url: "http://localhost:3000/eventStatus.php",
        data: formdata
        /* headers: {
          "Content-Type": "multipart/form-data",
        
        } */

      });
      console.warn('response', response);

      if (eventstatus === 'active') {
        yield $("#inactive" + id).html("<button type=\"button\" class=\"btn btn-warning\" id='inactive" + id + "' onclick='eventStatus(" + "\"" + eventname + "\"," + id + ",\"inactive\"" + ")'>Deactivate</button>");
        $("#status" + id).html("Inactve");
      } else {
        yield $("#inactive" + id).html("<button type=\"button\" class=\"btn btn-primary\" id='active" + id + "' onclick='eventStatus(" + "\"" + eventname + "\"," + id + ",\"active\"" + ")'>Activate</button>");
        $("#status" + id).html("Actve");
      } //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")

    } catch (error) {
      alert("set event status" + error);
    }
  });
  return _eventStatus.apply(this, arguments);
}

const e = React.createElement;
const domContainer = document.getElementById("table-body");
ReactDOM.render(e(EventList), domContainer);