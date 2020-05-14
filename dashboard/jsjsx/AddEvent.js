function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      eventName: "",
      img: ''
    };
  }

  setValues(event) {
    this.setState({
      eventName: event.target.value
    });
  }

  submitData() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.setState({
        img: _this.fileInput.current.files[0]
      });

      if (_this.state.eventName == "" || _this.state.eventName === 0) {
        swal({
          text: "Event Name Required...",
          icon: "warning"
        });
        return;
      }

      if (_this.state.img === undefined) {
        swal({
          text: "Photo Of Contestant required...",
          icon: "warning"
        });
        a;
        return;
      }

      var response = yield submitName(_this.state);
      console.warn("the response is ", response);
    })();
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      class: "row"
    }, React.createElement("div", {
      class: "col-md-12"
    }, React.createElement("div", {
      class: "form-group"
    }, React.createElement("label", {
      class: "form-control-label",
      for: "input-address"
    }, "Event Name"), React.createElement("input", {
      id: "eventName",
      eventstat: true,
      eventstat: true,
      class: "form-control",
      placeholder: "enter event name here",
      onChange: event => this.setValues(event),
      type: "text"
    })))), React.createElement("div", {
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
    })))))), React.createElement("input", {
      type: "button",
      value: "Submit",
      class: "btn btn-round btn-primary",
      onClick: () => this.submitData()
    }));
  }

}

function submitName(_x) {
  return _submitName.apply(this, arguments);
}

function _submitName() {
  _submitName = _asyncToGenerator(function* (data) {
    // alert("name is "+name)
    var formdata = new FormData();
    formdata.append("event_name", data.eventName);
    formdata.append("file", data.img);
    var response = "";
    $("input").prop("disabled", true);
    $(".no-loading").show();

    try {
      var ur = "http://192.168.8.100:3000";
      var token = yield sessionStorage.getItem("token");
      var res = yield axios({
        method: "post",
        url: ur + "/adminresources/addEvent.php",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token
        }
      });
      console.log('the', res);
      swal({
        text: "Event add succesffully",
        icon: "success"
      });
      $(".no-loading").hide();
      $("input").prop("disabled", false);
    } catch (error) {
      // alert("submit error",error)
      console.log(error.response);
      swal({
        text: "" + error.response.data.message,
        icon: "warning"
      });
      $(".no-loading").hide();
      $("input").prop("disabled", false);
    }

    return response;
  });
  return _submitName.apply(this, arguments);
}

const addElement = React.createElement;
const addevent = document.getElementById("addevent-form");
ReactDOM.render(addElement(AddEvent), addevent);