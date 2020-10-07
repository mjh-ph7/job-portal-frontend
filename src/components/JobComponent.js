import React from 'react';
import axios from 'axios';

class JobComponent extends React.Component {

    constructor(){
        super()
        this.state = {
            jobs:[]
        }
    }


    componentDidMount(){
        this.getJobs();
    }

    componentDidUpdate(prevProps) {
        
        if ((prevProps.skills !== this.props.skills) || (prevProps.locationStr !== this.props.locationStr)) {
            this.getJobs();
        }
    }

    getJobs() {
        const USERS_REST_API_URL = 'http://localhost:8081/job-portal/search-jobs';
        console.log(this.props.locationStr)
        axios.get(USERS_REST_API_URL,{
            params: {
                skills: this.props.skills,
                location: this.props.locationStr,
            }    
            }).then((response) => {
                const jobs = response.data.jobs 
                this.setState({ 
                    isLoaded: false,    
                    jobs,
                })
            });
    }

    render () {

        return (
            <div>
                &nbsp;
                <h1 className = "text-center"> Jobs List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            
                            <td> Company </td>
                            <td> Job Title </td>
                            <td> Description </td>
                            <td> Skills </td>
                            <td> Location </td>
                            <td> Listed On </td>
                            <td> Applicants </td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.jobs.map(
                                (job,index) => 
                                <tr key = {index}>
                                     <td> {job.companyName}</td>
                                     <td> {job.jobTitle}</td>   
                                     <td> {job.description}</td>   
                                     <td> {job.skillKeyWords.join(", ")}</td>   
                                     <td> {job.location}</td>
                                     <td> {job.listDate}</td>
                                     <td> {job.applicantSize}</td>   
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </div>

        )
    }
}

export default JobComponent