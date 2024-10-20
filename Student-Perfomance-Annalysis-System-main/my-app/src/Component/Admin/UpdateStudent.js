import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Services from '../../Services/admin.services';
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';

function UpdateStudent() {
    const { id } = useParams();
    const [student, setStudent] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobile: '',
        dob: '',
        sex:'',
        courseName:'',
        batch:''
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                console.log(typeof id)
                const response = await Services.GetStudentById(id);
                setStudent(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Services.UpdateStudent(id, student);
            window.location.href = '/admin/StudentList'; // Redirect after successful update
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <>
            <AdminNavBar />
            <div className="container mt-4">
                <h2>Update Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" name="firstName" value={student.firstName} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input type="text" className="form-control" id="middleName" name="middleName" value={student.middleName} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" value={student.lastName} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={student.email} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="mobile" className="form-control" id="mobile" name="mobile" value={student.mobile} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">DOB</label>
                        <input type="dob" className="form-control" id="dob" name="dob" value={student.dob} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sex" className="form-label">Sex</label>
                        <input type="sex" className="form-control" id="sex" name="sex" value={student.sex} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="batch" className="form-label">Batch</label>
                        <input type="batch" className="form-control" id="batch" name="batch" value={student.batch} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="courseName" className="form-label">CourseName</label>
                        <input type="courseName" className="form-control" id="courseName" name="courseName" value={student.courseName} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default UpdateStudent;
