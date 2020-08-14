import React,{useState} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { updateTicketEvent } from '../../api calls/addticketevent'

export default function EditSingleTicketEventModal(props) {
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [multiTicket,setMultiTicket] = useState('')
    const submitData = async()=>{
        let event_name = name === '' ? props.item.event_name : name
        let event_price = price === '' ? props.item.price : price
        let event_multi_ticket = multiTicket === '' ? props.item.multi_ticket : multiTicket
        if(event_price <= 0){
            alert('please enter a valid price');
            return
        }
        var res = await updateTicketEvent(props.item.event_id,event_name,event_price,event_multi_ticket)

        if(res.resp_code === 200) {
            console.log(res.message)
        }else{
            alert(res.message)
        }

       // console.log(cat_name,cat_price,sold_out)
    }
    return (
       <Modal isOpen={props.open}>
           <ModalHeader>Edit</ModalHeader>
           <ModalBody>
              <Form>
                  <FormGroup>
                      <Label for='name'>Name</Label>
                      <Input onChange={(e)=>setName(e.target.value)} value={props.item.event_name} type='text' name='name'/>

                  </FormGroup>
                  <FormGroup>
                      <Label>Price</Label>
                      <Input value={ price === '' ? props.item.price : price} onChange={(e)=>setPrice(e.target.value)} type='number'/>
                      
                  </FormGroup>
                  <FormGroup>
                      <Label>Will this event have multiple ticket categories?</Label>
                      <Input value={props.item.multi_ticket} onChange={(e)=>setMultiTicket(e.target.value)} type='select'>
                          <option value='true'>Yes</option>
                          <option value='false'>No</option>
                      </Input>
                  </FormGroup>
                 
              </Form>
           </ModalBody>
           <ModalFooter>
               <Button onClick={()=>props.close(false)}>Close</Button>
               <Button onClick={()=>submitData()}>Save</Button>
           </ModalFooter>
       </Modal>
    )
}
