import React, { Component,Fragment } from 'react'
import axios from 'axios'

export class TotallyForgot extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            resdata : '',
            opacity: 0,
            isInitialMount: true
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
    aftersubmit=()=>{
        if(this.state.resdata){
            return  <p>{this.state.resdata}</p>
        }else{
            return <p>Make Sure To Put Your Valid Email Address. A New Password Will Be Send There. FYI : It May Need 10-15 Seconds Or A Minute.</p>
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
    formsubmited=(e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('mail', this.state.email)
        axios.post('/forgotpass',formdata,{
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            this.setState({resdata : response.data.message})
            if(response.status === 200){
                if(response.data.messasge == 'Successful Check Your Mail For New Password. After Login With That You Can Change Password As You Want !'){
                    this.setState({
                        email : ''
                    })
                    document.getElementById("email").value = '';
                }
            }
        }).catch(error=>{
            console.log(error.response.data)
        })
    }
    render() {
        const { opacity } = this.state;
        return (
            <Fragment>
                <div className="container-fluid d-flex justify-content-center" style={{opacity}}>
                    <div className="forgtpass2">
                        <form onSubmit={e=>{this.formsubmited(e)}}>
                            <div className='row row-cols-1 row-cols-md-2 d-flex justify-content-center'>
                                <div className="col col-md-10 p-3 mb-5 rulebox d-flex justify-content-center flex-row">
                                    {this.aftersubmit()}
                                </div>
                                <div className='col col-md-10 mb-2'><input id="email" onChange={(e)=>{this.setState({email : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Password" aria-label=".form-control-sm example" /></div>
                                <div className="col-3 d-flex justify-content-center"><button type="submit" className="btn btn-sm btn-outline-primary btnsubdes">Change Password</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default TotallyForgot
