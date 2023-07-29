import React, { Component, Fragment } from 'react'

import {
    BrowserRouter as Router,
    
    Link
  } from "react-router-dom";
import axios from 'axios'  
import Pagination from 'react-js-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstb from '../assests/images/firstb.jpg'
import ChartComponent from './ChartComponent';
import { Bar } from 'react-chartjs-2';
import CircularChartComponent from './CircularChartComponent';

export class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            randposts:[],
            latposts: [],
            currentPage: 1,
            postsPerPage: 7,
            reportstts : false,
            reportmsg : '',
            currentPageTop: 1, // Add a state variable for top posts pagination
            postsPerPageTop: 3,
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
    handleTopPageChange = (pageNumber) => {
        this.setState({ currentPageTop: pageNumber });
    };
    
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
        };
    
    showrandposts(){
        const { opacity } = this.state;
        const { randposts, currentPage, postsPerPage } = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = randposts.slice(indexOfFirstPost, indexOfLastPost);
        if(this.state.randposts.length>0){
            return currentPosts.map((rpost)=>{
                return(
                    <div className="col eachpostr" key={rpost.slno}>
                        <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                            <div className="col-md-3 p-0 colhimg" ><img className="procls" src={rpost.author_image}></img></div>
                            <div className='col-md-6 colhpost' >
                                <p><b>{rpost.author_email}</b> &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At {rpost.creating_time} )<br></br><b>{rpost.intro}</b><br></br>{rpost.user_post.slice(0, 70)} &nbsp;...(See More)</p>
                                <p></p>
                            </div>
                            {this.props.usrmail === '' && this.props.usrlogged === false ? (
                                <div className="col-md-3 colhreprlikcom whitefont" >
                                    <i className="fa-solid fa-flag icncol"></i>LogIn
                                </div>
                                ) : (
                                <div onClick={(e)=>{this.doreport(e,rpost.slno)}} className="col-md-3 colhreprlikcom whitefont" >
                                    <i className="fa-solid fa-flag icncol"></i>Report
                                </div>
                                )}
                                {this.props.usrmail === '' && this.props.usrlogged === false ? (
                                <div className="col-md-3 colclikpost darkfont2" ><p>Log In <i className="fa-solid fa-circle-info"></i></p></div>
                                ) : (
                                <div className="col-md-3 colclikpost darkfont2" ><Link onClick={(e)=>{this.addView(e,rpost.slno)}} className='linkdec' to={'/seepost/'+rpost.slno} ><p>Let's Solve <i className="fa-solid fa-circle-info"></i></p></Link></div>
                                )}
                                {this.props.usrmail === '' && this.props.usrlogged === false ? (
                                <div className="col-md-3 viewpost"><p className="whitefont" ><i className="fa-solid fa-eye icncol"></i> Total View : {rpost.viewed>100000 ? Math.floor(rpost.viewed/100000) +'M': rpost.viewed>1000 ? Math.floor(rpost.viewed/1000) +'K' : rpost.viewed}</p></div>
                                ) : (
                                <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : {rpost.viewed>100000 ? Math.floor(rpost.viewed/100000) +'M': rpost.viewed>1000 ? Math.floor(rpost.viewed/1000) +'K' : rpost.viewed}</p></div>
                                )}
                                {this.props.usrmail === '' && this.props.usrlogged === false ? (
                                <div className="col-md-3 viewpost2"><p className="whitefont" ><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> {rpost.like_amount>100000 ? Math.floor(rpost.like_amount/100000) +'M': rpost.like_amount>1000 ? Math.floor(rpost.like_amount/1000) +'K' : rpost.like_amount}</p></div>
                                ) : (
                                <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> {rpost.like_amount>100000 ? Math.floor(rpost.like_amount/100000) +'M': rpost.like_amount>1000 ? Math.floor(rpost.like_amount/1000) +'K' : rpost.like_amount}</p></div>
                                )}
                                {this.props.usrmail === '' && this.props.usrlogged === false ? (
                                <div className="col-md-3 viewpost3"><p className="whitefont" ><i className="fa-solid fa-thumbs-down icncol"></i> {rpost.dislike_amount>100000 ? Math.floor(rpost.dislike_amount/100000) +'M': rpost.dislike_amount>1000 ? Math.floor(rpost.dislike_amount/1000) +'K' : rpost.dislike_amount}</p></div>
                                ) : (
                                <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> {rpost.dislike_amount>100000 ? Math.floor(rpost.dislike_amount/100000) +'M': rpost.dislike_amount>1000 ? Math.floor(rpost.dislike_amount/1000) +'K' : rpost.dislike_amount}</p></div>
                                )}
                            
                            
                        </div>

                    
                    
                    </div>
                )
            });
        }
        
    }

    showtopposts(){
        const { opacity } = this.state;
        const { latposts, currentPageTop, postsPerPageTop } = this.state;
        const indexOfLastPost = currentPageTop * postsPerPageTop;
        const indexOfFirstPost = indexOfLastPost - postsPerPageTop;
        const currentPosts = latposts.slice(indexOfFirstPost, indexOfLastPost);
        if(this.state.latposts.length>0){
            return  currentPosts.map((tpost)=>{
                return(
                    
                    <div className="col postlatest" key={tpost.slno}>
                        <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                            <div className="col-md-3 p-0 imglatest" ><img className="proclslatest" src={tpost.author_image}></img></div>
                            <div className='col-md-6 postfldlatest'>
                                <p><b>{tpost.author_email}</b> &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At {tpost.creating_time} )<br></br><b>{tpost.intro}</b><br></br>{tpost.user_post.slice(0, 70)} &nbsp;...(See More)</p>
                                
                            </div>
                            {this.props.usrmail === '' && this.props.usrlogged === false ? (
                                <div className="col-md-3 clikpostltst darkfont2" ><p>Log In <i className="fa-solid fa-circle-info"></i></p></div>
                                ) : (
                                <div className="col-md-3 clikpostltst darkfont2" ><Link onClick={(e)=>{this.addView(e,tpost.slno)}} className='linkdec' to={'/seepost/'+tpost.slno} ><p>Let's Solve <i className="fa-solid fa-circle-info"></i></p></Link></div>
                                )}
                            
                            
                            
                            
                        </div>

                        
                        
                    </div>
                ) 
            })
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

        async componentDidMount() {

          
            try {
                
            const response1 = await axios.get('/homepost', {
                headers: {
                'Content-Type': 'application/json',
                },
            });

            
            this.setState({ latposts: response1.data.toppost, randposts: response1.data.randomposts });

            this.startOpacityChange();
            } catch (error) {
            console.log(error);
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
        const { componentId } = this.props;
        const { opacity } = this.state;
        const { randposts, currentPage, postsPerPage } = this.state;
        const totalPosts = randposts.length;

        const {latposts, currentPageTop, postsPerPageTop} = this.state;

        return (
            <Fragment>
                <div className="firstlayr flex-column" style={{ opacity }}>
                    <img className='firstb' src={firstb}></img>
                    <p className='quote p-5'>“Sometimes, the only thing atleast you could do for people was to be there.” – Terry Pratchett</p>
                </div>
                
                <div className="container-fluid homesize" style={{ opacity }}>
                    {this.donereport()}
                    
                    <div className="row vw-90 row-cols-1 row-cols-md-2">
                        <div className="col homefirst">
                            <div className="row row-cols-1 m-0 randpost">
                                {this.showrandposts()}
                                
                                

                            </div>
                            <div className="row row-cols-1 pagn d-flex justify-content-center align-items-center">
                                <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={postsPerPage}
                                totalItemsCount={totalPosts}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                innerClass="pagination mx-auto"
                            />
                            </div>
                        </div>
                        <div className="col homesecond">
                        <div className="row row-cols-1 m-0 p-0 tppst">
                            <p className="d-flex justify-content-center p-0 biglatst">LATEST POSTS</p>
                        </div>
                        <div className="row row-cols-1 tppstbody">
                            
                            {this.showtopposts()}

                            <div className = 'topostpagn'>
                                <Pagination
                                activePage={currentPageTop}
                                itemsCountPerPage={postsPerPageTop}
                                totalItemsCount={latposts.length}
                                pageRangeDisplayed={5}
                                onChange={this.handleTopPageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                innerClass="pagination mx-auto"
                                />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='container-fluid graph d-flex justify-content-center align-items-center'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center'>
                        <div className='col col-md-6 d-flex justify-content-center align-items-center wid'>
                            <ChartComponent />
                        </div>
                        <div className='col col-md-6 d-flex justify-content-center align-items-center wid'>
                            <CircularChartComponent />
                        </div>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}

export default Home
