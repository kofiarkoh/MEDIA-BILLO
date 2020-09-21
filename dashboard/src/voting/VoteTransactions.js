import React, { useEffect, useState } from "react";
import {
  Card,

  CardBody, CardHeader, Col, Container,





  Form,
  FormGroup,

  Input,
  Label, Row
} from "reactstrap";
import { getVoteTransactions } from "votingapis/addvoteevent";
import { sweetAlertMsg } from "votingapis/api_const";
import { getContestants } from "votingapis/getcontestants";
import PageHeader from "../components/Headers/PageHeader";
import Loading from "../components/Loaders/Loading";
import VoteTransactionsTable from "./VoteTransactionsTable";

export default function VoteTransactions() {
  const [eventlist, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [contestant,setContestant] = useState('')
  const [isloading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const fetchEvents = async () => {
    setLoading(true);
    var req =getContestants()
    req
      .then((res) => {
        console.log(res);
        setLoading(false)
        if (Array.isArray(res)) {
          
          setEventList(res);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false)
        sweetAlertMsg(e, "error");
      });
    // setLoading(false)
  };
  const handleEventChange = async (eventid) => {
   
    setSelectedEvent(eventid);
    /* s */
    getSummary(eventid)
   
  };
  const getSummary = async (id) => {
    setLoading(true);
    var req = getVoteTransactions(eventlist[id].eventname)
    req
      .then((res) => {
        console.log(res);
        setLoading(false)
        if (Array.isArray(res)) {
         // console.log(res.message)
         setTransactions(res)
         // setEventList(res);
        }else{
          sweetAlertMsg('An error occured while loading data', "error");
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false)
        sweetAlertMsg(e, "error");
      });
    // setLoading(false)
  };
  const handleContestantChange = (id)=>{
      setContestant(id)
      var c_list = transactions.filter((transaction)=> transaction.selected_contestant === id  )
      console.log(c_list)
      setTransactions(c_list)
  }
  useEffect(() => {
    
    console.log('vote trans mounted')
    fetchEvents();
  }, []);
  return (
    <>
      <PageHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card>
              {/*  <CardHeader>
                            Transaction Status
                        </CardHeader> */}
              <CardBody>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <Label for="eventlist">Choose Event</Label>
                    <Input
                      value={selectedEvent}
                      onChange={(e) => handleEventChange(e.target.value)}
                      className="input-group-alternative"
                      type="select"
                      name="select"
                      id="eventlist"
                    >
                      <option value="">Choose</option>
                      {eventlist.length === 0
                        ? null
                        : eventlist.map((item,i) => {
                            return (
                              <option value={i} key={i}>
                                {item.eventname}
                              </option>
                            );
                          })}
                    </Input>
                    
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Label for="eventlist">Choose Event</Label>
                    <Input
                      value={contestant}
                      onChange={(e)=>handleContestantChange(e.target.value)}
                      className="input-group-alternative"
                      type="select"
                      name="select"
                      id="eventlist"
                    >
                      <option value="">Choose</option>
                      {selectedEvent.length === 0 || eventlist.length === 0 ||eventlist[selectedEvent] === undefined
                        ? null
                        : eventlist[selectedEvent].contestants.map((item,i) => {
                            return (
                              <option value={item.id} key={item.id}>
                                {item.contestant_name}
                              </option>
                            );
                          })}
                    </Input>

                    </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0 col-xl-12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Loading loading={isloading} />
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Transactions</h3>
                  </div>
                </Row>
              </CardHeader>
              
              <VoteTransactionsTable setload={setLoading} data={transactions}/>

            </Card>
          </Col>
        </Row>
      </Container>
     

    </>
  );
}
