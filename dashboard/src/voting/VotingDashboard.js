import Chart from "chart.js";
import Header from "components/Headers/Header.js";
import React from "react";
// reactstrap components
import { Card, CardHeader, Col, Container, Row, Table } from "reactstrap";
// core components
import { chartOptions, parseOptions } from "variables/charts.js";
import Loading from "../components/Loaders/Loading";
import { voteEventStats } from "../votingapis/voting_stats";
import { sweetAlertMsg } from "votingapis/api_const";
class VotingDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      modalopen: false,
      eventstats: [],
      summary: {
        num_events: "",
        active_events: "",
        cash: "",
      },
      active_events: null,
      sales: null,
      num_events: null,
      itemToEdit: {},
      isloading: false,
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  fetchStatistics = async () => {
    this.setState({ isloading: true });
    var req = voteEventStats();
    req
      .then((resp) => {
        if (Array.isArray(resp.message.events)) {
          this.setState({
            eventstats: resp.message.events,
            summary: resp.message.summary,
          });
        }else{
          sweetAlertMsg(resp.message,'error')
        }
        this.setState({ isloading: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ isloading: false });
      });
  
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };

  componentDidMount() {
    this.fetchStatistics();
  }
  render() {
    const {
    
      eventstats,
    
      summary,
    } = this.state;
    return (
      <>
        <Header
          sales={summary.funds}
          active={summary.active_events}
          total={summary.num_events}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0 col-xl-12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Loading loading={this.state.isloading} />
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
                      <th scope="col">ID</th>
                      <th scope="col">EVENT NAME</th>
                      <th scope="col">NO. CONTESTANTS</th>
                      <th scope="col">TOTAL VOTES</th>
                      <th scope="col">AMOUNT EARNED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventstats.length === 0
                      ? null
                      : eventstats.map((item, i) => {
                          return (
                            <tr key={item.eventname}>
                              <td className="text-center">{i + 1}</td>
                              <th scope="row">{item.eventname}</th>

                              <td className="text-center">
                                {item.numContestants}
                              </td>
                              <td className="text-center">{item.totalvotes}</td>
                              <td className="text-center">{item.amount}</td>
                            </tr>
                          );
                        })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default VotingDashboard;
