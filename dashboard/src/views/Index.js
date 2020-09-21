
import Chart from "chart.js";
import Header from "components/Headers/Header.js";
import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
  Button,
} from "reactstrap";
// core components
import { chartOptions, parseOptions } from "variables/charts.js";
import EditSingleTicketEventModal from "../components/Modals/EditSingleTicketEventModal";
import {getHomeStatistics, updateTicketSellingStatus} from '../api calls/homestats'
import Loading from "../components/Loaders/Loading";
import swal from 'sweetalert';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      modalopen: false,
      eventstats: [],
      active_events : null,
      sales:null,
      num_events:null,
      itemToEdit: {},
      isloading:false
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  setModal = (v) => {
    this.setState({ modalopen: v });
  };
  fetchStatistics = async()=>{
    this.setState({isloading:true})
    var res = await getHomeStatistics()
    if(res.resp_code === 200){
        this.setState({eventstats:res.message.stats,
        active_events:res.message.active_events,
        num_events:res.message.num_events,
        sales:res.message.sales
        })
    }else{
     
      swal(res.message,'','error')
    }
    this.setState({isloading:false})
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };
  changeTicketStatus = async (id,status)=>{
    this.setState({isloading:true})
    var res = await updateTicketSellingStatus(id,status)
    console.log(res)
    if (res.resp_code === 200){
      swal(res.message,'','success')
      this.fetchStatistics()
    }
    else{
      swal(res.message,'','error')
    }
    this.setState({isloading:false})
  }
  componentDidMount(){
    this.fetchStatistics()
  }
  render() {
    const {sales,eventstats,active_events,num_events} = this.state
    return (
      <>
        <Header sales={sales===null ? '' : sales} active={active_events === null ? 'null' : active_events} total={num_events === null ? 'null' : num_events} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0 col-xl-12">
             
              <Card className="shadow">
                <CardHeader className="border-0">
                <Loading loading={this.state.isloading}/>
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Stats</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {/* <th scope="col">ID</th> */}
                      <th scope="col">Event Name</th>
                      <th scope="col">Price Per Ticket</th>
                      <th scope="col">Tickets Sold</th>
                      <th scope="col">Amount Earned</th>
                      <th scope="col">Acton</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                    {eventstats.length === 0 ? null :
                    
                    eventstats.map((item)=>{
                   return   <tr key={item.event_id}>
                      <th scope="row">{item.event_name}</th>
                    <td className='text-center'>{item.multi_tickers === 'true' ? '-' : item.price}</td>
                    <td className='text-center'>{item.tickets_sold}</td>
                    <td className='text-center'>{item.amount_earned}</td>
                   
                      <td>
                        {item.status === 'active' ?
                        <Button 
                        disabled={this.state.isloading}
                        onClick={()=>this.changeTicketStatus(item.event_id,'inactive')}
                        >
                          Terminate
                        </Button>  
                        :
                        <Button
                        disabled={this.state.isloading}
                        onClick={()=>this.changeTicketStatus(item.event_id,'active')}
                        >
                          Continue
                        </Button>
                      }

                        <Button  disabled={this.state.isloading} onClick={()=>{
                          this.setState({itemToEdit:item, modalopen:true})
                        }}>Edit</Button>
                      </td>
                    </tr>
                    })
                    
                    }
                  
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <EditSingleTicketEventModal
            refreshdata={this.fetchStatistics}
            item={this.state.itemToEdit}
            open={this.state.modalopen}
            close={this.setModal}
          />
        </Container>
      </>
    );
  }
}

export default Index;
