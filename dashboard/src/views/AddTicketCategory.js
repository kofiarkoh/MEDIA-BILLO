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
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import PageHeader from "../components/Headers/PageHeader";
import { getTicketEvents } from "../api calls/getevents";
import { createTicketCategory } from "../api calls/addticketcategory";
import Loading from "../components/Loaders/Loading";
import swal from "sweetalert";
import { sweetAlertMsg } from "votingapis/api_const";

export default function AddTicketCategory() {
  const [name, setName] = useState("");
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("none");
  const [categories, setCategories] = useState([]);
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
  const addNameWithPrice = () => {
    let name_t = name.trim();

    var colonIndex = name_t.indexOf(":");
    var colonCount = (name_t.match(/:/g) || []).length;
    var price = name_t.slice(colonIndex + 1);
    var cat_name = name_t.slice(0, colonIndex);

    /*   console.log('colon count',colonCount)
        console.log('rexexp res ',colonRegExp.test(name_t))
        console.log('price is ',name_t.slice(colonIndex))
        console.log('category name is ',name_t.slice(0,colonIndex)) */
    if (cat_name.length === 0 || price <= 0 || colonCount === 0) {
      swal("enter valid name and amount", "", "error");
      return;
    }
    setCategories(categories.concat([{ name: cat_name, price: price }]));
  };
  const removeFromList = async (name) => {
    let data = categories.filter((item) => item.name !== name);
    await setCategories(data);
  };
  const submitData = async () => {
    if (selectedEvent === "none") {
      console.log("please choose and event");
      swal("please choose and event", "", "warning");
      return;
    }
    if (categories.length === 0) {
      console.log("please provide at least one category");
      swal("please provide at least one category", "", "warning");
      return;
    }
    setLoading(true);
    var res = await createTicketCategory(selectedEvent, categories);
    if (res.resp_code === 200) {
      swal("Success", res.message, "success");
    } else {
      swal("Error", res.message, "error");
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
                <h3 className="mb-0">Add Ticket Category</h3>

                <Loading loading={isloading} />
              </CardHeader>

              <CardBody className="px-lg-5 py-lg-5">
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
                      <option value="none">choose</option>
                      {eventList.length === 0
                        ? null
                        : eventList.map((item) => {
                            return (
                              <option key={item.event_id} value={item.event_id}>
                                {item.event_name}
                              </option>
                            );
                          })}
                    </Input>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <Label for="multi">Category</Label>
                    <InputGroup className="input-group-alternative">
                      <Input
                        className="input-group-alternative"
                        value={name}
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                        placeholder="eg: REGULAR:50"
                        type="text"
                        name="selects"
                        id="multi"
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <Button
                            onClick={() => addNameWithPrice()}
                            color="primary"
                            type="button"
                          >
                            +
                          </Button>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    {categories.length === 0
                      ? null
                      : categories.map((item, index) => {
                          return (
                            <InputGroup key={item.name} className="mb-3">
                              <Input
                                className="input-group-alternative"
                                value={`${item.name} @ GHC${item.price}`}
                                disabled
                                name="selects"
                                id="multi"
                              />

                              <InputGroupAddon addonType="append">
                                <InputGroupText
                                  onClick={() => removeFromList(item.name)}
                                >
                                  X
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                          );
                        })}
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