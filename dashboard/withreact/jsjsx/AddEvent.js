function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: ''
    };
  }

  setValues(event) {
    //console.log(event.target.value)
    this.setState({
      eventName: event.target.value
    });
  }

  submitData() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.state.eventName == "" || _this.state.eventName === 0) {
        swal({
          text: "Event Name Required...",
          icon: "warning"
        });
        return;
      }

      var response = yield submitName(_this.state.eventName);
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
    })))), React.createElement("input", {
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
  _submitName = _asyncToGenerator(function* (name) {
    // alert("name is "+name)
    var formdata = new FormData();
    formdata.append("event_name", name);
    var response = '';
    $("input").prop('disabled', true);
    $(".no-loading").show();

    try {
      var res = yield axios({
        method: "post",
        url: "https://a61c129f.ngrok.io/addEvent.php",
        //"http://localhost:3000/addEvent.php",
        data: formdata,
        header: {
          "Content-Type": "multipart/form-data"
        }
      });
      swal({
        text: "Event add succesffully",
        icon: "success"
      });
      $(".no-loading").hide();
      $("input").prop('disabled', false);
    } catch (error) {
      // alert("submit error",error)
      // console.log(error.response.data.message)
      swal({
        text: "" + error.response.data.message,
        icon: "warning"
      });
      $(".no-loading").hide();
      $("input").prop('disabled', false);
    }

    return response;
  });
  return _submitName.apply(this, arguments);
}

const addElement = React.createElement;
const addevent = document.getElementById("addevent-form");
ReactDOM.render(addElement(AddEvent), addevent);