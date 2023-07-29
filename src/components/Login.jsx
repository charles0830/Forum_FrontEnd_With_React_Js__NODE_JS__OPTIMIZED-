import React, { Component, Fragment } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link
    } from "react-router-dom";
import Cookies from 'js-cookie';

export class Login extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            pass : '',
            resdata : '',
            opacity: 0,
            isInitialMount: true
        }
    }

    respdatafunc= ()=>{
        if(this.state.resdata){
            if(this.state.resdata.message == "Login Successful"){
                
                
                localStorage.setItem('token',this.state.resdata.token)
                localStorage.setItem('email',this.state.resdata.useremail)
                localStorage.setItem('image',this.state.resdata.image)
                localStorage.setItem('serial',this.state.resdata.usersl)
                localStorage.setItem('logged',true)


                setTimeout(()=>{window.location.reload()},500)
                return <Redirect to=""></Redirect>
                
            }else if(this.state.resdata.message == 'Sorry Password Does Not Match ... Make Sure To Insert Valid Password'){
                return (
                    <div>
                    <li><p>{this.state.resdata.message}</p></li>
                    
                    </div> 
                )
            }else if(this.state.resdata.message == 'Sorry You Are Already Logged In ...'){
                return <div>
                    <li><p>{this.state.resdata.message}</p></li>
                    
                </div> 
            }else if(this.state.resdata.message == 'Sorry Email Do Not Exist ... Make Sure To Insert Valid User Email.'){
                return <div>
                    <li><p>{this.state.resdata.message}</p></li>
                    
                </div> 
            }else if(this.state.resdata.message == 'Validation failed'){
                return <div>
                    <li><p>{this.state.resdata.message}</p></li>
                    
                </div> 
            }
        }else{
            return (
                <div>
                    <li>Your Password Must Be Valid and Not Empty.</li>
                    <li>Your Email Must Be valid and Not Empty</li>
                    
                </div>      
            )
        }
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

    formsubmited= (e) => {
        e.preventDefault();
        const headval = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const formData = new FormData();
        formData.append('email',this.state.email);
        formData.append('password',this.state.pass);

        axios.post('/login', formData, headval)
        .then(response => {
            // Handle the response data
            console.log(response.data);
            this.setState({resdata : response.data})
        })
        .catch(error => {
            // Handle the error
            console.log(error);
        });

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

    render() {
        const { opacity } = this.state;
        return (
            <Fragment>
                <div className="container-fluid bg-red regform" style={{opacity}}>
                    
                
                    <div className='row row-cols-1 row-cols-md-2 d-flex justify-content-center'>

                        <form method="POST" onSubmit={e=>{this.formsubmited(e)}} encType='multipart/form-data'>
                            <div className='row row-cols-1 row-cols-md-2 d-flex justify-content-center'>
                                <div className="col col-md-10 p-3 mb-5 rulebox d-flex justify-content-center flex-row">
                                    {this.respdatafunc()}
                                </div>
                                <div className='col col-md-10 mb-2'><input onChange={(e)=>{this.setState({email : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Email@" aria-label=".form-control-sm example" /></div>
                                <div className='col col-md-10 mb-2'><input onChange={(e)=>{this.setState({pass : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Password" aria-label=".form-control-sm example" /></div>


                                <div className="col col-md-3 d-flex justify-content-center mb-2"><button type="submit" className="btn btn-sm btn-outline-primary btnsubdes">Login</button></div>
                                <div className='col col-md-10 mb-2 d-flex justify-content-center forgtpass flex-column flex-md-row'>Forgot Password ? Please &nbsp; <Link to="/forgottotally">Click Here</Link></div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login
