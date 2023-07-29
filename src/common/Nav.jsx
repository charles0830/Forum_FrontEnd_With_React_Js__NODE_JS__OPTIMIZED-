import React, { Component, Fragment } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    withRouter,
   
    Link,
    
  } from "react-router-dom";

export class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            postsType : [],
            searchval : '',
            notifyamount : '',
            idnames : ['id1','id2','id3','id4','id5','id6']
        }
        
    }

    changeact = (e)=>{
        
         console.log(e.target.id);
         document.getElementById(e.target.id).classList.add('active');
        this.state.idnames.map((fake)=>{
            if(fake != e.target.id){
                try{
                    document.getElementById(fake).classList.remove('active');
                }catch(error){
                    console.log(error)
                }
                
            }
        })
        
    }
    logged = ()=> {
        if (this.props.email === '' && this.props.logged === false){
            return <ul className="navbar-nav me-auto mb-2 mb-lg-0 me-auto">
                        <li className="nav-item mx-sm-auto">
                            <Link id='id1' onClick = {(e)=>{this.changeact(e)}} className="nav-link" to="/logs">Login</Link>
                        </li>

                        <li className="nav-item mx-sm-auto">
                            <Link id='id2' onClick = {(e)=>{this.changeact(e)}} className="nav-link" to='/regt'>Registration</Link>
                        </li>
                    </ul>
        }else{
            return <ul className="navbar-nav me-auto mb-2 mb-lg-0 me-auto">
                        <li className="nav-item mx-sm-auto">
                            <Link id='id3' onClick = {(e)=>{this.changeact(e)}} className="nav-link" to="/logot">LogOut</Link>
                        </li>

                        
                    </ul>
        }
    }
    gocheckpage=(e,codeType)=>{

        this.props.history.push('/topicpost/' + codeType);
        
    }

    readPostTypes = ()=>{
        if(this.state.postsType){
            return  this.state.postsType.map((pertype)=>{
                return  <li key={pertype.slno}><div className="dropdown-item mx-sm-auto" onClick={(e)=>{this.gocheckpage(e,pertype.code_type)}}>{pertype.code_type}</div></li>
            });
        }
    }

    notloggedin= ()=>{
        if (this.props.email === '' && this.props.logged === false){
            return <Link className="navbar-brand mx-md-5 biglogs" to="/logs">
                        <i className="fa-solid fa-user fa-xl icncol"></i> &nbsp;Log In Please
                    </Link>
        }else{
            //userimage with a profile link
            return <Link className="navbar-brand mx-md-5 layerproimg" to="/profile">
                        <img className="proimgtp" src={this.props.imglink}></img> &nbsp;<span className='navgmail'>{this.props.email} </span><Link to="/notification"> <sup><span className="badge text-bg-primary badgesz">{this.state.notifyamount}</span></sup>
                        </Link>
                    </Link>
        }
    }
    searchitem = (e)=>{
        e.preventDefault();
        
        this.props.history.push('/searchitem/'+this.state.searchval);
    }
    

    async componentDidMount(){
       
        this.setState({slno : this.props.sln})
        console.log(this.state.slno)
        
        axios.get('/postTypes',{
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
           
            this.setState({
                postsType : response.data.postType
            });
            
        }).catch(error=>{console.log(error);});

        
        
        
        
            try{
                
                const response2 = await axios.get(`/notification/${localStorage.getItem('serial')}`,{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
                if(response2.status === 200){
                    if(response2.data.message == 'One New Notification.'){
                        this.setState({notifyamount : 1});
                    }else if(response2.data.message == 'Too Many New Notification.'){
                        const amount = response2.data.notification.length;
                        this.setState({notifyamount : amount});
                        

                    }else{
                        this.setState({notifyamount : 0});
                    }
                }
                
            }catch(error){
                console.log(error)
            }
        
            
        
          
    }

    

    render() {
        return (
            
            <Fragment>
                <nav className="navbar navbar-expand-lg sticky-top navdes">
                    <div className="container-fluid">
                        {this.notloggedin()}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse me-auto nav-underline" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                                <li className="nav-item mx-sm-auto">
                                    <Link id='id4' onClick = {(e)=>{this.changeact(e)}} className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                
                                <li className="nav-item mx-sm-auto dropdown">
                                    <Link id='id5' onClick = {(e)=>{this.changeact(e)}} className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Problem Types
                                    </Link>
                                    <ul className="dropdown-menu">
                                        {this.readPostTypes()}

                                    </ul>
                                </li>

                                <li className="nav-item mx-sm-auto">
                                    <Link id='id6' onClick = {(e)=>{this.changeact(e)}} className="nav-link" to="/policy">Rules & Privacy</Link>
                                </li>
                            
                            </ul>
                            <form onSubmit={(e)=>{e.preventDefault();}} className="d-flex justify-content-center align-items-center me-auto" role="search">
                                {this.props.email === '' && this.props.logged === false ? (<input onChange={(e)=>{this.setState({searchval : e.target.value})}} className="form-control me-2 bdy" type="search" placeholder="Login First To Search" aria-label="Search" disabled />):(<input onChange={(e)=>{this.setState({searchval : e.target.value})}} className="form-control me-2 bdy" type="search" placeholder="Search" aria-label="Search" />)}

                                {this.props.email === '' && this.props.logged === false ? (<button onClick={(e)=>{this.searchitem(e)}} className="btnsearch" type="button" disabled><i className="fa-solid fa-magnifying-glass"></i></button>):(<button onClick={(e)=>{this.searchitem(e)}} className="btnsearch" type="button"><i className="fa-solid fa-magnifying-glass"></i></button>)}

                                
                            </form>

                            {this.logged()}
                            

                            
                        </div>
                    </div>
                </nav>
                
            </Fragment>
            
            
        )
    }
}

export default withRouter(Nav)
