import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImg from '../img/signup-img.webp';
//import tmpImg from 'user-profile/13_postweddingshoot01-0a88c37c062f6dfff731ffe9adda6c54.jpg';

const Profile = (props) => {
    const navigate = useNavigate();
    const host = 'http://localhost:5000';
    const [userData, setUserData] = useState({ name: "", email: "", picture: "", ePicture: "" });

    if (!localStorage.getItem('token')) {
        navigate('/login');
        props.showAlert('Please login to access myNoteBook', 'danger')
    }

    useEffect(() => {
        axios.post(`${host}/api/auth/getuser`, {} , {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    setUserData({name:response.data.user.name, email: response.data.user.email, picture: response.data.user.picture})
                } else {
                    alert('Something went wrong. Please try again later!')
                }
            })
            .catch(function (error) {
                if (!error.response.data.success) {
                    props.showAlert(error.response.data.message, 'danger');
                }
            })
    }, [])


    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    const handleFileChange = (e) => {
        setUserData({ ...userData, ePicture: e.target.files[0] });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let profileReqData = new FormData();
        profileReqData.append('name', userData.name);
        profileReqData.append('email', userData.email);
        profileReqData.append('picture', userData.ePicture);
       
        axios.put(`${host}/api/auth/updateuser`, profileReqData, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data.success) {
                    props.showAlert(response.data.message, 'success');
                } else {
                    props.showAlert('Something went wrong. Please try again later!', 'danger');
                }
            })
            .catch(function (error) {
                if (!error.response.data.success) {
                    props.showAlert(error.response.data.message, 'danger');
                }
            })
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Profile Details</p>
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <form className="mx-1 mx-md-4" encType='multipart/form-data' onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" name='name' className="form-control" value={userData.name} minLength={3} onChange={handleChange} required />
                                                    <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" name='email' className="form-control" value={userData.email} onChange={handleChange} required />
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="file" id="pic" name='picture' className="form-control" onChange={handleFileChange} />
                                                    <label className="form-label" htmlFor="form3Example3c">Profile Picture</label>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Update Profile</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src={userData.picture ? 'user-profile/'+userData.picture : signupImg} className="img-fluid mb-3 rounded img-thumbnail" alt="signup form" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;