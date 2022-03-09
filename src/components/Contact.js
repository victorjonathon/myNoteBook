import axios from 'axios';
import { useState } from 'react';

const Contact = (props) => {
    const host = 'http://localhost:5000';
    const [formData, setFormData] = useState({full_name: "", email: "", message:""});
    
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});        
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const contactFormData = {full_name: formData.full_name, email: formData.email, message: formData.message};
        
        axios.post(`${host}/api/common/contact`, contactFormData, {
            headers: {
                'Content-Type': 'application/json'
            } 
        })
        .then(response => {
            if(response.data.success){
                props.showAlert('Message sent successfully. We will get back to you with in 24 hours.', 'success');
            }else{
                alert('Something went wrong. Please after some time.')
            }
        })
        .catch(function (error) {
            if(!error.response.data.success){
                props.showAlert(error.response.data.message, 'danger');
            }
        })
    }

    return (
        <div className="container my-3">
            <section className="" style={{backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-8 col-lg-8 d-flex align-items-center" style={{margin:'auto'}}>
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={handleSubmit}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-envelope fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                    <span className="h2 fw-bold mb-0">Contact Us</span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Let us know if you have any question!</h5>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="full_name" name='full_name' className="form-control form-control-lg" onChange={handleChange} />
                                                    <label className="form-label" htmlFor="form2Example17">Full Name</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="email" id="email" name='email' className="form-control form-control-lg" onChange={handleChange} />
                                                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <textarea id="message" name='message' className="form-control form-control-lg" onChange={handleChange}>
                                                    </textarea>
                                                    <label className="form-label" htmlFor="message">Message</label>
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Send message</button>
                                                </div>

                                                {/*<a className="small text-muted" href="#!">Forgot password?</a>
                                                <p className="mb-5 pb-lg-2" style={{ "color": "#393f81" }}>Don't have an account? <a href="#!" style={{ "color": "#393f81" }}>Register here</a></p>*/}
                                               
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact;