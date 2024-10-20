import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoading from "../PageLoading";
import "../../App.css";

function UserNavBar() {
    const [loading, setLoading] = useState(false);
    const [object, setObject] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        var val = localStorage.getItem('user-token');
        var object = JSON.parse(val);
        setObject(object[0]);
    };

    const logout = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            localStorage.removeItem('user-token');
            console.log('Logged Out');
            navigate('/');
        }, 3500);
    };

    return (
        <div >
            {loading ? "" :
                <nav className="navbar navbar-expand-lg py-0" style={{ backgroundColor: '#e3f2fd' }}>
                    <div className="container">
                        <a href="/user" className="navbar-brand">
                            <h3 className="logoname">Home</h3>
                        </a>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav">
                                <a href="/user/Quiz" className="nav-item nav-link active fw-bolder myHover" style={{ letterSpacing: '1px' }}>Quiz</a>
                            </div>
                            {/* <div className="navbar-nav">
                                <a href="/student/update/{id}" className="nav-item nav-link active fw-bolder myHover" style={{ letterSpacing: '1px' }}>Update Student</a>
                            </div> */}
                            <div className="navbar-nav">
                                <a href="/user/marks" className="nav-item nav-link active fw-bolder myHover ms-2" style={{ letterSpacing: '1px' }}>Marks</a>
                            </div>
                            {/* <div className="navbar-nav">
                                <a href="/Student/Add" className="nav-item nav-link active fw-bolder myHover ms-2" style={{ letterSpacing: '1px' }}>Register Student</a>
                            </div> */}
                            <div className="navbar-nav dropdown ms-auto">
                                <a className="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-center">
                                    <li><a className="dropdown-item text-center" href="/user/StudentProfile"> <i class="fa fa-user-o" aria-hidden="true"></i> Profile</a></li>
                                    <li><a className="dropdown-item text-center" href="#" onClick={logout}> <i class="fa fa-power-off" aria-hidden="true"></i> LogOut</a></li>
                                </ul>
                                <a className="nav-item nav-link active fw-bolder text-black" style={{ letterSpacing: '1px' }}>{object.firstName }</a>
                            </div>
                        </div>
                    </div>
                </nav>
            }
            {loading ? navigate('/pageload') : ""}
        </div>
    );
}

export default UserNavBar;
