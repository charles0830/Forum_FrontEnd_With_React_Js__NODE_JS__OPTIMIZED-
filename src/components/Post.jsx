import React, { Component,Fragment } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : [],
            prob_intro : '',
            prob_type : '',
            post : '',
            resdata : '',
            redirct : 'No',
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
    showtype=()=>{
        return  this.state.posts.map((post) => {
            return <option key={post.slno} value={post.code_type}>{post.code_type}</option>
        });
        
    }

    aftersubmit=()=>{
        if(this.state.resdata){
            return  <div class="alert alert-primary d-flex align-items-center alboxpos" role="alert">
            
            <div>
              {this.state.resdata}
            </div>
          </div>
            
        }else{
            return  <div class="alert alert-primary d-flex align-items-center alboxpos" role="alert">
            
            <div>
              Make Sure To Fill All Form Field... And Try To Be Respectful To Other In Your Post.
            </div>
          </div>
        }
    }

    weredirect=()=>{
        if(this.state.redirct == 'Yes'){
            return <Redirect to="/profile"></Redirect>
        }
    }
    postsubmit = (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('prob_intro', this.state.prob_intro);
        formdata.append('prob_type',this.state.prob_type);
        formdata.append('post',this.state.post);

        
        axios.post(`/post/${this.props.sln}`,formdata,{
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(
            response =>{
                if(response.status===200){
                    
                    this.setState({resdata : response.data.message});

                    if(response.data.message == 'Successful'){
                        document.getElementById("intro").value = ''
                        document.getElementById("fullt").value =  ''
                        document.getElementById("type").value = ''

                        this.setState({
                            prob_intro : '',
                            prob_type : '',
                            post : ''
                        })

                        setTimeout(()=>{this.setState({redirct : 'Yes'})},1300)

                    }
                    
                }

            }
        ).catch(error=>{console.log(error.response.data)})
    }

    componentDidMount(){
        
        axios.get('/postTypes',{
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                this.setState({
                    posts : response.data.postType
                });
            }).catch(error=>{console.log(error);});
            
            
            this.startOpacityChange();
            

        
    }

  render() {
    const { opacity } = this.state;
        return (
            <Fragment>
                
                <form className="container-fluid vw-100 vh-15 m-0 p-0 postfl flex-column" onSubmit={e=>{this.postsubmit(e)}} style={{opacity}}>
                    <div className="imgboxt d-flex justify-content-center mb-3 mb-md-0">
                        <div className="row row-cols-1 row-cols-md-10 d-flex justify-content-center">
                            {this.aftersubmit()}
                        </div>
                        
                    </div>
                    <input id="intro" type="text" className="postfld2 me-2 mb-3" placeholder='State Problem In One Line' onChange={(e)=>{this.setState({prob_intro : e.target.value})}}></input>
                    <select id="type" className="postfld3 me-2 mb-3" onChange={(e)=>{this.setState({prob_type : e.target.value})}}>
                        <option selected disabled>Problem Type</option>
                        {this.showtype()}
                    </select>
                    <textarea id="fullt" placeholder='Detailed Problem' className="postfld me-2 mb-3" onChange={(e)=>{this.setState({post : e.target.value})}}></textarea>
                    <button type="submit" className="btn btn-primary btn-sm btncol bigdispost">POST</button>
                        
                    
                </form>
                {this.weredirect()}
            </Fragment>
        )
  }
}

export default Post
