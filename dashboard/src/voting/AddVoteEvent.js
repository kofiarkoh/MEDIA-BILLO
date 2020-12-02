import React, { useState } from "react";
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
import { sweetAlertMsg } from "votingapis/api_const";
import PageHeader from "../components/Headers/PageHeader";
import Loading from "../components/Loaders/Loading";
import { addVoteEvent } from "../votingapis/addvoteevent";

export default function AddVoteEvent() {
  const [eventName, setEventName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isloading, setLoading] = useState(false);

  const submitData = async () => {
    if (eventName.length <= 0) {
      sweetAlertMsg("Event Name cannot be empty", "error");
      return;
    }
    if (photo === null) {
      sweetAlertMsg("Event logo must be provided", "error");
      return;
    }
    setLoading(true)
    var req_promise = addVoteEvent(eventName, photo);
    req_promise
      .then((resp) => {
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
                <h3 className="mb-0">Create New Event</h3>
                <Loading loading={isloading} />
              </CardHeader>

              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <FormGroup className="mb-3">
                    <Label for="eventlist">Event Name</Label>
                    <Input
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="input-group-alternative"
                      type="text"
                      name="select"
                      id="eventlist"
                    ></Input>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <Label for="multi">Choose event logo</Label>
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
