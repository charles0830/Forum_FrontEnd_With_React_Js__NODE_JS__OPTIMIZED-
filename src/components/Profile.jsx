import React, { Component,Fragment } from 'react'
import homebg from '../assests/images/homebg.jpg'

import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            'mail': '',
            'country' : '',
            'age' : '',
            'gender' : '',
            'joined' : '',
            'imlink' : '',
            resdata : '',
            allpost : [],
            afterdelete : '',
            deletedone : false,
            opacity: 0,
            isInitialMount: true
        }
    }
    alertbox = ()=>{
        if(this.state.deletedone){
            return  <div class="alert alert-primary d-flex align-items-center alboxpos" role="alert">
            
            <div>
              Successfully Deleted The Post.
            </div>
          </div>
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
    delpost = (e,postno)=>{
        axios.get(`/mypostdelete/${this.props.sln}/${postno}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response3=>{
            if(response3.status === 200){
                this.setState({afterdelete : response3.data.message});
                if(response3.data.message == 'Post Deleted Successfully.'){
                    this.setState({
                        allpost : response3.data.updatedpost,
                        deletedone : true            
                    })
                setTimeout(()=>{this.setState({deletedone : false})},1500)

                }
            }
        }).catch(error=>{console.log(error)})
    }
    showpost = ()=>{
        if(!this.state.allpost){
            return  <div className='container-fluid d-flex justify-content-center'><p className='mx-auto'>You Have Not Posted Yet ... </p></div>
        }
        if(this.state.allpost.length>0){
            return this.state.allpost.map((perpost)=>{
                return  <div className="col eachpostr" key={perpost.slno}>
                <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                    <div className="col-md-3 p-0 colhimg" ><img className="procls" src={this.state.imlink}></img></div>
                    <div className='col-md-6 colhpost' >
                        <p><b>{this.state.mail}</b> &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At {perpost.creating_time} )<br></br><b>{perpost.intro}</b><br></br>{perpost.user_post.slice(0, 70)} &nbsp;...(See More)</p>
                        <p></p>
                    </div>
                    
                        <div onClick={(e)=>{this.delpost(e,perpost.slno)}} className="col-md-3 colhreprlikcom whitefont" >
                            <i className="fa-solid fa-flag icncol"></i>Delete
                        </div>
                        
                        
                        <div className="col-md-3 colclikpost darkfont2" ><Link className='linkdec' to={'/mypostsee/'+perpost.slno} ><p>Details <i className="fa-solid fa-circle-info"></i></p></Link></div>
                        
                        
                        <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : {perpost.viewed>100000 ? Math.floor(perpost.viewed/100000) +'M': perpost.viewed>1000 ? Math.floor(perpost.viewed/1000) +'K' : perpost.viewed}</p></div>
                       
                        
                        <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> {perpost.like_amount>100000 ? Math.floor(perpost.like_amount/100000) +'M': perpost.like_amount>1000 ? Math.floor(perpost.like_amount/1000) +'K' : perpost.like_amount}</p></div>
                        
                        
                        <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> {perpost.dislike_amount>100000 ? Math.floor(perpost.dislike_amount/100000) +'M': perpost.dislike_amount>1000 ? Math.floor(perpost.dislike_amount/1000) +'K' : perpost.dislike_amount}</p></div>
                        
                    
                    
                </div>

            
            
            </div>
            })
        }
    }

    handleMouseEnter = ()=>{
        document.getElementById("txtara").style.borderColor = '#ff3a3a';
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

    async componentDidMount(){
        if(!this.props.sln ){

            window.location.href = "/";
        }

        try{
            
            const response = await axios.get(`/profile/${this.props.sln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            
            if(response.status === 200){
                
                this.setState({
                    'mail' : response.data.email,
                    'country' : response.data.country,
                    'gender' : response.data.gender,
                    'age' : response.data.age,
                    'joined' : response.data.joined,
                    'imlink' : response.data.imagelink
                });
            }

            const response2 = await axios.get(`/mypost/${this.props.sln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            if(response2.status === 200){
                

                if(response2.data.message == 'Successful'){
                    this.setState({
                        allpost : response2.data.profilePost
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
                <div className="container-fluid proful p-0 d-flex justify-content-center" style={{opacity}}>
                    <div className="bordofprof fhighdsp">
                        <div className="imgboxt d-flex justify-content-center somedisp mb-3 mb-md-0">
                            <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center mb-md-3">
                                <div className="col imgfordisp d-flex justify-content-center"><img className="profimage" src={this.state.imlink}></img></div>
                            </div>
                        </div>
                        <div className="container-fluid profinfbox besideprofin">
                            <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center flex-row">
                                
                                <div className="col col-md-5 mt-2 mt-md-0"><i className="fa-solid fa-user"></i> <b>UserName</b> : {this.state.mail.split('@',1)}</div>
                                <div className="col col-md-5 brkwrd"><i className="fa-solid fa-envelope"></i> <b>Email</b> : {this.state.mail}</div>
                                <div className="col col-md-5"><i className="fa-solid fa-globe"></i> <b>Country</b> : {this.state.country}</div>
                                <div className="col col-md-5"><i className="fa-solid fa-user-secret"></i> <b>Age</b> : {this.state.age}</div>
                                <div className="col col-md-5"><i className="fa-solid fa-venus-mars"></i> <b>Gender</b> : {this.state.gender}</div>
                                <div className="col col-md-5"><i className="fa-regular fa-calendar-days"></i> <b>Joined</b> : {this.state.joined}</div>
                                <div className="col d-flex justify-content-around mt-md-4 bigdispedt"><button type="button" className="btn btn-sm btn-primary me-1 me-md-0 probtn"><Link className="linkdec3" to="/editprofile"><i className="remvic fa-regular fa-pen-to-square d-none d-md-inline"></i> Edit</Link></button><button type="button" className="btn btn-sm btn-primary me-1 me-md-0 probtn"><Link className="linkdec3" to="/changepass"><i className="fa-solid fa-lock d-none d-md-inline remvic"></i> Password</Link></button><button type="button" className="btn btn-sm btn-primary me-1 me-md-0 probtn"><Link className="linkdec3" to="/deleteid"><i className="fa-solid fa-ban d-none d-md-inline remvic"></i> Delete</Link></button></div>
                            </div>
                        </div>
                    </div> 
                    
                    
                    
                    <div className="col homefirst mx-auto propostmarg bordvanish profposttopmarg">
                        <div className="row row-cols-1 m-0 randpost">
                            
                            {this.showpost()}
                            
                            
                        {/*New post */}

                        


                        {/* New Post */}

                        {/*New post */}

                                               


                        {/*New post */}

                        

                        {/*Post seeing stop here*/}

                        <div className="compage"><Link className="linkdec3" to="/profilecomment">Your Comments</Link></div>
                        <div className="postingpg"><Link className="linkdec3" to="/post">POST</Link></div>
                        
                    </div>
                    
                    </div>
                    {this.alertbox()}
                </div>

            </Fragment>
        )
    }
}

export default Profile
