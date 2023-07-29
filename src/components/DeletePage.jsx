import React, { Component,Fragment } from 'react'
import axios from 'axios';
export class DeletePage extends Component {
    constructor(){
        super();
        this.state = {
            resdata : '',
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
    aftersubmit= ()=>{
        if(this.state.resdata){
            return <p>{this.state.resdata}</p>
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
    deleteid = (e)=>{
        e.preventDefault();
        axios.get('/delete', {
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status === 200){
                this.setState({resdata : response.data.message});
                if(response.data.message == 'Account Deleted'){
                    window.location.href = '/';
                    setTimeout(()=>{window.location.reload();},500)
                    
                }
            }
        }).catch(error=>{console.log(error)})
    }
    async componentDidMount(){
        this.startOpacityChange();
    }
    render() {
        const { opacity } = this.state;
        return (
            <Fragment>
                <div className="delpage" style={{opacity}}>
                    <div className='row row-cols-1 row-cols-md-2 d-flex justify-content-center'>
                    <div className="col col-md-10 p-3 mb-3 rulebox d-flex justify-content-center flex-row text-center">
                    <p className="mx-auto">You Sure Want To Delete The Id ??? Once Deleted No Coming Back. After Successful Account Deletion You Will Be Redirected To Home Page. {this.aftersubmit()}</p>
                    </div>
                   

                    <div className="col-3 d-flex justify-content-center"><button onClick={e=>{this.deleteid(e)}} type="button" className="btn btn-sm btn-outline-primary btnsubdes">DELETE !</button></div>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

export default DeletePage
