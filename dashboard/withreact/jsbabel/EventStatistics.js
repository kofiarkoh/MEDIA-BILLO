class EventStatistics extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             eventstats:""
        }
        this.render= this.render.bind(this)
    }
    
    
  async fetchStats() {
    var response = await getEventStats();
    console.log('the response is ',response)
    this.setState({
        eventstats : response
    })
  }
  componentDidMount() {
    this.fetchStats();
  }
  render() {
    console.warn(this.state.eventstats.length)

     if (this.state.eventstats.length === undefined || this.state.eventstats.length === 0){
        return      <h1>No data </h1>
      
  } 
  else{ 
      return <RowBuilder data={this.state.eventstats} /> 
    }
  }
}
class RowBuilder extends React.Component{
    render(){
        console.log('the prop is ',this.props)
        return this.props.data.map((item,index)=>{
            return (
                <tr>
                  <th scope="row">{item.eventname}</th>
                  <td>{item.numContestants}</td>
                  <td>{item.totalvotes}</td>
                  <td>
                    <i class="fas fa-arrow-up text-success mr-3"></i> {item.amount}
                  </td>
                </tr>
              );
        })
    }
}
async function getEventStats() {
  try {
    var response = await axios({
      method: "get",
      url: "http://localhost:3000/eventStats.php"
    });
    console.warn("response", response.data);

    //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")
  } catch (error) {
    swal({
        
      text: ""+ error,
      icon: "warning",
     
    })
  }
  return response.data
}
const reactElement = React.createElement;

const eventstat = document.getElementById("stats-table");
ReactDOM.render(reactElement(EventStatistics), eventstat);
