import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
        props.showAlert('Logged out successfully!', 'success');
    }
  
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : '' }`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : '' }`} to="/about">About</Link>
                        </li>
                    </ul>
                    
                    {(!localStorage.getItem('token')) ? 
                        <div>
                            <Link className={`btn btn-primary btn-sm mx-2`} to="/login">Login</Link>
                            <Link className={`btn btn-primary btn-sm mx-2`} to="/signup">Signup</Link>
                        </div>
                      :
                      <li className="nav-item dropdown">
                        <button className="btn btn-sm btn-primary text-light nav-link dropdown-toggle mx-2" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Welcome abord
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li className="dropdown-item cursor-pointer" onClick={handleLogout}>Logout</li>
                        </ul>
                        </li>
                    } 
                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar;