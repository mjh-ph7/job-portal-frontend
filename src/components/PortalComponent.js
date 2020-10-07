import React from 'react';
import axios from 'axios';
import {Tabs, Tab, Form, Button, Col} from 'react-bootstrap';
import JobComponent from './JobComponent';

class PortalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            showComponent: false,
            skills:'',
            locationStr:'' 
        }
        this.handlePutSubmit = this.handlePutSubmit.bind(this);
        this.handleGetSubmit = this.handleGetSubmit.bind(this);
    }
    
    handlePutSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var formData = {companyName:data.get('companyName'),jobTitle:data.get('jobTitle'),
                        description:data.get('description'),skillKeyWords:data.get('skillKeyWords').split(/[^a-zA-Z0-9']+/),
                        location:data.get('location'),expiryTime:data.get('expiryTime')}
        
        var putData = []
        putData.push(formData)
        console.log(JSON.stringify(putData));

        axios.put('http://localhost:8081/job-portal/put-job', putData);
    }

    handleGetSubmit(event) {

        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('skills'))
        this.setState({
            skills:data.get('skills'),
            locationStr:data.get('locationSearch'),
            showComponent:true 
        })
        
    }

    render (){            
        return (
            <div>
                &emsp;
                <Tabs defaultActiveKey='none'>
                    <Tab eventKey="post-job" title="Post Jobs">
                    &nbsp;
                        <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
                            <Form onSubmit={this.handlePutSubmit}>
                                <Form.Row>
                                    <Col xs="2" >
                                        <Form.Control id='companyName' name='companyName' placeholder="Company Name" required/>
                                    </Col>
                                    <Col xs="2">
                                        <Form.Control id='jobTitle' name='jobTitle' placeholder="Job Title" required/>
                                    </Col>
                                    <Col xs="3">
                                        <Form.Control id='location' name='location' placeholder="Location" required/>
                                    </Col>
                                </Form.Row>
                                &nbsp;
                                <Form.Row controlId="descriptionTextarea">
                                    <Form.Label className='d-flex align-items-left' 
                                        style={{paddingLeft: "0.5%", paddingRight: "0.5%"}}>Job description</Form.Label>
                                    <Form.Control id='description' name='description' as="textarea" rows="10" required/>
                                </Form.Row>
                                &nbsp;
                                <Form.Row>
                                    <Col xs="3">
                                        <Form.Control id='skillKeyWords' name='skillKeyWords' placeholder="Skills" required/>
                                    </Col>
                                </Form.Row>
                                &nbsp;
                                <Form.Row>
                                    <Col xs="3">
                                        <Form.Label className='d-flex align-items-left'
                                            style={{paddingLeft: "0.5%", paddingRight: "0.5%"}}>Expiry time(in days)</Form.Label>
                                        <Form.Control id='expiryTime' name='expiryTime' defaultValue="60"/>
                                    </Col>
                                </Form.Row>
                                &nbsp;
                                <Form.Row>
                                    <Button type="submit">Submit form</Button>
                                </Form.Row>
                            </Form>
                        </div>  
                    </Tab>

                    <Tab eventKey="search-job" title="Search Jobs">
                        &nbsp;
                        <div style={{paddingLeft: "5%", paddingRight: "5%"}}>
                            <Form onSubmit={this.handleGetSubmit}>
                            <Form.Row>
                                <Col xs="2">
                                    <Form.Control id='skills' name='skills' placeholder="Enter skills" />
                                </Col>
                                <Col xs="2">
                                    <Form.Control id='locationSearch' name='locationSearch' placeholder="Enter location" required/>
                                </Col>
                                <Col xs="auto" className="my-1">
                                    <Button type="submit">Submit</Button>
                                </Col>
                            </Form.Row>
                            </Form>
                            {this.state.showComponent ? 
                                <JobComponent skills={this.state.skills} locationStr={this.state.locationStr}/> : null }
                        </div>
                    </Tab>   
                </Tabs>
            </div>

        )
    }
}

export default PortalComponent