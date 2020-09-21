import EditVoteEventModal from "components/Modals/EditVoteEventModal";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { getVoteEvents } from "votingapis/addvoteevent";
import { sweetAlertMsg } from "votingapis/api_const";
import { setVotingStatus, suspendVoting } from "votingapis/eventsStatus";
import PageHeader from "../components/Headers/PageHeader";
import Loading from "../components/Loaders/Loading";

export default function VoteEvents() {
  const [eventlist, setEventlist] = useState([]);
  const [isloading, setLoading] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const getEvents = () => {
    setLoading(true)
    var req = getVoteEvents();
    req
      .then((res) => {
        console.log(res);
        setLoading(false)
        if (Array.isArray(res.message)) {
          setEventlist(res.message);
        } else {
          sweetAlertMsg("An error occured", "error");
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false)
        sweetAlertMsg(e, "error");
      });
  };
  const updateStatus = async (req_type, name, status) => {
    setLoading(true)
    var req =
      req_type === "suspend"
        ? suspendVoting(name, status)
        : setVotingStatus(name, status);
    req
      .then((resp) => {
        console.log(resp);
        setLoading(false)

        sweetAlertMsg(
          resp.message,
          resp.resp_code === 200 ? "success" : "error"
        );
        getEvents(); //fetch the new events data
      })
      .catch((e) => {
        setLoading(false)
        sweetAlertMsg(e, "error");
      });
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <PageHeader />

      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0 col-xl-12">
            <Card className="shadow">
              <CardHeader>
                <h3 className="mb-0">Event Stats</h3>
                <Loading loading={isloading} />
              </CardHeader>

              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventlist.length === 0
                      ? null
                      : eventlist.map((item, i) => {
                          return (
                            <tr key={item.event_name}>
                              <th scope="row">{i + 1}</th>
                              <td>{item.event_name}</td>
                              <td>{item.status}</td>

                              <td>
                                {item.status === "active" ? (
                                  <Button
                                    onClick={() =>
                                      updateStatus(
                                        "s",
                                        item.event_name,
                                        "inactive"
                                      )
                                    }
                                  >
                                    Deactivate
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      updateStatus(
                                        "s",
                                        item.event_name,
                                        "active"
                                      )
                                    }
                                  >
                                    Activate
                                  </Button>
                                )}
                                {item.is_ended === "true" ? (
                                  <Button
                                    onClick={() =>
                                      updateStatus(
                                        "suspend",
                                        item.event_name,
                                        "false"
                                      )
                                    }
                                  >
                                    Continue
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      updateStatus(
                                        "suspend",
                                        item.event_name,
                                        "true"
                                      )
                                    }
                                  >
                                    Suspend
                                  </Button>
                                )}

                                <Button
                                  onClick={() => {
                                    setSelectedEvent(item.event_name);
                                    setOpenModal(true);
                                  }}
                                >
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <EditVoteEventModal
        name={selectedEvent}
        open={openModal}
        close={setOpenModal}
        refresh={getEvents}
      />
    </>
  );
}
