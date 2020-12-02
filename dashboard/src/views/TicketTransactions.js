import React, { useEffect, useState } from 'react';
import {
  Badge, Card, CardBody, CardHeader, Col, Container, Form, FormGroup,

  Input, Label, Row,

  Table
} from 'reactstrap';
import swal from 'sweetalert';
import { sweetAlertMsg } from 'votingapis/api_const';
import { fetchTicketEvents, getTransactions } from '../api calls/verifyticket';
import PageHeader from '../components/Headers/PageHeader';
import Loading from '../components/Loaders/Loading';

export default function TicketTransactions() {
    const [eventlist,setEventList] = useState([])
    const [selectedEvent,setSelectedEvent] = useState('')
    const [isloading,setLoading] = useState(false)
    const [transactions,setTransactions] = useState([])
    const fetchEvents = async ()=>{
        setLoading(true)
        var res = await fetchTicketEvents()
        if (res.resp_code === 200) {
          setEventList(res.message);
        
        } else {
          sweetAlertMsg(res.message, "error");
         
        }
        setLoading(false)
    }
    const handleEventChange = async (eventid)=>{
        setLoading(true)
        setSelectedEvent(eventid)
        var res = await getTransactions(eventid)
        if(res.resp_code === 200){
            setTransactions(res.message)
        }else{
            swal('error',res.message,'error')
        }
        setLoading(false)
    }
    useEffect(()=>{
        fetchEvents()
    },[])
    return (
        <>
        <PageHeader/>
        <Container className='mt--7' fluid>
            <Row>
                <Col>
                    <Card>
                       {/*  <CardHeader>
                            Transaction Status
                        </CardHeader> */}
                        <CardBody>
                        <Form role="form">
                <FormGroup className='mb-3'>
                    <Label for='eventlist'>Choose Event</Label>
                    <Input value={selectedEvent}  onChange={(e)=>handleEventChange(e.target.value)}  className="input-group-alternative" type='select' name='select' id='eventlist'>
                  <option value=''>Choose</option>
                  {
                      eventlist.length === 0 ? null :
                      eventlist.map((item)=>{
                      return <option value={item.event_id} key={item.id}>{item.event_name}</option>
                      })
                  }
                
                    </Input>
                </FormGroup>
                </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
            <Col className="mb-5 mb-xl-0 col-xl-12">
             
              <Card className="shadow">
                <CardHeader className="border-0">
                <Loading loading={isloading}/>
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Transactions</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {/* <th scope="col">ID</th> */}
                      <th scope="col">Date</th>
                      <th scope="col" >Ticket ID</th>
    
                      <th scope="col">Category</th>
                      <th scope="col">Amount</th>

                      <th scope="col">Payment Staus</th>
                      <th scope="col">Phone</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                   
                    {transactions.length === 0 ? null :
                    
                    transactions.map((item)=>{
                   return   <tr key={item.ticket_id}>
                      <th scope="row">{item.trans_date}</th>
                      <td scope="row">{item.ticket_id}</td>
                    <td className='text-center'>{item.cat_name}</td>
                    <td className='text-center'>{item.price}</td>

                    <td className='text-center' >{item.payment_status === 'completed' ?
                  <Badge color="" className="badge-dot mr-4">
                  <i className="bg-success" />
                 {item.payment_status }
                </Badge>
                
                :  <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
               {item.payment_status }
              </Badge>
                }</td>
                    <td className='text-center'>{item.phonenumber}</td>
                   
                    
                    </tr>
                    })
                    
                    }
                  
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
        </>
    )
}
