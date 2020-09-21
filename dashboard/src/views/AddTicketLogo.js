import React, { useState, useEffect } from "react";
import PageHeader from "../components/Headers/PageHeader";
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
  Row,
} from "reactstrap";
import { getevents, getTicketEvents } from "../api calls/getevents";
import { createTicketEvent } from "../api calls/addticketevent";
import Loading from "../components/Loaders/Loading";
import swal from "sweetalert";
import { uploadPhoto } from "../api calls/uploadphoto";
import { sweetAlertMsg } from "votingapis/api_const";

export default function AddTicketLogo() {
  const [eventlist, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isloading, setLoading] = useState(false);
  const fetchEvents = async () => {
    setLoading(true);
    var res = await getTicketEvents();
    if (res.resp_code === 200) {
      setEventList(res.message);
    } else {
      sweetAlertMsg(res.message, "error");
      
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const submitData = async () => {
    setLoading(true);
    var res = await uploadPhoto(photo, selectedEvent);
    if (res.resp_code === 200) {
      swal("success", res.message, "success");
    } else {
      swal("error", res.message, "error");
    }
    setLoading(false);
  };
  return (
    <>
      <PageHeader />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0 col-xl-12">
            <Card className="shadow">
              <CardHeader>
                <h3 className="mb-0">Add ticketing event</h3>
                <Loading loading={isloading} />
              </CardHeader>
              <CardBody>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <Label for="eventlist">Choose Event</Label>
                    <Input
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      className="input-group-alternative"
                      type="select"
                      name="select"
                      id="eventlist"
                    >
                      <option value="">Choose</option>
                      {eventlist.length === 0
                        ? null
                        : eventlist.map((item) => {
                            return (
                              <option value={item.event_id} key={item.id}>
                                {item.event_name}
                              </option>
                            );
                          })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="file">Select Logo</Label>
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
