import React, { useState, useEffect } from 'react';
import {
    Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup,

    Input, Label, Row
} from 'reactstrap';
import PageHeader from '../components/Headers/PageHeader';
import { getevents } from '../api calls/getevents';
import { createTicketEvent } from '../api calls/addticketevent';
import Loading from '../components/Loaders/Loading';
import swal from 'sweetalert'  
import { sweetAlertMsg } from 'votingapis/api_const';

export default function AddTicketEvent() {
    const [eventlist,setEventList] = useState([])
    const [selectedEvent,setSelectedEvent] = useState('')
    const [mutliTicket,setMultiTiket] = useState('none')
    const [price,setPrice] = useState(0)
    const [isloading,setLoading] = useState(false)
    const fetchEvents = async ()=>{
        setLoading(true)
        var res = await getevents()
        if (res.resp_code === 200) {
          
            setEventList(res.message)
        }else{
            sweetAlertMsg(res.message,'error')
        }
       
        setLoading(false)
    }
    useEffect(()=>{
        fetchEvents()
    },[])
    const submitData = async ()=>{
        if(selectedEvent === ''){
            console.log('Please select an event')
            swal('Please select an event','','error')
            return
        }
        if(mutliTicket === 'none'){
            console.log('Please choose ticket type')
            swal('Please choose ticket type','','error')
            return
        }
        if(mutliTicket === 'false' && price <= 0) {
            console.log('please enter a valid ticket price')
            swal('please enter a valid ticket price','','error')
            return
        }
        if(mutliTicket === 'true') {
           setPrice(0)
        }
        setLoading(true)
        var res = await createTicketEvent(selectedEvent,mutliTicket,price)
        if(res.resp_code === 200){
            swal('success',res.message,'success')
        }
        else{
            swal('error',res.message,'error')
        }
        setLoading(false)
        console.log('submit data')
    }
    return (
       <>
       <PageHeader/>

       <Container className='mt--7' fluid>
       <Row className="mt-5">
            <Col className="mb-5 mb-xl-0 col-xl-12"  >
                <Card className='shadow'>
                  <CardHeader>
                  <h3 className="mb-0">Add ticketing event</h3>
                  <Loading loading={isloading}/>
                  </CardHeader>

                  <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                <FormGroup className='mb-3'>
                    <Label for='eventlist'>Choose Event</Label>
                    <Input value={selectedEvent}  onChange={(e)=>setSelectedEvent(e.target.value)}  className="input-group-alternative" type='select' name='select' id='eventlist'>
                  <option value=''>Choose</option>
                  {
                      eventlist.length === 0 ? null :
                      eventlist.map((item)=>{
                      return <option value={item.event_name} key={item.id}>{item.event_name}</option>
                      })
                  }
                
                    </Input>
                </FormGroup>

                <FormGroup className="mb-3">
                 
                   
                    <Label for='multi'>Will it have different type of tickets?</Label>
                    <Input value={mutliTicket} onChange={(e)=>setMultiTiket(e.target.value)} className="input-group-alternative" type='select' name='selects' id='multi'>
                    <option value='none'>choose</option>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                   
                    </Input>              
                      
                </FormGroup>
                {
                    mutliTicket === 'true' |  mutliTicket ==='none' ? null : 
                    <FormGroup className="mb-3">
                    <Label for='multi'>Price of ticket</Label>
                      <Input   className="input-group-alternative" type='number' name='selects' id='multi' value={price} onChange={(e)=>setPrice(e.target.value)}>       
                      </Input>               
                  </FormGroup>
                }
            
              
                <div className="text-center">
                  <Button disabled={isloading} className="my-4" color="primary" type="button" onClick={()=>submitData()}>
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
