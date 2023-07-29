import React, { Component,Fragment } from 'react'

export class Policy extends Component {

    constructor(){
        super();
        this.state = {
            opacity: 0,
            isInitialMount: true
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

    async componentDidMount(){
        this.startOpacityChange();
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
        const {opacity} = this.state;
        return (
            <Fragment>
                <div className='container-fluid layoutside d-flex justify-content-center align-items-center' style={{opacity}}>
                    <div className='row row-cols-1 row-cols-md-8 p-4 d-flex justify-content-center'>
                        <div className='col col-md-6 d-flex justify-content-center p-5 policy flex-column'><b><span className='undrln'>The Rules & User Policy :</span></b><br></br>During Registration You Must Put Valid Data In Order To Protect Account & Future Account Optimizations And Password Recovery. Also Kindly When Posting Insert Data In Al Of The Form Fields.<br></br>All Your Password And Account Information Is Safe With Us And We Use Password As Hashed Form So There Is No Need To Worry About Safety. A Post Will Be Removed After 30 Reports From Different Users. So, Kindly Be Considerate When You Post. But, You Can Not Like Or Report Or Dislike Other While You Are Not Logged IN.<br></br><br></br><b><span className='undrln'>Effective Date: [7-16-2023]</span></b><br></br>

                        Welcome to our forum. This Policy and Privacy Statement outlines the terms and conditions, as well as the privacy practices, governing the use of our Website. By accessing or using our Website, you agree to be bound by the terms and conditions outlined in this statement.
                        
                        User Responsibilities
                        1.1 Posting Content: Users are solely responsible for the content they post on the Website. All content posted should be relevant, respectful, and in compliance with applicable laws and regulations.
                        1.2 User Conduct: Users must refrain from engaging in any activity that is unlawful, harmful, or infringes upon the rights of others. This includes, but is not limited to, harassment, spamming, spreading malware, or any other malicious actions.
                        1.3 Intellectual Property: Users must respect the intellectual property rights of others. Do not post content that infringes upon copyrights, trademarks, or any other proprietary rights.
                        
                        Moderation and Reporting
                        2.1 Moderation: We reserve the right to moderate the content posted on our Website. Our moderators will review reported posts, but we cannot guarantee that all reported posts will be immediately addressed. We have the discretion to remove or modify any content that violates our policies.
                        2.2 Reporting: Users can report posts that they believe violate our policies. When reporting a post, please provide a detailed explanation of the issue. We will investigate reported posts and take appropriate action as necessary.
                        
                        Privacy and Data Protection
                        3.1 Collection of Information: We collect personal information, including but not limited to usernames, email addresses, and hashed passwords, to provide and improve our services. We will not sell, rent, or share this information with third parties unless required by law or with the user's explicit consent.
                        3.2 Security: We take reasonable measures to protect user data from unauthorized access, disclosure, alteration, or destruction. Passwords and other sensitive information are hashed and stored securely.
                        3.3 Cookies and Tracking: We use cookies and similar technologies to enhance user experience and collect data about website usage. Users can adjust their browser settings to manage cookies preferences.
                        3.4 Third-Party Links: Our Website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those websites. Users should review the privacy policies of third-party websites before providing any personal information.
                        3.5 Children's Privacy: Our Website is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware of any such data, we will take steps to delete it.
                        
                        Disclaimer of Liability
                        4.1 User Content: We do not endorse or take responsibility for the accuracy, completeness, or reliability of any content posted by users. Users rely on such content at their own risk.
                        4.2 Third-Party Content: We are not responsible for any third-party content posted on our Website. Users should exercise caution when accessing and relying on such content.
                        4.3 Limitation of Liability: We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or relating to the use of our Website.
                        
                        Amendments
                        We reserve the right to update or modify this Policy and Privacy Statement at any time without prior notice. By continuing to use the Website after any changes are made, you accept the revised terms and conditions.
                        
                        If you have any questions or concerns about this Policy and Privacy Statement, please contact us at [insert contact information].
                        
                        By using our Website, you acknowledge that you have read, understood, and agreed to the terms and conditions outlined in this Policy and Privacy Statement. </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default Policy
