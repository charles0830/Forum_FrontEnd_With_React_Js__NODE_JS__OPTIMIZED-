import React, { Component,Fragment } from 'react'
import axios from 'axios';
import { Link,Redirect,withRouter } from 'react-router-dom';


export class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            notify : [],
            opacity: 0,
            isInitialMount: true
        }

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
    rendernotify=()=>{
        if(this.state.notify.length>1){
            return this.state.notify.map((peritem)=>{
                return  <div className='col text-center coldesnotfy mb-3 d-flex justify-content-center align-items-center flex-column' key={peritem.slno}>{peritem.commenter_email} {peritem.reason} ... <Link to={'/seepost/'+peritem.post_slno}>View Post</Link></div>  
            });
        }else if(this.state.notify){
            if(this.state.notify.slno>0){
                return  <div className='col text-center coldesnotfy mb-3 d-flex justify-content-center align-items-center flex-column'>{this.state.notify.commenter_email} {this.state.notify.reason} ... <Link to={'/seepost/'+this.state.notify.post_slno}>View Post</Link></div>
            }else{
                return  <div className='col text-center coldesnotfy mb-3 d-flex justify-content-center align-items-center flex-column'>No New Notifications To Show ... Browse Posts Kindly.</div>
            }
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

    renderbtn = ()=>{
        if(this.state.notify){
            if(this.state.notify.length>1){
                return  <button onClick={(e)=>{this.deletenotif(e)}} type="button" className="btn btn-warning mb-2 bignotfy notbtnds">Clear All Notification</button>
            }else{
            
            }
        }
    }

    deletenotif = (e)=>{
        e.preventDefault();
        axios.get(`/delnotif/${this.props.sln}/${this.state.notify[0].slno}`,{
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status === 200){
                if(response.data.message == 'Success'){
                    this.setState({
                        notify : []
                    },()=>{
                        this.componentDidMount()
                    })

                    setTimeout(()=>{window.location.reload()},1000)
                }
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    async componentDidMount(){
        
            try{
                
                const response = await axios.get(`/notification/${localStorage.getItem('serial')}`);
                if(response.status === 200){
                    if(response.data.message == 'One New Notification.' || response.data.message == 'Too Many New Notification.'){
                        this.setState({
                            notify : response.data.notification
    
                        })
                        
                    }
                }
                this.startOpacityChange();
            
            }catch(error){
                console.log(error)
            }
        
        
        
    }

    render() {
        const { opacity } = this.state;
        return (
            <Fragment>
                <div className='notifmb d-flex justify-content-center m-0 p-0' style={{opacity}}>
                    <div className='row d-flex justify-content-center m-0 mt-5 p-5 flex-column'>
                        {this.renderbtn()}
                        {this.rendernotify()}
                        
                    </div>
                </div>
                
                
                
            </Fragment>
        )
    }
}

export default Notification
