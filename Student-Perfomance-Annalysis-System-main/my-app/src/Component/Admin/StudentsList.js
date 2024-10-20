import React, { useEffect, useState } from 'react';
import Services from '../../Services/admin.services';
import { useNavigate } from "react-router-dom";
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';
import './css/StudentList.css'

function StudentList() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentMarks, setStudentMarks] = useState(null);
    const navigate = useNavigate();

    const init = () => {
        Services.GetStudent()
            .then(response => {
                console.log('Printing Students data', response.data);
                setStudents(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        Services.DeleteStudent(id)
            .then(response => {
                console.log('employee deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const handleUpdate = (id) => {
        navigate(`/student/update/${id}`);
    };

    const fetchStudentMarks = async (id) => {
        try {
            const response = await Services.GetStudentResultById(id);
            console.log('Printing student marks:', response.data);
            setStudentMarks(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Student has not given any test.');
                setStudentMarks([{ markid: "N/A", quizId: "N/A", marks: "N/A", studentId: "N/A" }]);
            } else {
                console.error('Error fetching student marks:', error);
            }
        }
    };

    const handleViewMarks = (student) => {
        setSelectedStudent(student);
        fetchStudentMarks(student.studentId);
    };

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 className="my-1 mt-5 text-center text-primary fw-bold">List of Students</h3>
                <hr />
                <div>
                    <table className="table table-bordered table-striped text-center">
                        <thead className="thead-dark">
                            <tr className="table-primary">
                                <th>Student Id</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>Mobile No</th>
                                <th>Email</th>
                                <th>Sex</th>
                                <th>Course</th>
                                <th>Batch</th>
                                <th>DOB</th>
                                <th className='text-center'>Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(f => (
                                <tr key={f.studentId}>
                                    <td>{f.studentId}</td>
                                    <td>{f.firstName}</td>
                                    <td>{f.middleName}</td>
                                    <td>{f.lastName}</td>
                                    <td>{f.mobile}</td>
                                    <td>{f.email}</td>
                                    <td>{f.sex}</td>
                                    <td>{f.courseName}</td>
                                    <td>{f.batch}</td>
                                    <td>{f.dob}</td>
                                    <td className='text-center'>
                                        <button type="button" className="btn btn-info mx-1" onClick={() => handleUpdate(f.studentId)}>Update</button>
                                        <button className="btn btn-danger ml-2" onClick={() => handleDelete(f.studentId)}>Delete</button>
                                        <button className="btn btn-success mx-1" onClick={() => handleViewMarks(f)}>View Marks</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Popup to display student marks */}
                    {selectedStudent && studentMarks !== null && (
                        <div className="popup">
                            <div className="popup-content">
                                <button className="close" onClick={() => setSelectedStudent(null)}>×</button>
                                <h2>Student Marks - {selectedStudent.firstName} {selectedStudent.lastName}</h2>
                                {studentMarks.length > 0 ? (
                                    <table className="table table-bordered table-striped text-center">
                                        <thead className="thead-dark">
                                            <tr className="table-primary">
                                                <th>Mark ID</th>
                                                <th>Quiz ID</th>
                                                <th>Marks</th>
                                                <th>Student ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentMarks.map((mark, index) => (
                                                <tr key={index}>
                                                    <td>{mark.markid}</td>
                                                    <td>{mark.quizId}</td>
                                                    <td>{mark.marks}</td>
                                                    <td>{mark.studentId}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Student has not given any test.</p>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default StudentList;
