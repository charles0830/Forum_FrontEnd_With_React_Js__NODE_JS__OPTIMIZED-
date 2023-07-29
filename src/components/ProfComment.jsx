import React, { Component, Fragment } from 'react'
import homebg from '../assests/images/homebg.jpg'
import { Link } from 'react-router-dom'

export class ProfComment extends Component {
    render() {
        return (
            <Fragment>
            <div className="container-fluid proful p-0 d-flex justify-content-center">
            <div className="bordofprof">
                <div className="imgboxt d-flex justify-content-center somedisp mb-3 mb-md-0">
                    <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center mb-md-3">
                        <div className="col d-flex justify-content-center"><img className="profimage" src={homebg}></img></div>
                    </div>
                </div>
                <div className="container-fluid profinfbox">
                    <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center flex-row">
                        
                        <div className="col col-md-5"><i className="fa-solid fa-user"></i> UserName : Saminyeasar</div>
                        <div className="col col-md-5 brkwrd"><i className="fa-solid fa-envelope"></i> Email : saminyeasararnob@gmail.com</div>
                        <div className="col col-md-5"><i className="fa-solid fa-globe"></i> Country : Japan</div>
                        <div className="col col-md-5"><i className="fa-solid fa-user-secret"></i> Age : 18</div>
                        <div className="col col-md-5"><i className="fa-solid fa-venus-mars"></i> Gender : Male</div>
                        <div className="col col-md-5"><i className="fa-regular fa-calendar-days"></i> Joined : 2022-28-92</div>
                        <div className="col d-flex justify-content-around mt-md-4"><button type="button" className="btn btn-sm btn-primary me-1 me-md-0 probtn"><i className="fa-regular fa-pen-to-square d-none d-md-inline"></i> Edit</button><button type="button" className="btn btn-sm btn-primary me-1 me-md-0 probtn"><i className="fa-solid fa-lock d-none d-md-inline"></i> Password</button><button type="button" className="btn btn-sm btn-primary me-1 me-md-0 probtn"><i className="fa-solid fa-ban d-none d-md-inline"></i> Delete</button></div>
                    </div>
                </div>
            </div> 
        
            <div className="col homefirst mx-auto propostmarg bordvanish profposttopmarg">
                <div className="row row-cols-1 m-0 randpost">
                    <div className="col eachpostr">
                        <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                            <div className="col-md-3 p-0 colhimg" ><img className="procls" src={homebg}></img></div>
                            <div className='col-md-6 colhpost' >
                                <p>saminyeasar@gmail.com &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At time )<br></br><b>My post Intro</b><br></br>What I wrote &nbsp;...(See More)</p>
                                <p></p>
                            </div>
                            
                                <div className="col-md-3 colhreprlikcom whitefont" >
                                    <i className="fa-solid fa-flag icncol"></i>Report
                                </div>
                                
                                
                                
                                
                                
                                
                                <div className="col-md-3 colclikpost darkfont2" ><p>Let's Solve <i className="fa-solid fa-circle-info"></i></p></div>
                                
                            
                                
                            
                                <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : 100</p></div>
                            
                            
                        
                        
                                <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> 100</p></div>
                            
                            
                            
                                <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> 200</p></div>
                        
                        
                        
                    </div>


                </div>

                {/*New post */}

                <div className="col eachpostr">
                        <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                            <div className="col-md-3 p-0 colhimg" ><img className="procls" src={homebg}></img></div>
                            <div className='col-md-6 colhpost' >
                                <p>saminyeasar@gmail.com &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At time )<br></br><b>My post Intro</b><br></br>What I wrote &nbsp;...(See More)</p>
                                <p></p>
                            </div>
                            
                                <div className="col-md-3 colhreprlikcom whitefont" >
                                    <i className="fa-solid fa-flag icncol"></i>Report
                                </div>
                                
                                
                                
                                
                                
                                
                                <div className="col-md-3 colclikpost darkfont2" ><p>Let's Solve <i className="fa-solid fa-circle-info"></i></p></div>
                                
                            
                                
                            
                                <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : 100</p></div>
                            
                            
                        
                        
                                <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> 100</p></div>
                            
                            
                            
                                <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> 200</p></div>
                        
                        
                        
                    </div>


            
                </div>


                {/* New Post */}

                                       {/*New post */}

                                       <div className="col eachpostr">
                                       <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                                           <div className="col-md-3 p-0 colhimg" ><img className="procls" src={homebg}></img></div>
                                           <div className='col-md-6 colhpost' >
                                               <p>saminyeasar@gmail.com &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At time )<br></br><b>My post Intro</b><br></br>What I wrote &nbsp;...(See More)</p>
                                               <p></p>
                                           </div>
                                           
                                               <div className="col-md-3 colhreprlikcom whitefont" >
                                                   <i className="fa-solid fa-flag icncol"></i>Report
                                               </div>
                                               
                                               
                                               
                                               
                                               
                                               
                                               <div className="col-md-3 colclikpost darkfont2" ><p>Let's Solve <i className="fa-solid fa-circle-info"></i></p></div>
                                               
                                           
                                               
                                           
                                               <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : 100</p></div>
                                           
                                           
                                       
                                       
                                               <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> 100</p></div>
                                           
                                           
                                           
                                               <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> 200</p></div>
                                       
                                       
                                       
                                   </div>
       
       
                           
                               </div>


                                                      {/*New post */}

                <div className="col eachpostr">
                <div className="row row-cols-1 row-cols-md-3 rowprprty darkfont" >
                    <div className="col-md-3 p-0 colhimg" ><img className="procls" src={homebg}></img></div>
                    <div className='col-md-6 colhpost' >
                        <p>saminyeasar@gmail.com &nbsp;&nbsp;<i className="fa-regular fa-circle-dot"></i> ( Posted At time )<br></br><b>My post Intro</b><br></br>What I wrote &nbsp;...(See More)</p>
                        <p></p>
                    </div>
                    
                        <div className="col-md-3 colhreprlikcom whitefont" >
                            <i className="fa-solid fa-flag icncol"></i>Report
                        </div>
                        
                        
                        
                        
                        
                        
                        <div className="col-md-3 colclikpost darkfont2" ><p>Let's Solve <i className="fa-solid fa-circle-info"></i></p></div>
                        
                    
                        
                    
                        <div className="col-md-3 viewpost"><p className="whitefont"><i className="fa-solid fa-eye icncol"></i> Total View : 100</p></div>
                    
                    
                
                
                        <div className="col-md-3 viewpost2" ><p className="whitefont"><i className="fa-solid fa-thumbs-up icncol pt-3 pb-3"></i> 100</p></div>
                    
                    
                    
                        <div className="col-md-3 viewpost3" ><p className="whitefont"><i className="fa-solid fa-thumbs-down icncol"></i> 200</p></div>
                
                
                
            </div>


    
        </div>

                {/*Post seeing stop here*/}

                <div className="compage"><Link className="linkdec" to="/profile">Your Posts</Link></div>
            </div>
            </div>
            
        </div>

            </Fragment>
        )
    }
}

export default ProfComment
