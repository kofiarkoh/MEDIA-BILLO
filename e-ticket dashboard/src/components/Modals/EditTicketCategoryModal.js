import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import {updateTicketCategory} from '../../api calls/addticketcategory'
export default function EditTicketCategoryModal(props) {
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [isSoldOut , setSoldOut] = useState('')
   
    const submitData = async()=>{
        let cat_name = name === '' ? props.item.category_name : name
        let cat_price = price === '' ? props.item.price : price
        let sold_out = isSoldOut === '' ? props.item.is_sold_out : isSoldOut
        if(cat_price <= 0){
            alert('please enter a valid price');
            return
        }
        var res = await updateTicketCategory(props.item.category_id,cat_name,cat_price,sold_out)
        if(res.resp_code === 200) {
            console.log(res.message)
        }else{
            alert(res.message)
        }

        console.log(cat_name,cat_price,sold_out)
    }
    return (
       <Modal isOpen={props.open}>
           <ModalHeader>Edit</ModalHeader>
           <ModalBody>
              <Form>
                  <FormGroup>
                      <Label for='name'>Name</Label>
                      <Input value={props.item.category_name} onChange={ (e)=>setName(e.target.value)}  type='text' name='name'/>

                  </FormGroup>
                  <FormGroup>
                      <Label>Price</Label>
                      <Input value={parseFloat(props.item.price)} onChange={(e)=>setPrice(e.target.value)} type='number'/>
                      
                  </FormGroup>
                  <FormGroup>
                      <Label>Sold Out?</Label>
                      <Input value={props.item.is_sold_out} onChange={(e)=>setSoldOut(e.target.value)} type='select'>
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
