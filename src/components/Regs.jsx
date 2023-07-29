import React, { Component, Fragment } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';
export class Regs extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            pass : '',
            cpass : '',
            countrys : '',
            ages : 0,
            genders : '',
            images : null,
            resdata : null,
            opacity: 0,
            isInitialMount: true

        }
        
    }
    aftersuccess= ()=>{
        this.setState({
            email : '',
            pass : '',
            cpass : '',
            countrys : '',
            ages : 0,
            genders : '',
            images : null,
            resdata : null
        });
        document.getElementById("mail").value = '';
        document.getElementById("pass").value = '';
        document.getElementById("cpass").value = '';
        document.getElementById("country").value = '';
        document.getElementById("age").value = '';
        document.getElementById("gender").value = '';
        document.getElementById("formFileSm").value = '';
    }

    startOpacityChange() {
        // Set isInitialMount to false when the opacity change starts
        this.setState({ opacity: 0, isInitialMount: false });
    
        const intervalId = setInterval(() => {
          this.setState((prevState) => ({
            opacity: Math.min(prevState.opacity + 0.065, 1),
          }));
        }, 100);
    
        setTimeout(() => clearInterval(intervalId), 1400); // Adjust the duration as needed
      }
    respdatafunc= ()=>{
        if(this.state.resdata){
            if(this.state.resdata == "Registration Successful Please Login With Your Credential For First Time."){
                document.getElementById("mail").value = '';
                document.getElementById("pass").value = '';
                document.getElementById("cpass").value = '';
                document.getElementById("country").value = '';
                document.getElementById("age").value = '';
                document.getElementById("gender").value = '';
                document.getElementById("formFileSm").value = '';
                return (
                    <div>
                        
                        <li><p>{this.state.resdata}</p></li>
                    
                    </div> 
                )
                this.setState({
                    email : '',
                    pass : '',
                    cpass : '',
                    countrys : '',
                    ages : 0,
                    genders : '',
                    images : null,
                    resdata : null
                });
            }else if(this.state.resdata == 'Sorry Email Already Exist ... You Can Not Use Same Email Twice.'){
                return (
                    <div>
                    <li><p>{this.state.resdata}</p></li>
                    
                    </div> 
                )
            }else{
                return <div>
                    <li><p>Make Sure To Input Valid Email And Password According To Server Rules. Also Do Not Keep Any Input Field Empty As We Check Your All Data. </p></li>
                    
                </div> 
            }
        }else{
            return (
                <div>
                    <li>Your Password Must Contain 6-50 Digits Letters,Numbers or @ ! *</li>
                    <li>Country Must Not Contain Letter.</li>
                    <li>Age Must Be Valid Number & People Under 7 or Above 90 Not Allowed.</li>
                    <li>Image Must Be Jpg or Jpeg & Smaller Than 1MB.</li>
                </div>      
            )
        }
    }

    async componentDidMount(){
        this.startOpacityChange();
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if componentId prop has changed and it's not the initial mount
        if (prevProps.componentId !== this.props.componentId && !this.state.isInitialMount) {
          this.startOpacityChange();
        }

        if (this.state.isInitialMount) {
            
            this.setState({ isInitialMount: false });
          }
      }
    formsubmited = (e)=>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('pass', this.state.pass);
        formData.append('cpass', this.state.cpass);
        formData.append('countrys', this.state.countrys);
        formData.append('ages', this.state.ages);
        formData.append('genders', this.state.genders);
        formData.append('images', this.state.images);

        const details = {
            'headers' : {
                
                'Content-Type' : 'multipart/form-data'
                
                },
        }
        
        
        axios.post('/regs', formData, details)
        .then(response => {
            // Handle the response data
            
            this.setState({resdata : response.data.message})
        })
        .catch(error => {
            // Handle the error
            console.log(error);
        });
            
            
        
    }
    
    render() {
        const { opacity } = this.state;
        return (
            <Fragment>
                <div className="container-fluid bg-red regform" style={{opacity}}>
                    
                
                    <div className='row row-cols-1 row-cols-md-2 d-flex justify-content-center'>

                        <form method="POST" onSubmit={e=>{this.formsubmited(e)}} encType='multipart/form-data'>
                            <div className='row row-cols-1 row-cols-md-2 d-flex justify-content-center'>
                                <div className="col col-md-10 p-3 mb-5 rulebox d-flex justify-content-center flex-column">
                                    {this.respdatafunc()}
                                </div>
                                <div className='col col-md-10 mb-2'><input id="mail" onChange={(e)=>{this.setState({email : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Email@" aria-label=".form-control-sm example" /></div>
                                <div className='col col-md-5 mb-2'><input id="pass" onChange={(e)=>{this.setState({pass : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Password" aria-label=".form-control-sm example" /></div>
                                <div className='col col-md-5 mb-2'><input id="cpass" onChange={(e)=>{this.setState({cpass : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Confirm Password" aria-label=".form-control-sm example" /></div>
                                <div className='col col-md-5 mb-2'><input id="country" onChange={(e)=>{this.setState({countrys : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Country" aria-label=".form-control-sm example" /></div>
                                <div className='col col-md-5 mb-2'><input id="age" onChange={(e)=>{this.setState({ages : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Age" aria-label=".form-control-sm example" /></div>
                                <div className='col col-md-5 mb-2'><select id="gender" onChange={(e)=>{this.setState({genders : e.target.value})}} className="form-select regender" aria-label="select example">
                                <option selected disabled>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">others</option>
                                </select></div>
                                <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({images : e.target.files[0]})}} className="form-control form-control-sm regender" id="formFileSm" placeholder='Profile Image' type="file" /></div>
                                <div className="col-3 d-flex justify-content-center"><button type="submit" className="btn btn-sm btn-outline-primary btnsubdes">Submit</button></div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Regs
