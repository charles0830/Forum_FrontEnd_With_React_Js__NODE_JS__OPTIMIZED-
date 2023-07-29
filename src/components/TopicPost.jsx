import React, { Component,Fragment } from 'react'
import { Link,Redirect,useParams, withRouter } from 'react-router-dom'
import axios from 'axios';


export class TopicPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            topicpost : null,
            opacity: 0,
            isInitialMount: true
        }

    }

    alltopicrelated=()=>{
        if(!this.state.topicpost){
            return  <div className='container-fluid d-flex justify-content-center'><p className='mx-auto'>No Post On This Topic Yet... </p></div>
        }
        if(this.state.topicpost.length>1){
            return  this.state.topicpost.map((eachpost)=>{
                return  <div className="col eachpostr" key={eachpost.slno}>
                <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                    <div className="col-md-3 p-0 colhimg" ><img className="procls" src={eachpost.image}></img></div>
                    <div className='col-md-6 colhpost' >
                        <p>{eachpost.author_email} &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At : {eachpost.creating_time} )<br></br><b>{eachpost.intro}</b><br></br>{eachpost.user_post.substring(0, 70)}&nbsp;...(See More)</p>
                        <p></p>
                    </div>
                
                    <div onClick={(e)=>{this.doreport(e,eachpost.slno)}} className="col-md-3 colhreprlikcom whitefont" >
                        <i className="fa-solid fa-flag icncol"></i>Report
                    </div>
                
                
                    <div className="col-md-3 colclikpost darkfont2" ><Link onClick={(e)=>{this.addView(e,eachpost.slno)}} className='linkdec' to={'/seepost/'+eachpost.slno}><p>Details <i className="fa-solid fa-circle-info"></i></p></Link></div>
                
                
                    <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : {eachpost.viewed>100000 ? Math.floor(eachpost.viewed/100000) +'M': eachpost.viewed>1000 ? Math.floor(eachpost.viewed/1000) +'K' : eachpost.viewed}</p></div>
            
                
                    <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> {eachpost.like_amount>100000 ? Math.floor(eachpost.like_amount/100000) +'M': eachpost.like_amount>1000 ? Math.floor(eachpost.like_amount/1000) +'K' : eachpost.like_amount}</p></div>
                
                
                    <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> {eachpost.dislike_amount>100000 ? Math.floor(eachpost.dislike_amount/100000) +'M': eachpost.dislike_amount>1000 ? Math.floor(eachpost.dislike_amount/1000) +'K' : eachpost.dislike_amount}</p></div>
                
            
            
                </div>

        
        
            </div>


            })
        }else if(this.state.topicpost){
            if(this.state.topicpost.slno>1){
            return  <div className="col eachpostr">
            <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                <div className="col-md-3 p-0 colhimg" ><img className="procls" src={this.state.topicpost.image}></img></div>
                <div className='col-md-6 colhpost' >
                    <p>{this.state.topicpost.author_email} &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At : {this.state.topicpost.creating_time}  )<br></br><b>{this.state.topicpost.intro}</b><br></br>{this.state.topicpost.user_post.substring(0, 70)}&nbsp;...(See More)</p>
                    <p></p>
                </div>
            
                <div onClick={(e)=>{this.doreport(e,this.state.topicpost.slno)}} className="col-md-3 colhreprlikcom whitefont" >
                    <i className="fa-solid fa-flag icncol"></i>Report
                </div>
            
            
                <div className="col-md-3 colclikpost darkfont2" ><Link onClick={(e)=>{this.addView(e,this.state.topicpost.slno)}} className='linkdec' to={'/seepost/'+this.state.topicpost.slno}><p>Details <i className="fa-solid fa-circle-info"></i></p></Link></div>
            
            
                <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : {this.state.topicpost.viewed>100000 ? Math.floor(this.state.topicpost.viewed/100000) +'M': this.state.topicpost.viewed>1000 ? Math.floor(this.state.topicpost.viewed/1000) +'K' : this.state.topicpost.viewed}</p></div>
        
            
                <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> {this.state.topicpost.like_amount>100000 ? Math.floor(this.state.topicpost.like_amount/100000) +'M': this.state.topicpost.like_amount>1000 ? Math.floor(this.state.topicpost.like_amount/1000) +'K' : this.state.topicpost.like_amount}</p></div>
            
            
                <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> {this.state.topicpost.dislike_amount>100000 ? Math.floor(this.state.topicpost.dislike_amount/100000) +'M': this.state.topicpost.dislike_amount>1000 ? Math.floor(this.state.topicpost.dislike_amount/1000) +'K' : this.state.topicpost.dislike_amount}</p></div>
            
        
        
            </div>

    
    
        </div>
            }

        }else{
            return  <div className='container-fluid d-flex justify-content-center'><p className='mx-auto nopost'>No Post On This Topic Yet ... </p></div>
        }
    }
    addView=(e,postno)=>{
        axios.get(`/ientered/${this.props.sln}/${postno}`,{
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            console.log(response.data)
        }).catch(error=>{console.log(error)})
    }

    doreport=(e,postno)=>{
        axios.get(`/report/${this.props.sln}/${postno}`,{
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status === 200){
                if(response.data.message == 'Report Successful.' || response.data.message == 'You May Have Already Reported It.' || response.data.message == 'Post Might Have Been Already Deleted.'){
                    this.setState({
                        reportstts : true,
                        reportmsg : response.data.message
                    })
                    setTimeout(()=>{
                        this.setState({
                            reportstts : false,
                            reportmsg : ''
                        })
                    },1500)
                }
                console.log(response.data)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    donereport=()=>{
        if(this.state.reportstts==true){
                return  <div class="alert alert-primary d-flex align-items-center alboxpos" role="alert">
            
                    <div>
                        {this.state.reportmsg}
                    </div>
                </div>
        }
    }


    componentDidMount(){
        const {posttype} = this.props.match.params;
       

    
            axios.get(`/topic/${posttype}`,{
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                this.setState({topicpost : response.data.topic_post})
            }).catch(error=>{
                console.log(error)
            })
            
            
           
            this.startOpacityChange();


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

     
    componentDidUpdate(prevProps, prevState) {
        const { posttype } = this.props.match.params;
        const prevPostType = prevProps.match.params.posttype;
    
        if (prevProps.componentId !== this.props.componentId && !this.state.isInitialMount) {
            this.startOpacityChange();
          }
  
        if (this.state.isInitialMount) {
              
              this.setState({ isInitialMount: false });
            }
        if (posttype !== prevPostType) {
            axios.get(`/topic/${posttype}`,{
                headers: {
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                this.setState({topicpost : response.data.topic_post})
            }).catch(error=>{
                console.log(error)
            })
        }
      }

    render() {
        const { opacity } = this.state;
        return (
            <Fragment>
                <div className="col homefirst mx-auto propostmarg bordvanish profposttopmarg" style={{opacity}}>
                    <div className="row row-cols-1 m-0 randpost">
                        
                            {this.alltopicrelated()}

                            
                            {/**New post */}
                        

                    </div>
                </div>    
                {this.donereport()}
            </Fragment>
        )
    }
}

export default withRouter(TopicPost)
