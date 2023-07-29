import React, { Component, Fragment, Suspense } from 'react'
import axios from 'axios';




import Nav from '../common/Nav'


import Regs from '../components/Regs';
import Login from '../components/Login';
import Logout from '../components/Logout';

import Profile from '../components/Profile';
import Home from '../components/Home';
import Post from '../components/Post';
import EditProfile from '../components/EditProfile';
import DeletePage from '../components/DeletePage';
import ForgetPass from '../components/ForgetPass';
import TotallyForgot from '../components/TotallyForgot';
import PostSee from '../components/PostSee';
import MyPostSee from '../components/MyPostSee';
import PostEditMain from '../components/PostEditMain';
import MyCommentedPost from '../components/MyCommentedPost';
import Policy from '../components/Policy';

import SearchPost from '../components/SearchPost';
import Notification from '../components/Notification';
import SeeOther from '../components/SeeOther';


import {
    BrowserRouter as Router,
  
    Switch,
    Route,
    
  } from "react-router-dom";


  const Topimage = React.lazy(() => import('../components/Topimage'));

  const Footer = React.lazy(() => import('../components/Footer'));
  const TopicPost = React.lazy(()=>import('../components/TopicPost'));



export class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            sl_no : '',
            logged_in : false,
            post_no : '' ,
            comment_no : null,
            img_link : ''
        }

    }
    
    async componentDidMount(){
        if(localStorage.getItem('serial')){
            

            axios.get(`/amilogged/${localStorage.getItem('token')}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                if(response.status === 200){
                    if(response.data.message == 'Yes'){
                        
                        this.setState({
                            email : localStorage.getItem('email'),
                            img_link : localStorage.getItem('image'),
                            sl_no : localStorage.getItem('serial'),
                            logged_in : localStorage.getItem('logged')
                        
                        });
                    }else if(response.data.message == 'No'){
                        
                        localStorage.clear();
                    }
                }
            }).catch(error=>{console.log(error)})
        }
        

    }

    render() {
        return (
            <Router>
                <Fragment>
                    {/*<Topimage />*/}
                    <Nav sln={this.state.sl_no} email={this.state.email} logged={this.state.logged_in} imglink={this.state.img_link} />
                    <Suspense fallback={<div>Loading ...</div>}>
                    <Switch>
                        
                        <Route exact path="/" component={()=><Home usrmail={this.state.email} componentId={1} usrlogged={this.state.logged_in} sln={this.state.sl_no} />} />
                        <Route exact path="/regt" component={()=><Regs componentId={3} />} />
                        <Route exact path="/logs" component={()=><Login componentId={4} />} />        
                        <Route exact path="/logot" component={()=><Logout serial={this.state.sl_no} componentId={5} />} />   
                        <Route exact path="/profile" component={()=><Profile sln={this.state.sl_no} componentId={6} />} />   
                        <Route exact path="/profilecomment" component={()=><MyCommentedPost componentId={7} sln={this.state.sl_no} />} />  
                        <Route exact path="/post" component={()=><Post componentId={8} sln={this.state.sl_no} />} />  
                        <Route exact path="/editprofile" component={()=><EditProfile componentId={9} sln={this.state.sl_no} />} />
                        <Route exact path="/deleteid" component={()=><DeletePage componentId={10} />} />   
                        <Route exact path="/changepass" component={()=><ForgetPass componentId={11} sln={this.state.sl_no} />} />  
                        <Route exact path="/forgottotally" component={()=><TotallyForgot componentId={12} />} />  
                        <Route exact path="/seepost/:postno" component={(props) => (<PostSee componentId={13} sln={this.state.sl_no} postno={props.match.params.postno} {...props} />)} />  
                        <Route exact path="/mypostsee/:postno" component={(props)=>(<MyPostSee componentId={14} sln={this.state.sl_no} postno={props.match.params.postno} {...props} />)}/>
                        <Route exact path="/posteditmain/:postno" component={(props)=>(<PostEditMain componentId={15} sln={this.state.sl_no} postno={props.match.params.postno} {...props}/>)} />
                        <Route exact path="/policy" component={()=><Policy componentId={2} />} />
                        <Route exact path="/topicpost/:posttype" component={(props)=>(<TopicPost componentId={16} sln={this.state.sl_no} posttype={props.match.params.posttype} {...props} />)}/>
                        <Route exact path="/searchitem/:posttype" component={(props)=>(<SearchPost componentId={17} sln={this.state.sl_no} posttype={props.match.params.posttype} {...props} />)}/>
                        <Route exact path="/notification" component={()=><Notification componentId={18} sln={this.state.sl_no} />} />
                        <Route exact path="/seeother/:personemail" component={(props)=>(<SeeOther componentId={19} sln={this.state.sl_no} person={props.match.params.personemail} {...props}/>)} />   
                    </Switch>
                    </Suspense>

                    <Footer></Footer>
                </Fragment>
            </Router>
            
            
        )
    }
}

export default Header
