import React, { Component,Fragment } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class PostEditMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : [],
            prob_intro : '',
            prob_type : '',
            post : '',
            resdata : '',
            redirct : 'No',
            postfield : [],
            usersl : '',
            startingintro : '',
            startingtype : '',
            startingpost : '',
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
    showtype=()=>{
        return  this.state.posts.map((post) => {
            return <option key={post.slno} value={post.code_type}>{post.code_type}</option>
        });
        
    }

    aftersubmit=()=>{
        if(this.state.resdata){
            return     <div class="alert alert-primary d-flex align-items-center alboxpos" role="alert">
            
            <div>
                {this.state.resdata}
            </div>
          </div>
            
            
        }else{
            return  <p className="redtxt">Make Sure To Fill Every Fields of Your Post. At Least One Field Edit Required.</p>
        }
    }

    weredirect=()=>{
        if(this.state.redirct == 'Yes'){
            return <Redirect to="/profile"></Redirect>
        }
    }
    postedit = (e)=>{
        e.preventDefault();
        const {postno} = this.props.match.params
        const formdata = new FormData();
        formdata.append('introduction', this.state.startingintro);
        formdata.append('postType',this.state.startingtype);
        formdata.append('mainPost',this.state.startingpost);

        
        axios.post(`/myposteditsub/${this.props.sln}/${postno}`,formdata,{
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(
            response =>{
                if(response.status===200){
                    console.log(response.data)
                    this.setState({resdata : response.data.message});

                    if(response.data.message == 'Post Update Successful.'){
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
        ).catch(error=>{console.log(error)})
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

    async componentDidMount(){
        
       
        this.setState({usersl : this.props.sln})
        
        const {postno} = this.props.match.params;
        axios.get('/postTypes',{
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                this.setState({
                    posts : response.data.postType
                });
            }).catch(error=>{console.log(error);});
            

            try {
                
                
                const response2 = await axios.get(`/mypostedit/${this.props.sln}/${postno}`, {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                if(response2.status === 200){
                    if(response2.data.message == 'Successful'){
                        this.setState({ 
                            startingintro : response2.data.editPost[0].intro,
                            startingtype :  response2.data.editPost[0].problem_type,
                            startingpost : response2.data.editPost[0].user_post


                        });
                        console.log(response2.data)

                        
                    }
                }
                
                
                this.startOpacityChange();
                
                } catch (error) {
                console.log(error);
                }


            

        
    }

  render() {
    const { opacity } = this.state;
        return (
            <Fragment>
                
                <form className="container-fluid vw-100 vh-15 m-0 p-0 postfl flex-column" onSubmit={e=>{this.postedit(e)}} style={{opacity}}>
                    <div className="imgboxt d-flex justify-content-center mb-3 mb-md-0">
                        <div className="row row-cols-1 row-cols-md-10 d-flex justify-content-center">
                            {this.aftersubmit()}
                        </div>
                        
                    </div>
                    <input id="intro" type="text" value = {this.state.startingintro} className="postfld2 me-2 mb-3" placeholder='State Problem In One Line' onChange={(e)=>{this.setState({prob_intro : e.target.value, startingintro : e.target.value})}}></input>
                    <select id="type" value = {this.state.startingtype} className="postfld3 me-2 mb-3" onChange={(e)=>{this.setState({prob_type : e.target.value, startingtype : e.target.value})}}>
                        <option selected disabled>Problem Type</option>
                        {this.showtype()}
                    </select>
                    <textarea id="fullt" value = {this.state.startingpost} placeholder='Detailed Problem' className="postfld me-2 mb-3" onChange={(e)=>{this.setState({post : e.target.value, startingpost : e.target.value})}}></textarea>
                    <button type="submit" className="btn btn-primary btn-sm btncol bigdispost">Edit POST</button>
                        
                    
                </form>
                {this.weredirect()}
            </Fragment>
        )
  }
}

export default PostEditMain
