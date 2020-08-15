import React, { useState, useEffect } from 'react';
import {
    Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup,
    Input, Label, Row, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import PageHeader from '../components/Headers/PageHeader';
import { getTicketEvents } from '../api calls/getevents';
import { createTicketCategory } from '../api calls/addticketcategory';
import { verifyTicket } from '../api calls/verifyticket';
import Loading from '../components/Loaders/Loading';
import swal from 'sweetalert'

export default function VerifyTicket() {

    const [ticketid,setTicketId] = useState("")
    const [isloading,setLoading] = useState(false)
  
    const submitData = async ()=>{
      setLoading(true)

      var res = await verifyTicket(`BILO${ticketid}T`)
      if(res.resp_code === 200){
          //console.log(res.message)
          swal('verification sucessfull',res.message.event_name,'success')
      }else{
          
          swal('verification failed',res.message,'error')
      }
      setLoading(false)
    }
    return (
       <>
       <PageHeader/>

       <Container className='mt--7' fluid>
       <Row className="mt-5">
            <Col className="mb-5 mb-xl-0 col-xl-12"  >
                <Card className='shadow'>
                  <CardHeader>
                  <h3 className="mb-0">TICKET VERIFICATION</h3>
                  <Loading loading={isloading} />
                  </CardHeader>

                  <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
            
               <FormGroup className="mb-3">
                 
               <Label for='multi'>Ticket ID</Label> 
                   <InputGroup className="input-group-alternative">
                  
         
                 <Input  className="input-group-alternative" value={ticketid} onChange={(e)=>setTicketId(e.target.value)} placeholder='eg: 543244' type='text' name='selects' id='multi'/>
              
                   </InputGroup>
               
                    </FormGroup>

            
                    <div className="text-center">
                  <Button 
                  disabled={isloading}
                  className="my-4" color="primary" type="button" onClick={()=>submitData()}>
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
    )
}
