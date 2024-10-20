import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';
import Services from '../../Services/admin.services';
import './css/SubjectList.css';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await Services.getAllSubject();
      setSubjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await Services.DeleteSubject(id);
      // Remove the deleted subject from the state
      setSubjects(subjects.filter(subject => subject.subjectId !== id));
      setSuccessMessage('Subject deleted successfully!');
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const handleAddSubject = () => {
    window.location.href = '/Admin/AddSubject'; // Navigate to the AddSubject page
  };

  return (
    <div>
      <AdminNavBar />
      <div className="course-list-container">
        <h2>Subject List</h2>
        <div className="button-container">
          <button className="add-subject-button" onClick={handleAddSubject}>Add Subject</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Subject ID</th>
                <th>Subject Name</th>
                <th>Action</th> {/* Added column for delete action */}
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.subjectId}>
                  <td>{subject.subjectId}</td>
                  <td>{subject.subjectName}</td>
                  <td>
                    <button onClick={() => handleDeleteSubject(subject.subjectId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SubjectList;
