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
  async getEvents() {
    var response = await fetchList();
    console.log("evnets are ", response);
    this.setState({
      eventList: response
    });
  }
  componentDidMount() {
    this.getEvents();
  }
  async submitValues() {
    await this.setState({
      img: this.fileInput.current.files[0]
    });
    if (this.state.name === "" || this.state.length == 0) {
      swal({
        text: "Name Field Required...",
        icon: "warning"
      });

      return;
    }
    if (this.state.eventName === "") {
      swal({
        text: "event Name required...",
        icon: "warning"
      });
      return;
    }
    if (this.state.img === undefined) {
      swal({
        text: "Photo Of Contestant required...",
        icon: "warning"
      });
      a;
      return;
    }
    // console.warn("will submit ",this.state)
    sendContestantDetails(this.state);
  }
  render() {
    return (
      <React.Fragment>
        <div className=" table-upgrade">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-control-label" htmlFor="input-address">
                  Contestant Name
                </label>
                <input
                  id="input-address"
                  className="form-control"
                  placeholder="enter contestant name here"
                  value={this.state.name}
                  onChange={event => this.setValues(event, "name")}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="cars">Select Event :</label>
                <select
                  id="cars"
                  value={this.state.eventName}
                  onChange={event => this.setValues(event, "eventName")}
                >
                  <option>Choose </option>
                  {this.state.eventList == "" ? (
                    <h1>No data</h1>
                  ) : (
                    this.state.eventList.map(item => {
                      return (
                        <option value={item.event_name}>
                          {item.event_name}
                        </option>
                      );
                    })
                  )}

                  {/* <option >Choose </option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                          
                           */}
                </select>
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
        </div>

        <a
          className="btn btn-round btn-primary"
          onClick={() => this.submitValues()}
        >
          Submit
        </a>
      </React.Fragment>
    );
  }
}
async function fetchList() {
  var result = "";
  $("input").prop("disabled", true);
  $(".no-loading").show();
  try {
    var response = await axios.get(
      "https://a61c129f.ngrok.io/getEventList.php"
    );
    result = response.data;
    $(".no-loading").hide();
    $("input").prop("disabled", false);
    // alert("ready")
  } catch (error) {
    //  alert(error)
    await swal({
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
}
async function sendContestantDetails(contestant) {
  $(".no-loading").show();
  $("input").prop("disabled", true);
  var formdata = new FormData();
  formdata.append("name", contestant.name);
  formdata.append("event_name", contestant.eventName);
  formdata.append("file", contestant.img);
  var response = "";
  try {
    var res = await axios({
      method: "post",
      data: formdata,
      url: "https://a61c129f.ngrok.io/addContestant.php",
      header: {
        "Content-Type": "multipart/form-data"
      }
    });
    response = res.data;
    await swal({
      text: " " + response.message,

      icon: "success",
      buttons: true,
      dangerMode: true
    });
    $(".no-loading").hide();
    $("input").prop("disabled", false);
    //console.log(response);
  } catch (error) {
    //  alert("add contestant error",error)
    await swal({
      text: " " + error,

      icon: "warning",
      buttons: true,
      dangerMode: true
    });
    $(".no-loading").hide();
    $("input").prop("disabled", false);
  }
}
const addel = React.createElement;
const addContainer = document.getElementById("addcontestant");
ReactDOM.render(addel(AddContestant), addContainer);
