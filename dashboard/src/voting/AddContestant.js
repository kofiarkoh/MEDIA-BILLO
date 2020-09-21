import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import PageHeader from "../components/Headers/PageHeader";
import Loading from "../components/Loaders/Loading";
import { getContestants } from "votingapis/getcontestants";
import { sweetAlertMsg } from "votingapis/api_const";
import { addContestant } from "votingapis/getcontestants";

export default function AddContestant() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [eventid,setEventID] = useState('none')
  const [eventlist,setEventList] = useState([])
  const [isloading, setLoading] = useState(false);

  const fetchlist = ()=>{
    setLoading(true)
    var req = getContestants()
    req.then((res) => {
      console.log(res);
      setLoading(false)
      if (Array.isArray(res)) {
        setEventList(res);
      }else{
        sweetAlertMsg(res.message,'error')
      }
    })
    .catch((e) => {
      setLoading(false)
      console.log(e);
      sweetAlertMsg(e,'error')
    });
  }
  useEffect(()=>{
    fetchlist()
  },[])
  const submitData = async () => {
    if(name.length === 0) {
      sweetAlertMsg('Name field required','error')
      return
    }
    if (eventid === 'none'){
      sweetAlertMsg('Please assign contestant to an event','error')
      return
    }
    if(photo === null) {
      sweetAlertMsg('Photo must be provided','error')
      return
    }
    setLoading(true)
    var req = addContestant(name,eventid,photo)
    req.then((resp) => {
      console.log(resp);
      
      setLoading(false)
      sweetAlertMsg(
        resp.message,
        resp.resp_code === 200 ? "success" : "error"
      );
    })
    .catch((e) => {
      console.log(e);
      setLoading(false)
      sweetAlertMsg(e, "error");
    });
  
  };
  return (
    <>
      <PageHeader />

      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0 col-xl-12">
            <Card className="shadow">
              <CardHeader>
                <h3 className="mb-0">New Contestant</h3>
                <Loading loading={isloading} />
              </CardHeader>

              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <FormGroup className="mb-3">
                    <Label for="eventlist">Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-group-alternative"
                      type="text"
                      name="select"
                      id="eventlist"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="mb-3">
                 
                   
                 <Label for='multi'>Event</Label>
                 <Input value={eventid} onChange={(e)=>setEventID(e.target.value)} className="input-group-alternative" type='select' name='selects' id='multi'>
                 <option value='none'>Choose</option>
                 {
                   eventlist.length === 0 ? null :
                   eventlist.map((item,i)=>{
                   return <option value={item.eventname} key={i}>{item.eventname}</option>
                   })
                 }
                
                
                 </Input>              
                   
             </FormGroup>
                  <FormGroup className="mb-3">
                    <Label for="multi">Choose Photo</Label>
                    <Input
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </FormGroup>

                  <div className="text-center">
                    <Button
                      disabled={isloading}
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={() => submitData()}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
