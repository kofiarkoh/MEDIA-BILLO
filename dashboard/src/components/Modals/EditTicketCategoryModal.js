import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap'
import {updateTicketCategory} from '../../api calls/addticketcategory'
import Loading from '../Loaders/Loading'
import swal from 'sweetalert';

export default function EditTicketCategoryModal(props) {
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [isSoldOut , setSoldOut] = useState('')
    const [isloading,setLoading] = useState(false)
    const submitData = async()=>{
        let cat_name = name === '' ? props.item.category_name : name
        let cat_price = price === '' ? props.item.price : price
        let sold_out = isSoldOut === '' ? props.item.is_sold_out : isSoldOut
        if(cat_price <= 0){
        
            swal('please enter a valid price','','error')
            return
        }
        setLoading(true)
        var res = await updateTicketCategory(props.item.category_id,cat_name,cat_price,sold_out)
        if(res.resp_code === 200) {
            console.log(res.message)
            props.refreshdata()
            props.close(false)
            swal(res.message,'','success')
        }else{
           
            swal(res.message,'','error')
        }
        setLoading(false)
        console.log(cat_name,cat_price,sold_out)
    }
    return (
       <Modal isOpen={props.open}>
           <ModalHeader>Edit <hr/>
            <Loading loading={isloading}/>
           </ModalHeader>
           <ModalBody>
              <Form>
                  <FormGroup>
                      <Label for='name'>Name</Label>
                      <Input value={props.item.category_name} onChange={ (e)=>setName(e.target.value)}  type='text' name='name'/>

                  </FormGroup>
                  <FormGroup>
                      <Label>Price</Label>
                      <Input value={price === '' ? parseFloat(props.item.price) : price     } onChange={(e)=>setPrice(e.target.value)} type='number'/>
                      
                  </FormGroup>
                  <FormGroup>
                      <Label>Sold Out?</Label>
                      <Input value={isSoldOut === '' ? props.item.is_sold_out : isSoldOut} onChange={(e)=>setSoldOut(e.target.value)} type='select'>
                          <option value='true'>Yes</option>
                          <option value='false'>No</option>
                      </Input>
                  </FormGroup>
              </Form>
           </ModalBody>
           <ModalFooter>
               <Button onClick={()=>props.close(false)}>Close</Button>
               <Button disabled={isloading} onClick={()=>submitData()}>Save</Button>
           </ModalFooter>
       </Modal>
    )
}
