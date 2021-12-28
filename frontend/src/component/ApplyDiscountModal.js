import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'

const ApplyDiscountModal = (props)=> {
   
    const [code, setCode] = useState('')
    const [error, setError] = useState(true)
    const history = useHistory();

    const applyCode = ()=>{
        // alert(code)
        localStorage.setItem('code',code)

        window.location.reload();


    }

    const checkCode = ()=>{
        // alert(code)
    }
    return (
        <>
              <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                   Apply Discount Code
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form>
                  <Form.Group>
                    {/* <Form.Label>Postal Code</Form.Label> */}
                       <Row>
                           <Col>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter discount code'
                                    value={code}
                                    required
                                    onChange={(e) =>{
                                        setCode(e.target.value)
                                        setError(false)}}
                                    >
                                    </Form.Control>
                           </Col>
                           <Col>
                                    <Button disabled={error} onClick={checkCode}>Check Code</Button>
                           </Col>
                        </Row>
                  <br/>
                  
                  </Form.Group>
                </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={applyCode} disabled={error}>Apply</Button>
                </Modal.Footer>
                </Modal>

        </>
    )
}

export default ApplyDiscountModal
