import { UserSignUp } from "api calls/auth";
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

export default function AddUser() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [accountType, setAccountType] = useState('none')
  const [isloading, setLoading] = useState(false);



  const submitData = async () => {
    if (name.length < 4) {
      sweetAlertMsg('Name  too short', 'error')
      return
    }
    if (username.length < 3) {
      sweetAlertMsg('Username too short', 'error')
      return
    }
    if (password.length < 3) {
      sweetAlertMsg('Password too short', 'error')
      return
    }
    if (accountType === 'none') {
      sweetAlertMsg('Account type must be specified', 'error')
      return
    }
    setLoading(true)
    var req = UserSignUp(name, username, password, accountType)
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
                <h3 className="mb-0">New User</h3>
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
                    <Label for="eventlist">Username</Label>
                    <Input
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="input-group-alternative"
                      type="text"
                      name="select"
                      id="eventlist"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Label for="eventlist">Password</Label>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-group-alternative"
                      type="text"
                      name="select"
                      id="eventlist"
                    ></Input>
                  </FormGroup>
                  <FormGroup className="mb-3">


                    <Label for='multi'>Account Type</Label>
                    <Input value={accountType} onChange={(e) => setAccountType(e.target.value)} className="input-group-alternative" type='select' name='selects' id='multi'>
                      <option value='none'>Choose</option>
                      <option value='admin'>Admin</option>
                      <option value='ticketChecker'>Ticket Checker</option>
                      <option value='contentCreator'>Content Creator</option>




                    </Input>

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
