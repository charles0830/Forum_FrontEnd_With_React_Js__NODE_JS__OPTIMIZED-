import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export class Logout extends Component {
    constructor(props){
        super(props);
        this.state = {
            serno : '',
            resdata : '',
            opacity: 0,
            isInitialMount: true
        }
        
    }
    componentDidMount(){
        if(!this.props.serial){
            window.location.href = "/";
        }
        this.startOpacityChange();
        this.setState({serno : localStorage.getItem('serial')});
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

    logouttext = ()=>{
        if(this.state.resdata == ''){
            return  <div>
            <p className='mx-auto'>You Sure Want To Log Out ?</p>
            <p className='mx-auto'>All Unsaved Data Will Be Gone !!!</p>
        </div> 
                
                
        }else if(this.state.resdata == 'User Does Not Exist !!! '){
            return  <div>
                        <p className='mx-auto'>{this.state.resdata}</p>
                    
                    </div>
        }else if(this.state.resdata == 'You Are Not Even Logged In !!!'){
            return <div>
                <p className='mx-auto'>{this.state.resdata}</p>
            </div>
        }
    }

    redles=()=>{


        setTimeout(()=>{window.location.reload()},500);
        window.location.href = "/";
        
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

    leslogout=()=>{
        
        
            const headstat = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            const rapi = `/logout/${localStorage.getItem('serial')}`;
            axios.get(rapi,headstat)
                .then(response => {
                    if (response.status === 204) {
                    // Handle the 204 response
                    
                        localStorage.clear();
                        {this.redles()}
        

                    } else if (response.status === 200) {
                    // Handle the 200 response
                    this.setState({resdata : response.data.message});
                    
                    if(response.data.message == 'Logout Successful'){
                
                        localStorage.clear();
                        {this.redles()}
        
                        return <Redirect to="/logs" />
                            
                        }

                    
                    }
                })
                .catch(error => {
                    // Handle any errors that occur during the request
                    console.log(error);
                });
                
            
            
            
            

        
                
            
        
        
    }
    render() {
        const { opacity } = this.state;
        return (
            <Fragment>
                <div className="container-fluid bg-red regform" style={{opacity}}>
                        
                    
                    <div className='row row-cols-1 d-flex justify-content-center'>

                        
                            <div className='row row-cols-1 d-flex justify-content-center m-0 p-0'>
                                <div className="col-12 p-3 mb-2 rulebox d-flex justify-content-center flex-row">
                                    {this.logouttext()}    
                                </div>
                                
                                <div className="col d-flex justify-content-center"><button onClick={this.leslogout} className="btn btn-sm btn-outline-primary btnsubdes">Logout</button></div>
                            </div>
                        
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Logout
