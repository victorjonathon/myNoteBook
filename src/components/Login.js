import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginLeftImg from '../img/login-left-img.webp';

const Login = (props) => {
    const host = 'http://localhost:5000';
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();
    
    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});        
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const loginReqData = {email: credentials.email, password: credentials.password};

        axios.post(`${host}/api/auth/login`, loginReqData, {
            headers: {
                'Content-Type': 'application/json'
            } 
        })
        .then(response => {
            /*!response.data.success && setfailedLogin(true);*/
            if(response.data.success){
                localStorage.setItem('token', response.data.authtoken);
                navigate('/');
                props.showAlert('Login successful.', 'success');
            }else{
                alert('Wrong email or password!')
            }
            console.log(response.data);
        })
        .catch(function (error) {
            if(!error.response.data.success){
                //alert(error.response.data.message)
                props.showAlert(error.response.data.message, 'danger');
            }
        })
    }

    return (
        <div className="container my-3">
            <section className="vh-100" style={{backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src={loginLeftImg}
                                            alt="login form"
                                            className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                        {/*<div class="my-2 text-danger text-center">Wrong email password!</div>*/}
                                            <form onSubmit={handleSubmit}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                    <span className="h2 fw-bold mb-0">Login to MyNoteBook</span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                                                <div className="form-outline mb-4">
                                                    <input type="email" id="form2Example17" name='email' className="form-control form-control-lg" onChange={handleChange} />
                                                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="password" id="form2Example27" name='password' className="form-control form-control-lg" onChange={handleChange} />
                                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
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

export default Login;