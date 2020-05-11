class AddEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: "",
    };
  }
  setValues(event) {
    //console.log(event.target.value)
    this.setState({
      eventName: event.target.value,
    });
  }
  async submitData() {
    if (this.state.eventName == "" || this.state.eventName === 0) {
      swal({
        text: "Event Name Required...",
        icon: "warning",
      });
      return;
    }
    var response = await submitName(this.state.eventName);
    console.warn("the response is ", response);
  }

  render() {
    return (
      <React.Fragment>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label class="form-control-label" for="input-address">
                Event Name
              </label>
              <input
                id="eventName"
                eventstat
                eventstat
                class="form-control"
                placeholder="enter event name here"
                onChange={(event) => this.setValues(event)}
                type="text"
              />
            </div>
          </div>
        </div>

        <input
          type="button"
          value="Submit"
          class="btn btn-round btn-primary"
          onClick={() => this.submitData()}
        />
      </React.Fragment>
    );
  }
}

async function submitName(name) {
  // alert("name is "+name)
  var formdata = new FormData();
  formdata.append("event_name", name);
  var response = "";
  $("input").prop("disabled", true);
  $(".no-loading").show();
  try {
    var ur = "http://192.168.8.100:3000";
    var token = await sessionStorage.getItem("token");

    var res = await axios({
      method: "post",
      url: ur + "/adminresources/addEvent.php",
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });

    swal({
      text: "Event add succesffully",
      icon: "success",
    });
    $(".no-loading").hide();
    $("input").prop("disabled", false);
  } catch (error) {
    // alert("submit error",error)
    console.log(error.response);
    swal({
      text: "" + error.response.data.message,
      icon: "warning",
    });
    $(".no-loading").hide();

    $("input").prop("disabled", false);
  }
  return response;
}
const addElement = React.createElement;

const addevent = document.getElementById("addevent-form");
ReactDOM.render(addElement(AddEvent), addevent);
