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
          onClick={()=>this.submitValues()}
         
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
  //console.log(sessionStorage.getItem('token'))
  var url = "/backend/adminresources/getEventList.php";
  try {
    var response = await axios.get(url, {
       headers: {
        //`"Content-Type": "application/json",
        'Authorization': "Bearer " + sessionStorage.getItem("token")
      }
    });
    result = response.data;
    //console.log(response)
    $(".no-loading").hide();
    $("input").prop("disabled", false);
    // alert("ready")
  } catch (error) {
    
    await swal({
      text: " " + error.response.data.message, // + "...Please reload this page",

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
  var token = sessionStorage.getItem("token");
  $(".no-loading").show();
  $("input").prop("disabled", true);
  var formdata = new FormData();
  formdata.append("name", contestant.name);
  formdata.append("event_name", contestant.eventName);
  formdata.append("file", contestant.img);
  var response = "";
  console.log("sednding with " + sessionStorage.getItem("token"));
  try {
    var res = await axios({
      method: "post",
      url: "/backend/adminresources/addContestant.php",
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "bearer " + token
      }
    });
    console.log(res.data);

    $(".no-loading").hide();
    $("input").prop("disabled", false);
  } catch (error) {
    console.log(error.response.data.message);
    await swal({
      text: " " + error.response.data.message,

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
