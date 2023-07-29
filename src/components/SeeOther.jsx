import React, { Component,Fragment } from 'react'
import homebg from '../assests/images/homebg.jpg'

import axios from 'axios';
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export class SeeOther extends Component {
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
            'allpost' : [],
            afterdelete : '',
            opacity: 0,
            isInitialMount: true
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

    showpost = ()=>{
        if(this.state.allpost.length>0){
            const uniquePosts = [];
            const slnoSet = new Set();
          
            // Iterate over each post
            this.state.allpost.forEach((perpost) => {
              const { slno } = perpost;
          
              // Check if the slno is already present in the set
              if (!slnoSet.has(slno)) {
                // Add the post to the uniquePosts array
                uniquePosts.push(perpost);
          
                // Add the slno to the set
                slnoSet.add(slno);
              }});
              uniquePosts.sort((a, b) => b.slno - a.slno);
            return  uniquePosts.map((perpost)=>{
                return  <div className="col eachpostr" key={perpost.slno}>
                <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                    <div className="col-md-3 p-0 colhimg" ><img className="procls" src={this.state.imlink}></img></div>
                    <div className='col-md-6 colhpost' >
                        <p><b>{perpost.author}</b> &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At {perpost.creating_time} )<br></br><b>{perpost.intro}</b><br></br>{perpost.user_post.slice(0, 70)} &nbsp;...(See More)</p>
                        <p></p>
                    </div>
                    
                        <div  className="col-md-3 colhreprlikcom whitefont" >
                            <i className="fa-solid fa-flag icncol"></i>Report
                        </div>
                        
                        
                        <div className="col-md-3 colclikpost darkfont2" ><Link onClick={(e)=>{this.addView(e,perpost.slno)}} className='linkdec' to={'/seepost/'+perpost.slno} ><p>Details <i className="fa-solid fa-circle-info"></i></p></Link></div>
                        
                        
                        <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : {perpost.viewed>100000 ? Math.floor(perpost.viewed/100000) +'M': perpost.viewed>1000 ? Math.floor(perpost.viewed/1000) +'K' : perpost.viewed}</p></div>
                       
                        
                        <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> {perpost.like_amount>100000 ? Math.floor(perpost.like_amount/100000) +'M': perpost.like_amount>1000 ? Math.floor(perpost.like_amount/1000) +'K' : perpost.like_amount}</p></div>
                        
                        
                        <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> {perpost.dislike_amount>100000 ? Math.floor(perpost.dislike_amount/100000) +'M': perpost.dislike_amount>1000 ? Math.floor(perpost.dislike_amount/1000) +'K' : perpost.dislike_amount}</p></div>
                        
                    
                    
                </div>

            
            
            </div>
            })
        }else if(this.state.allpost){
            if(this.state.allpost.slno>0){
            return  <div className="col eachpostr" key={this.state.allpost.slno}>
            <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                <div className="col-md-3 p-0 colhimg" ><img className="procls" src={this.state.imlink}></img></div>
                <div className='col-md-6 colhpost' >
                    <p><b>{this.state.allpost.author}</b> &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At {this.state.allpost.creating_time} )<br></br><b>{this.state.allpost.intro}</b><br></br>{this.state.allpost.user_post.slice(0, 70)} &nbsp;...(See More)</p>
                    <p></p>
                </div>
                
                    <div  className="col-md-3 colhreprlikcom whitefont" >
                        <i className="fa-solid fa-flag icncol"></i>Report
                    </div>
                    
                    
                    <div className="col-md-3 colclikpost darkfont2" ><Link onClick={(e)=>{this.addView(e,this.state.allpost.slno)}} className='linkdec' to={'/seepost/'+this.state.allpost.slno} ><p>Details <i className="fa-solid fa-circle-info"></i></p></Link></div>
                    
                    
                    <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : {this.state.allpost.viewed>100000 ? Math.floor(this.state.allpost.viewed/100000) +'M': this.state.allpost.viewed>1000 ? Math.floor(this.state.allpost.viewed/1000) +'K' : this.state.allpost.viewed}</p></div>
                   
                    
                    <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> {this.state.allpost.like_amount>100000 ? Math.floor(this.state.allpost.like_amount/100000) +'M': this.state.allpost.like_amount>1000 ? Math.floor(this.state.allpost.like_amount/1000) +'K' : this.state.allpost.like_amount}</p></div>
                    
                    
                    <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> {this.state.allpost.dislike_amount>100000 ? Math.floor(this.state.allpost.dislike_amount/100000) +'M': this.state.allpost.dislike_amount>1000 ? Math.floor(this.state.allpost.dislike_amount/1000) +'K' : this.state.allpost.dislike_amount}</p></div>
                    
                
                
            </div>

        
        
        </div>    
        }else{
            return  <div className='container-fluid d-flex justify-content-center'><p className='mx-auto'>This Person Has Not Posted Yet ... </p></div>
        }}else{
            return  <div className='container-fluid d-flex justify-content-center'><p className='mx-auto'>This Person Has Not Posted Yet ... </p></div>
        }
    }

    handleMouseEnter = ()=>{
        document.getElementById("txtara").style.borderColor = '#ff3a3a';
    }


    async componentDidMount(){
        if(!this.props.sln ){

            window.location.href = "/";
        }

        const {personemail} = this.props.match.params;

        try{
            
            const response = await axios.get(`/seeother/${this.props.sln}/${personemail}`,{
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
                    'imlink' : response.data.imagelink,
                    'allpost' : response.data.mother_post

                });
            }

            

            this.startOpacityChange();

        }catch(error){
            console.log(error)
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
    

    render() {
        const { opacity } = this.state;
        return (
            <Fragment>
                <div className="container-fluid proful p-0 d-flex justify-content-center" style={{opacity}}>
                    <div className="bordofprof">
                        <div className="imgboxt d-flex justify-content-center somedisp mb-3 mb-md-0">
                            <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center mb-md-3">
                                <div className="col imgfordisp3 d-flex justify-content-center"><img className="profimage" src={this.state.imlink}></img></div>
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

                        
                    </div>
                    </div>
                    
                </div>

            </Fragment>
        )
    }
}

export default withRouter(SeeOther)
