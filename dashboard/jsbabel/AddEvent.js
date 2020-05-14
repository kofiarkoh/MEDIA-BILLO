class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      eventName: "",
      img:''
    };
  }
  setValues(event) {
  
    this.setState({
      eventName: event.target.value,
    });
  }
  async submitData() {
    await this.setState({
      img: this.fileInput.current.files[0],
    });
    if (this.state.eventName == "" || this.state.eventName === 0) {
      swal({
        text: "Event Name Required...",
        icon: "warning",
      });
      return;
    }
    if (this.state.img === undefined) {
      swal({
        text: "Photo Of Contestant required...",
        icon: "warning",
      });
      a;
      return;
    }
   
    var response = await submitName(this.state);
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
        <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="file">Select Image</label>
                <div className="col-sm-offset-2 col-sm-10">
                  <label className="file-upload btn btn-secondary">
                    <input type="file" ref={this.fileInput} />
                  </label>
                </div>
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

async function submitName(data) {
  // alert("name is "+name)
  var formdata = new FormData();
  formdata.append("event_name", data.eventName);
  formdata.append("file",data.img)
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
      console.log('the',res)
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
