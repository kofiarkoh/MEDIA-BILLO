function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class AddContestant extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      eventList: "",
      name: "",
      eventName: "",
      img: ""
    };
  }

  setValues(event, field) {
    this.setState({
      [field]: event.target.value
    });
  }

  getEvents() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var response = yield fetchList();
      console.log("evnets are ", response);

      _this.setState({
        eventList: response
      });
    })();
  }

  componentDidMount() {
    this.getEvents();
  }

  submitValues() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.setState({
        img: _this2.fileInput.current.files[0]
      });

      if (_this2.state.name === "" || _this2.state.length == 0) {
        swal({
          text: "Name Field Required...",
          icon: "warning"
        });
        return;
      }

      if (_this2.state.eventName === "") {
        swal({
          text: "event Name required...",
          icon: "warning"
        });
        return;
      }

      if (_this2.state.img === undefined) {
        swal({
          text: "Photo Of Contestant required...",
          icon: "warning"
        });
        a;
        return;
      } // console.warn("will submit ",this.state)


      sendContestantDetails(_this2.state);
    })();
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: " table-upgrade"
    }, React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-md-12"
    }, React.createElement("div", {
      className: "form-group"
    }, React.createElement("label", {
      className: "form-control-label",
      htmlFor: "input-address"
    }, "Contestant Name"), React.createElement("input", {
      id: "input-address",
      className: "form-control",
      placeholder: "enter contestant name here",
      value: this.state.name,
      onChange: event => this.setValues(event, "name"),
      type: "text"
    })))), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-md-12"
    }, React.createElement("div", {
      className: "form-group"
    }, React.createElement("label", {
      htmlFor: "cars"
    }, "Select Event :"), React.createElement("select", {
      id: "cars",
      value: this.state.eventName,
      onChange: event => this.setValues(event, "eventName")
    }, React.createElement("option", null, "Choose "), this.state.eventList == "" ? React.createElement("h1", null, "No data") : this.state.eventList.map(item => {
      return React.createElement("option", {
        value: item.event_name
      }, item.event_name);
    }))))), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-md-12"
    }, React.createElement("div", {
      className: "form-group"
    }, React.createElement("label", {
      htmlFor: "file"
    }, "Select Image"), React.createElement("div", {
      className: "col-sm-offset-2 col-sm-10"
    }, React.createElement("label", {
      className: "file-upload btn btn-secondary"
    }, React.createElement("input", {
      type: "file",
      ref: this.fileInput
    }))))))), React.createElement("a", {
      className: "btn btn-round btn-primary",
      onClick: () => this.submitValues()
    }, "Submit"));
  }

}

function fetchList() {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = _asyncToGenerator(function* () {
    var result = "";
    $("input").prop("disabled", true);
    $(".no-loading").show();

    try {
      var response = yield axios.get("https://a61c129f.ngrok.io/getEventList.php");
      result = response.data;
      $(".no-loading").hide();
      $("input").prop("disabled", false); // alert("ready")
    } catch (error) {
      //  alert(error)
      yield swal({
        text: " " + error + "...Please reload this page",
        icon: "warning",
        buttons: true,
        dangerMode: true
      });
      $(".no-loading").hide();
      $("input").prop("disabled", false);
      result = null;
    }

    return result;
  });
  return _fetchList.apply(this, arguments);
}

function sendContestantDetails(_x) {
  return _sendContestantDetails.apply(this, arguments);
}

function _sendContestantDetails() {
  _sendContestantDetails = _asyncToGenerator(function* (contestant) {
    $(".no-loading").show();
    $("input").prop("disabled", true);
    var formdata = new FormData();
    formdata.append("name", contestant.name);
    formdata.append("event_name", contestant.eventName);
    formdata.append("file", contestant.img);
    var response = "";

    try {
      var res = yield axios({
        method: "post",
        data: formdata,
        url: "https://a61c129f.ngrok.io/addContestant.php",
        header: {
          "Content-Type": "multipart/form-data"
        }
      });
      response = res.data;
      yield swal({
        text: " " + response.message,
        icon: "success",
        buttons: true,
        dangerMode: true
      });
      $(".no-loading").hide();
      $("input").prop("disabled", false); //console.log(response);
    } catch (error) {
      //  alert("add contestant error",error)
      yield swal({
        text: " " + error,
        icon: "warning",
        buttons: true,
        dangerMode: true
      });
      $(".no-loading").hide();
      $("input").prop("disabled", false);
    }
  });
  return _sendContestantDetails.apply(this, arguments);
}

const addel = React.createElement;
const addContainer = document.getElementById("addcontestant");
ReactDOM.render(addel(AddContestant), addContainer);