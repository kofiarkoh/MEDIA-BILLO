import { getApplications } from "api calls/getApplications";
import ApplicationDetails from "components/Modals/ApplicationDetails";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table
} from "reactstrap";
import { sweetAlertMsg } from "votingapis/api_const";
import PageHeader from "../components/Headers/PageHeader";
import Loading from "../components/Loaders/Loading";
export default function ApplicationsIndex() {
  const [applicantsList, setapplicantsList] = useState([]);
  const [isloading, setLoading] = useState(false);

  const [selectedApplicant, setSelectedApplicant] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const getEvents = () => {
    setLoading(true)
    var req = getApplications();
    req
      .then((res) => {
        console.log(res);
        setLoading(false)
        if (Array.isArray(res.message)) {
          setapplicantsList(res.message);
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
                <h3 className="mb-0">Applications</h3>
                <Loading loading={isloading} />
              </CardHeader>

              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>

                      <th scope="col">Project Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicantsList.length === 0
                      ? null
                      : applicantsList.map((item, i) => {
                        return (
                          <tr key={item.applicant_name}>
                            <th scope="row">{i + 1}</th>
                            <td>{item.applicant_name}</td>
                            <td>{item.project_name}</td>
                            <td > <span className={item.status.toLowerCase() + '-s'}> {item.status} </span></td>

                            <td>



                              <Button
                                onClick={() => {
                                  setSelectedApplicant(item);
                                  setOpenModal(true);
                                }}
                              >
                                View
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
      <ApplicationDetails
        applicant={selectedApplicant}
        open={openModal}
        close={setOpenModal}
        refresh={getEvents}
      />
    </>
  );
}
