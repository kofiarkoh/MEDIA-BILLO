"use strict";

class ContestantList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null
    };
  }
  async fetchData() {
    //console.error("function sdsssstart");
    var data = await getContestants();

    this.setState({
      list: data
    });
    //  console.error("helddssdssdsd");
  }
  componentDidMount() {
    var data = this.fetchData();
  }
  render() {
    if (this.state.list == null) {
      return <h1>no data</h1>;
    } else {
      return this.state.list.map((item, index) => {
          //alert(index)
        return (
            <div class="card">
            {/* <!-- Card header --> */}
            <div class="card-header border-0">
              <h3 class="mb-0">{item.eventname}</h3>
            </div>
            {/* <!-- Light table --> */}
            <div class="table-responsive"  >
              
            </div>
         
         
          <table class="table align-items-center table-flush">
            <thead class="thead-light">
              <tr>
                <th scope="col" class="sort" data-sort="name">
                  No
                </th>
                <th scope="col" class="sort" data-sort="budget">
                  Name
                </th>
                <th scope="col" class="sort" data-sort="status">
                  Accumulated Votes
                </th>
                <th scope="col">Action</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody class="list">
                {item.contestants.length== 0 ? <h5>No  Contestants Found</h5>
             : <TableRows items={item.contestants}/> }
            </tbody>
          </table>
          </div>
        );
      })
      ;
    }
  }
}
async function getContestants() {
  var result = "";
  var url = "http://localhost:3000/fetchAllContestants.php";
  var formdata = new FormData();
  formdata.append("event_name", "MOST BEAUTIFUL");
  var result = "";
  try {
    var response = await axios.get(url);
    // console.log(response.text())
    if (response.status !== 200) {
      throw "Network Request Failed"; // alert('Network Connection Failed')
    }
    console.error(response.data);
    result = response.data;
    // alert('done')
  } catch (error) {
    //alert("error" + error);
    await swal({
      text: " "+error+"...Please reload this page",
      
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    //alert("ds"+error)
  }
  return result;
}
async function deleteEvent(eventname) {
  console.log(eventname);
  var formdata = new FormData();
  formdata.append("event_name", eventname);
  try {
    var response = await axios({
      method: "post",
      url: "http://localhost:3000/deleteEvent.php",
      data: formdata
      /* headers: {
          "Content-Type": "multipart/form-data",
        
        } */
    });
    console.warn("response", response);
  } catch (error) {
    console.warn("error", error);
  }
}

async function eventStatus(eventname, id, eventstatus) {
  //alert('called'+eventstatus)
  var formdata = new FormData();
  formdata.append("event_name", eventname);
  formdata.append("event_status", eventstatus);
  try {
    var response = await axios({
      method: "post",
      url: "http://localhost:3000/eventStatus.php",
      data: formdata
      /* headers: {
          "Content-Type": "multipart/form-data",
        
        } */
    });
    console.warn("response", response);
    if (eventstatus === "active") {
      await $("#inactive" + id).html(
        '<button type="button" class="btn btn-warning" id=\'inactive' +
          id +
          "' onclick='eventStatus(" +
          '"' +
          eventname +
          '",' +
          id +
          ',"inactive"' +
          ")'>Deactivate</button>"
      );
      $("#status" + id).html("Inactve");
    } else {
      await $("#inactive" + id).html(
        '<button type="button" class="btn btn-primary" id=\'active' +
          id +
          "' onclick='eventStatus(" +
          '"' +
          eventname +
          '",' +
          id +
          ',"active"' +
          ")'>Activate</button>"
      );
      $("#status" + id).html("Actve");
    }
    //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")
  } catch (error) {
    alert("set event status" + error);
  }
}


 class TableRows extends React.Component {
   componentDidMount(){
     console.log(this.props)
   }
    render() {
        return this.props.items.map((item,index)=>{
       return (  <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.contestant_name}</td>
          <td >{item.votes}</td>
          <td className="text-primary">Delete</td>
        </tr> 
       )
        })
           
    }
}
 

//export default Btn
const tableitem = React.createElement;

const eventslistContainer = document.getElementById("table-body");
ReactDOM.render(tableitem(ContestantList), eventslistContainer);
