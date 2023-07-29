
import React, { Component,Fragment } from 'react'
import { Link, Redirect, useParams, withRouter } from 'react-router-dom'
import axios from 'axios'


export class PostSee extends Component {
    constructor(props){
        super(props);
        this.state = {
            redrct : 'No',
            posts : [],
            comments : [],
            resdata : '',
            comdata : '',
            post_no : null,
            writecoms : '',
            hascomment : false,
            liked : '',
            disliked : '',
            aftercomredirct : '',
            commentdel : '',
            commentsucs : false,
            delsuccess : false,
            opacity: 0,
            isInitialMount: true,
            rendernow : false
        
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
    
    otherpostlike = (e,postno)=>{
        axios.get(`/postlike/${this.props.sln}/${postno}`).then(response=>{
            if(response.status === 200){
                if(response.data.message == 'Success'){
                    this.componentDidMount();
                }

            }
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    otherpostdislike = (e,postno)=>{
        axios.get(`/postdislike/${this.props.sln}/${postno}`).then(response=>{
            if(response.status === 200){
                if(response.data.message == 'Success'){
                    this.componentDidMount();
                }
            }
        }).catch(error=>{
            console.log(error)
        })
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
                return  <div className="alert alert-primary d-flex align-items-center alboxpos" role="alert">
            
                    <div>
                        {this.state.reportmsg}
                    </div>
                </div>
        }
    }


    commentdeleted = ()=>{
        if(this.state.delsuccess== true){
            return  <div className="alert alert-primary d-flex align-items-center alboxpos" role="alert">
            
            <div>
              Successfully Removed The Comment.
            </div>
          </div>
        }
    }
    commentsucceded = ()=>{
        if(this.state.commentsucs== true){
            return  <div className="alert alert-primary d-flex align-items-center alboxpos" role="alert">
            
            <div>
              Successfully Commented.
            </div>
          </div>
        }
    }

    aftercomred=()=>{
        const {postno} = this.props.match.params;
        if(this.state.aftercomredirct == 'Yes'){
            this.setState({aftercomredirct : ''})
            return <Redirect to={'/seepost/'+postno}/>
            
        }
    }
    lovecom = (e,comno)=>{
        
        const {postno} = this.props.match.params;
        axios.get(`/comlike/${this.props.sln}/${comno}`).then(response=>{
            if(response.status === 200){
                if(response.data.message == 'Success'){
                    this.setState({aftercomredirct  : 'Yes'},()=>{
                        this.componentDidMount();
                    })
                    
                }
            }
            {/*if(response.status === 200){
                if(response.data.message == 'Success'){

                    if(this.state.liked == '' && this.state.disliked == ''){
                        this.setState({
                            liked: 'true',
                            dislike : 'false'
                    })
                    this.setState(prevState => {
                        const updatedComments = prevState.comments.map(comment => {
                        if (comment.slno === comno) {
                            return {
                              ...comment,
                              like_amount: comment.like_amount + 1
                            };
                          }
                          return comment;
                        });
                    
                        return {
                          comments: updatedComments
                        };
                      });
                    


                    }else if(this.state.disliked == 'true'){
                        this.setState({
                            liked: 'true',
                            dislike : 'false'
                    })
                    this.setState(prevState => {
                        const updatedComments = prevState.comments.map(comment => {
                        if (comment.slno === comno) {
                            return {
                              ...comment,
                              like_amount: comment.like_amount + 1,
                              dislike_amount : comment.dislike_amount -1
                            };
                          }
                          return comment;
                        });
                    
                        return {
                          comments: updatedComments
                        };
                      });
                    


                    }
                    
                    
                }
            }*/}
        }).catch(error=>{console.log(error)})

        {/*change like amount number here*/}
        
            
        
        

    }
    dislovecom=(e,comno)=>{
        
        const {postno} = this.props.match.params;
        axios.get(`/comdislike/${this.props.sln}/${comno}`).then(response=>{
            if(response.status === 200){
                if(response.data.message == 'Success'){
                    this.setState({aftercomredirct  : 'Yes'},()=>{
                        this.componentDidMount();
                    })
                }
            }
            console.log(response.data)
            {/*if(response.status === 200){
                if(response.data.message == 'Success'){
                    if(this.state.liked == '' && this.state.disliked == ''){
                        this.setState({
                            liked: 'false',
                            dislike : 'true'
                    })
                    this.setState((prevState) => {
                        const updatedComments = prevState.comments.map(comment => {
                        if (comment.slno === comno) {
                            return {
                              ...comment,
                              dislike_amount: comment.dislike_amount + 1
                            };
                          }
                          return comment;
                        });
                    
                        return {
                          comments: updatedComments
                        };
                      });

                    }else if(this.state.liked == 'true'){

                        this.setState({
                            liked: 'false',
                            dislike : 'true'
                        })
                        this.setState((prevState) => {
                            const updatedComments = prevState.comments.map(comment => {
                            if (comment.slno === comno) {
                                return {
                                  ...comment,
                                  dislike_amount: comment.dislike_amount + 1,
                                  like_amount : comment.like_amount-1
                                };
                              }
                              return comment;
                            });
                        
                            return {
                              comments: updatedComments
                            };
                          });
                    }
                }
            }*/}
        }).catch(error=>{console.log(error)})
        
        {/*change dislike amount number here*/}
        
    }

    submitcom=(e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('comment', this.state.writecoms);
        const {postno} = this.props.match.params;
        axios.post(`/comment/${this.props.sln}/${postno}`, formdata, {
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response=>{
            if(response.status === 200){
                if(response.data.message == 'Comment Successful'){
                    this.setState({
                        posts : response.data.update_post,
                        comments : response.data.comments,
                        commentsucs : true
                    })
                    this.setState({writecoms : ''})
                    document.getElementById("coms").value =  '';

                    setTimeout(()=>{this.setState({
                        
                        commentsucs : false
                    })},1500)
                }
                
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    delmycom = (e,slnocom)=>{
        axios.get(`/delmycom/${this.props.sln}/${slnocom}`,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            if(response.status === 200){
                if(response.data.message == 'Successfully Deleted.'){
                    this.setState({
                        commentdel : response.data.message,
                        delsuccess : true
                    }, ()=>{this.componentDidMount()})

                    setTimeout(()=>{this.setState({delsuccess : false})},1500)
                }
            }
        }).catch(error=>{console.log(error)})
    }

    showcoms = ()=>{
        console.log('start')
        if(this.state.comments.length>1){
            console.log('here')
            return  this.state.comments.map((eachone)=>{
                return  <div className='postbox3 mt-5 p-4 mx-auto' key={eachone.slno}>
                <div className='row bodbot p-2'>   
                    <div className='col d-flex justify-content-start flex-column flex-md-row text-break'><div className='imgbox me-3'><img className='imgfit' src={eachone.image}></img></div><span><span onClick={(e)=>{this.goseeother(e,eachone.author)}} className="postbold">{eachone.author}</span><br></br>posted at : {eachone.creating_time}</span> </div>
                </div>
                <div className='row mt-3 p-2'>
                    <div className='col d-flex justify-content-start flex-column flex-md-row text-break'>
                        <p className='postfnt'>{eachone.comment}</p>
                    </div>
                </div>
                

                <div className='row bodtop p-2 justify-content-center'>   
                
                   
                        <div onClick={(e)=>{this.lovecom(e,eachone.slno)}} className='col-3 d-flex justify-content-center align-items-center'><i className="fa-solid fa-heart fa-lg colper"></i> &nbsp;{eachone.like_amount>100000 ? Math.floor(eachone.like_amount/100000) +'M': eachone.like_amount>1000 ? Math.floor(eachone.like_amount/1000) +'K' : eachone.like_amount}</div>
                        <div onClick={(e)=>{this.dislovecom(e,eachone.slno)}} className='col-4 d-flex justify-content-center align-items-center'><i className="fa-solid fa-heart-crack fa-lg colper"></i>&nbsp; {eachone.dislike_amount>100000 ? Math.floor(eachone.dislike_amount/100000) +'M': eachone.dislike_amount>1000 ? Math.floor(eachone.dislike_amount/1000) +'K' : eachone.dislike_amount}</div>
                        
                        
                        {eachone.comment_user_slno == this.props.sln ? (<div onClick={(e)=>{this.delmycom(e,eachone.slno)}} className='col-3 d-flex justify-content-center align-items-center'><i class="fa-solid fa-trash colper"></i>&nbsp; </div>):null}
                    
                
                </div>
                
                
            </div>
            });
        }else if(this.state.comments){
            if(this.state.comments.length == 1){
            return  this.state.comments.map((eachone)=>{return <div className='postbox3 mt-5 p-4 mx-auto'>
            <div className='row bodbot p-2'>   
                <div className='col d-flex justify-content-start flex-column flex-md-row text-break'><div className='imgbox me-3'><img className='imgfit' src={eachone.image}></img></div><span><span onClick={(e)=>{this.goseeother(e,eachone.author)}} className='postbold'>{eachone.author}</span><br/>posted at : {eachone.creating_time}</span></div>
            </div>
            <div className='row mt-3 p-2'>
                <div className='col d-flex justify-content-start flex-column flex-md-row text-break'>
                    <p className='postfnt'>{eachone.comment}</p>
                </div>
            </div>
            <div className='row bodtop p-2 justify-content-center'>   
                
                   
                        <div onClick={(e)=>{this.lovecom(e,eachone.slno)}} className='col-3 d-flex justify-content-center align-items-center'><i className="fa-solid fa-heart fa-lg colper"></i> &nbsp;{eachone.like_amount>100000 ? Math.floor(eachone.like_amount/100000) +'M': eachone.like_amount>1000 ? Math.floor(eachone.like_amount/1000) +'K' : eachone.like_amount}</div>
                        <div onClick={(e)=>{this.dislovecom(e,eachone.slno)}} className='col-4 d-flex justify-content-center align-items-center'><i className="fa-solid fa-heart-crack fa-lg colper"></i>&nbsp; {eachone.dislike_amount>100000 ? Math.floor(eachone.dislike_amount/100000) +'M': eachone.dislike_amount>1000 ? Math.floor(eachone.dislike_amount/1000) +'K' : eachone.dislike_amount}</div>
                        
                        {eachone.comment_user_slno == this.props.sln ? (<div onClick={(e)=>{this.delmycom(e,eachone.slno)}} className='col-3 d-flex justify-content-center align-items-center'><i className="fa-solid fa-trash colper"></i>&nbsp; </div>):null}
                        
                    
                
            </div>

            
            
        </div> })
            }else{
                return  <p className='mx-auto postcom'>Sorry No Comment Yet... Be The First To Solve The Issue !!!</p>
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

    goseeother = ( e, usermail)=>{
        e.preventDefault();
        this.props.history.push('/seeother/'+ usermail);
    }

    async componentDidMount(){
        if(!this.props.sln){

            window.location.href = "/";
        }
        const {postno} = this.props.match.params;
       
        try{
            const response = await axios.get(`/solve/${this.props.sln}/${postno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            
           
            if(response.status === 200){
                this.setState({resdata : response.data.message})

                
                

                    if(response.data.postDetail != []){
                        this.setState({
                            posts : response.data.postDetail,
                            comments : response.data.comments
                           
                        }
                        )
                    }else{
                        this.setState({
                            posts : null,
                            comments : null
                           
                        }
                        )
                    }
                    

                    

                    
                
            }
            this.startOpacityChange();
        }catch(error){
            console.log(error)
        }
        
    }
    mypostdata = ()=>{
        if(this.state.posts){
            return this.state.posts.map((each)=>{
                return   <div><div className='postbox mt-5 p-4 mx-auto'>
                <div className='row bodbot p-2'>   
                    <div className='col d-flex justify-content-start flex-column flex-md-row text-break'><div className='imgbox me-3'><img className='imgfit' src={each.image}></img></div><span><span onClick={(e)=>{this.goseeother(e,each.author)}} className='postbold'>{each.author}</span><br/>posted at : {each.creating_time}</span></div>
                </div>
                <div className='row mt-3 p-2'>
                    <div className='col d-flex justify-content-start flex-column flex-md-row text-break'>
                    <p className='postfnt'><span className='postbold'>{each.intro}</span><br></br>{each.user_post}</p>
                    
                    </div>
                </div>
            </div>
            <div className='reactbox postbox2 mt-2 mx-auto likepad'>
                <div className='row row-cols-12 d-flex flex-row justify-content-center align-items-bottom'>
                    <div onClick={(e)=>{this.otherpostlike(e,each.slno)}} className='col-4 d-flex justify-content-center align-items-center'> <p><i className="fa-solid fa-thumbs-up bigi"></i>&nbsp;{each.like_amount>100000 ? Math.floor(each.like_amount/100000) +'M': each.like_amount>1000 ? Math.floor(each.like_amount/1000) +'K' : each.like_amount}</p></div>
                    <div onClick={(e)=>{this.otherpostdislike(e,each.slno)}} className='col-3 d-flex justify-content-center align-items-center'><p><i className="fa-solid fa-thumbs-down bigi"></i> {each.dislike_amount>100000 ? Math.floor(each.dislike_amount/100000) +'M': each.dislike_amount>1000 ? Math.floor(each.dislike_amount/1000) +'K' : each.dislike_amount}</p></div>
                    <div onClick={(e)=>{this.doreport(e,each.slno)}} className='col-3 d-flex justify-content-center align-items-center'><p><i className="fa-solid fa-flag bigi"></i></p></div>
                </div>
            </div></div>
            })
        }
    }
   
    render() {
        
        const { posts, comments, resdata, opacity } = this.state;
        
        return (
            <Fragment>
                
                <div className='container-fluid mostOutlayer' style={{opacity}}>
                    
                    {this.mypostdata()}
                    <div className='reactbox postpagecoms mt-2 mx-auto d-flex justify-content-center'>
                        <div className='row flex-column'>
                            <div className='col d-flex justify-content-center'><textarea id="coms" onChange={(e)=>{this.setState({writecoms : e.target.value})}} className='reactbox postpagecoms2 d-flex justify-content-center' placeholder='Please Be Respectful In Comment & Try To Make It As Short And Specific As Possible.'></textarea></div>
                            <div onClick={(e)=>{this.submitcom(e)}} className='col d-flex justify-content-center align-items-center mt-2'><button type="button" className="btn btn-sm btn-warning comsub compst">Comment</button></div>
                        </div>
                            
                    </div>

                    <div className='reactbox postpagecoms mt-2 mx-auto d-flex justify-content-center'>
                        <div className='row d-flex justify-content-center'>
                            <div className='col postcom'>Posts Comments ...</div>
                        </div>
                    </div>

                    {this.showcoms()}
                    {this.aftercomred()}
                    
                    
                    
                    {/*new coms*/}
                    

                </div>
                {this.commentsucceded()}
                {this.commentdeleted()}
                {this.donereport()}
                
            </Fragment>
        )
    }
}

export default withRouter(PostSee)
