import React, { useEffect, useState } from 'react';
import Services from '../../Services/admin.services';
import { useNavigate } from "react-router-dom";
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';

function AdminList() {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    const init = () => {
        Services.GetAdminDetail()
            .then(response => {
                console.log('Printing Admins data', response.data);
                setAdmins(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (name) => {
        console.log('Printing userName', name);
        Services.DeleteAdmin(name)
            .then(response => {
                console.log('Admin deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div style={{ backgroundImage: `url(https://wallpapercave.com/wp/wp2508363.jpg)`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <AdminNavBar />
            <div className="container">
                <h3 className="my-1 mt-5 text-center text-primary fw-bold">List of Admins</h3>
                <hr />
                <div>
                    <button type="button" className="btn btn-info mb-3" onClick={() => { navigate("/admin") }}> <i className="fa fa-home" aria-hidden="true"></i> Go To Back Page</button>
                    <button type="button" className="btn btn-primary mb-3 float-end" onClick={() => navigate('/Admin/RegisterAdmin')}> <i className="fa fa-plus-circle" aria-hidden="true"></i> Register Admin</button>
                    
                    <table className="table table-bordered table-striped text-center">
                        <thead className="thead-dark">
                            <tr className="table-primary">
                                <th>User Name</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th className='text-center'>Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                admins.map(admin => (
                                    <tr key={admin.userName}>
                                        <td>{admin.userName}</td>
                                        <td>{admin.name}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.password}</td>
                                        <td className='text-center'>
                                            <button className="btn btn-danger ml-2" onClick={() => handleDelete(admin.userName)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Footer placed outside the container */}
            <Footer />
        </div>
    );
}

export default AdminList;
