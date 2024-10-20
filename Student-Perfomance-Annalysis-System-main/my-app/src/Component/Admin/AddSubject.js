import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';
import Services from '../../Services/admin.services'; // Import the appropriate service
// import './AddCourse.css'; // Import CSS for styling if needed
import './css/AddSubject.css';

const AddSubject = () => {
  const [subjectId, setSubjectId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await Services.GetCourse();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setMessage('Failed to fetch courses. Please try again later.');
    }
  };

  const handleSubjectIdChange = (event) => {
    setSubjectId(event.target.value);
  };

  const handleSubjectNameChange = (event) => {
    setSubjectName(event.target.value);
  };

  const handleCourseIdChange = (event) => {
    const courseIdValue = parseInt(event.target.value);
    setCourseId(courseIdValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const subjectData = {
        subjectId: subjectId,
        subjectName: subjectName
      };
      
      const response = await Services.AddSubject(courseId, [subjectData]);
      if (response && response.data) {
        setMessage('Subject added successfully!');
        setSubjectId('');
        setSubjectName('');
        setCourseId('');
      } else {
        setMessage('Failed to add subject. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <div>
      <AdminNavBar />
      <div className="add-subject-container">
      <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', color: '#333' }}>Add Subject to Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseId">Select Course:</label>
            <select
              id="courseId"
              value={courseId}
              onChange={handleCourseIdChange}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>{course.courseName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subjectId">Subject ID:</label>
            <input
              type="text"
              id="subjectId"
              value={subjectId}
              onChange={handleSubjectIdChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subjectName">Subject Name:</label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={handleSubjectNameChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>Add Subject</button>
        </form>
        {loading && <p>Loading...</p>}
        {message && (
            <p className={message.startsWith('Failed') ? 'error-message' : 'success-message'}>
        {message}
  </p>
)}

      </div>
      <Footer />
    </div>
  );
};

export default AddSubject;
