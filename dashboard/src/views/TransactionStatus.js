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
import { verifyTransaction } from "../api calls/trans_status";
import PageHeader from "../components/Headers/PageHeader";
import Loading from "../components/Loaders/Loading";

export default function TransactionStatus() {
  const [isloading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [respCode, setRespcode] = useState("");
  const [id, setId] = useState("");
  const submitData = async () => {
      setLoading(true)
    var res = verifyTransaction(id);
    res.then((resp) => {
        setLoading(false)
        console.log(resp)
        if(resp.message){
      setDesc(resp.message);}
      else{
          setDesc(resp.resp_desc)
      }
      if(resp.resp_code){
        setRespcode(resp.resp_code)

      }else{
        setRespcode(resp.trans_status);
      }
     

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
                <h3 className="mb-0">Check Transaction Status</h3>
                <Loading loading={isloading} />
              </CardHeader>

              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <FormGroup className="mb-3">
                    <Label for="eventlist">Enter Transaction ID</Label>
                    <Input
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className="input-group-alternative"
                      type="text"
                      name="select"
                      id="eventlist"
                    ></Input>
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
                <p>
                  <h3>Resp Descprition</h3>
                  {desc}
                </p>

                <p>
                  <h3>Code</h3>
                  {respCode}
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
