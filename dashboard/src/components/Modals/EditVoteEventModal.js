import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { editEvent } from 'votingapis/addvoteevent'
import Loading from '../Loaders/Loading'
import { sweetAlertMsg } from 'votingapis/api_const'
export default function EditVoteEventModal(props) {
    const [name,setName] = useState('')
    const [photo,setPhoto] = useState(null)
    
    const [isloading,setLoading] = useState(false)
    const submitData = async()=>{
       
        setLoading(true)
        let send_name = name === '' ? props.name : name
        var res = editEvent(send_name,props.name,photo)
        res.then((res)=>{
            console.clear()
            console.log(res)
            setLoading(false)
            if(res.resp_code === 200) {
                sweetAlertMsg(res.message,'success')
                props.close(false)
                props.refresh() //refreshes the contestant list    
            }else{
                sweetAlertMsg(res.message,'error')
                setLoading(false)
            }
        }).catch((e)=>{
            setLoading(false)
            sweetAlertMsg(3,'error')
            alert(e)
        })
       
       // console.log(cat_name,cat_price,sold_out)
    }
    return (
       <Modal isOpen={props.open}>
           <ModalHeader>Edit <br/>
          
            <Loading loading={isloading}/>
           </ModalHeader>
           <ModalBody>
              <Form>
                  <FormGroup>
                      <Label for='name'>Name</Label>
                      <Input onChange={(e)=>setName(e.target.value)} value={name === '' ? props.name : name} type='text' name='name'/>

                  </FormGroup>
                 
                  <FormGroup>
                      <Label>Photo</Label>
                      <Input
                      type="file"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </FormGroup>
                 
              </Form>
           </ModalBody>
           <ModalFooter>
               <Button  disabled={isloading}  onClick={()=>props.close(false)}>Close</Button>
               <Button disabled={isloading} onClick={()=>submitData()}>Save</Button>
           </ModalFooter>
       </Modal>
    )
}
