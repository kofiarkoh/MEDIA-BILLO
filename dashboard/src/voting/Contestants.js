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
import PageHeader from "../components/Headers/PageHeader";
import Loading from "../components/Loaders/Loading";
import EditContestantModal from "../components/Modals/EditContestantModal";
import { getContestants } from "../votingapis/getcontestants";
import { sweetAlertMsg } from "votingapis/api_const";

export default function Contestants() {
  const [eventList, setEventList] = useState(null);
  const [contestant, setContestant] = useState("");
  const [selectedEvent, setEvent] = useState("");
  const [openModal, setModal] = useState(false);
 
  const [isloading, setLoading] = useState(false);
  const [contID, setContID] = useState("");
  const getContestantsList = () => {
    var resp = getContestants();
    resp
      .then((res) => {
        console.log(res);
        if (Array.isArray(res)) {
          setEventList(res);
        }else{
          sweetAlertMsg(res.message,'error')
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getContestantsList();
  }, []);

  return (
    <>
      <PageHeader />

      <Container className="mt--7" fluid>
        {eventList === null
          ? null
          : eventList.map((item, index) => {
              return (
                <Row className="mt-5" key={item.eventname}>
                  <Col className="mb-5 mb-xl-0 col-xl-12">
                    <Card className="shadow">
                      <CardHeader>
                        <h3 className="mb-0">{item.eventname}</h3>
                        <Loading loading={isloading} />
                      </CardHeader>

                      <CardBody>
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Votes</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.contestants.map((contestant, index) => {
                              return (
                                <tr key={contestant.id + contestant.votes}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{contestant.contestant_name}</td>
                                  <td>{contestant.votes}</td>

                                  <td>
                                    <Button>Delete</Button>
                                    <Button
                                      onClick={() => {
                                        setContestant(
                                          contestant.contestant_name
                                        );
                                        setEvent(item.eventname);
                                        setContID(contestant.id);
                                        setModal(true);
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
              );
            })}
      </Container>
      <EditContestantModal
        refresh={getContestantsList}
        id={contID}
        close={setModal}
        contestantname={contestant}
        eventname={selectedEvent}
        open={openModal}
      />
    </>
  );
}
