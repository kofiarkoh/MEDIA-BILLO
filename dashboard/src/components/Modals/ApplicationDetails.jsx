import { editApplicant } from 'api calls/getApplications'
import React, { useState } from 'react'
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { sweetAlertMsg } from 'votingapis/api_const'
import '../../Applications/applications_styles.css'
import Loading from '../Loaders/Loading'


const statuslist = ['Pending', 'Approved', 'Failed']
export default function ApplicationDetails(props) {

    const [isloading, setLoading] = useState(false)


    const submitData = async (status) => {
        // console.log(val,props.applicant.id)
        setLoading(true)

        var res = editApplicant(props.applicant.id, status)
        res.then((res) => {
            console.clear()
            console.log(res)
            setLoading(false)
            if (res.resp_code === 200) {
                sweetAlertMsg('Success', 'success')
                props.close(false)
                props.refresh(res.message) //refreshes the contestant list    
            } else {
                sweetAlertMsg(res.message, 'error')
                setLoading(false)
            }
        }).catch((e) => {
            setLoading(false)
            sweetAlertMsg('error', 'error')

        })

        // console.log(cat_name,cat_price,sold_out)
    }
    const { project_name, applicant_name, email, phone, location, height, age, status } = props.applicant
    return (
        <Modal isOpen={props.open} className='dsa'>
            <ModalHeader> <br />

                <Loading loading={isloading} />
            </ModalHeader>
            <ModalBody>
                <div className='applicant-photo'>
                    <i className="application-icon fas fa-user" style={{ fontSize: '100px' }}></i>

                </div>
                <div className="container">
                    <div className="row applicant-data">
                        <div className='col-md-1 d'>
                            <i className="application-icon fas fa-user"></i>
                        </div>
                        <div className='col-md-10 f'>
                            {applicant_name}
                        </div>
                    </div>
                    <div className="row applicant-data">
                        <div className='col-md-1 d'>
                            <i className="application-icon fas fa-calendar-check"></i>
                        </div>
                        <div className='col-md-10 f'>
                            {project_name}
                        </div>
                    </div>
                    <div className="row applicant-data">
                        <div className='col-md-1 d'>
                            <i className="application-icon fas fa-envelope"></i>
                        </div>
                        <div className='col-md-10 f'>
                            {email}
                        </div>
                    </div>
                    <div className="row applicant-data">
                        <div className='col-md-1 d'>
                            <i className="application-icon fas fa-phone"></i>
                        </div>
                        <div className='col-md-10 f'>
                            {phone}
                        </div>
                    </div>
                    <div className="row applicant-data">
                        <div className='col-md-1 d'>
                            <i className="application-icon fas fa-map-marker-alt"></i>
                        </div>
                        <div className='col-md-10 f'>
                            {location}
                        </div>
                    </div>
                    <div className="row applicant-data">
                        <div className='col-md-1 d'>
                            <i className="application-icon fas fa-arrows-alt-v"></i>
                        </div>
                        <div className='col-md-10 f'>
                            {height} ft.
                        </div>
                    </div>
                    <div className="row applicant-data">
                        <div className='col-md-1 d'>
                            <i className="application-icon fas fa-user-clock"></i>
                        </div>
                        <div className='col-md-10 f'>
                            {age} years
                        </div>
                    </div>
                </div>



                <p></p>

                <FormGroup className="mb-3">


                    <Label for='multi'>Status</Label>
                    <Input className="input-group-alternative" type='select' value={status} onChange={(e) => submitData(e.target.value)} name='selects' id='multi'>
                        <option value='none'>Choose</option>
                        {

                            statuslist.map((item, i) => {
                                return <option value={item} key={i}>{item}</option>
                            })
                        }
                    </Input>

                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button disabled={isloading} onClick={() => props.close(false)}>Close</Button>

            </ModalFooter>
        </Modal>
    )
}
