import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { fetchCategoryStats } from "../api calls/homestats";
import PageHeader from "../components/Headers/PageHeader";
import EditTicketCategoryModal from "../components/Modals/EditTicketCategoryModal";
import { sweetAlertMsg } from "votingapis/api_const";

export default function TicketSummary() {
  const [name, setName] = useState("AMA : 50 ");
  const [events, setEvents] = useState([]);
  const [modalopen, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const fetchData = async () => {
    var res = await fetchCategoryStats();
    if (res.resp_code === 200) {
      setEvents(res.message);
    
    } else {
      sweetAlertMsg(res.message, "error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <PageHeader />

      <Container className="mt--7" fluid>
        
        {events.length === 0
          ? null
          : events.map((event) => {
              return (
                <Row className="mt-5" key={event.event_name}>
                  <Col className="mb-5 mb-xl-0 col-xl-12">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <div className="col">
                            <h3 className="mb-0">{event.event_name}</h3>
                          </div>
                        </Row>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price Per Ticket</th>
                            <th scope="col">Tickets Sold</th>
                            <th scope="col">Total Cash</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.categories.length === 0
                            ? null
                            : event.categories.map((category, index) => {
                                return (
                                  <tr key={category.category_id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category.category_name}</td>
                                    <td>{category.price}</td>
                                    <td>{category.tickets_sold}</td>

                                    <td>
                                      {(
                                        category.price * category.tickets_sold
                                      ).toFixed(2)}
                                    </td>
                                    <td>
                                      {/* <Button>Delete</Button> */}
                                      <Button
                                        onClick={() => {
                                          setSelectedCategory(category);
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
                    </Card>
                  </Col>
                </Row>
              );
            })}

        <EditTicketCategoryModal
          refreshdata={fetchData}
          item={selectedCategory}
          open={modalopen}
          close={setModal}
        />
      </Container>
    </>
  );
}
