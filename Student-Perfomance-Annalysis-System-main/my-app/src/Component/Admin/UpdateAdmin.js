import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Services from '../../Services/admin.services';
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';

function UpdateAdmin() {
    const { UserName } = useParams();
    const [admin, setAdmin] = useState({
        UserName: '',
        Email: '',
        Password: '',
        Name: ''
    });

    useEffect(() => {
        // Fetch the admin data from the server and populate the form
        const fetchAdmin = async () => {
            try {
                const response = await Services.getAdminByName(UserName);
                setAdmin(response.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdmin();
    }, [UserName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Services.updateAdmin(UserName, admin);
            // Redirect or show success message
        } catch (error) {
            console.error('Error updating admin:', error);
            // Handle error, e.g., display error message to the user
        }
    };

    return (
        <>
            <AdminNavBar />
            <div className="container mt-4">
                <h2>Update Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="UserName" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="UserName" name="UserName" value={admin.UserName} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="Email" name="Email" value={admin.Email} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Password" name="Password" value={admin.Password} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="Name" name="Name" value={admin.Name} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default UpdateAdmin;

