import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';
import Services from '../../Services/admin.services'; // Import the appropriate service
// import './AddCourse.css'; // Import CSS for styling if needed

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    courseId: '',
    courseName: ''
    // Add other properties as needed
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Services.AddCourse(courseData); // Assuming AddCourse function exists in admin.services
      console.log('Course added successfully');
      setShowSuccessPopup(true); // Show success popup
      navigate('/admin'); // Navigate to the admin page after successful addition
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(`${courseData.courseId} already exists.`);
      } else {
        setErrorMessage('Failed to add course. Please try again.');
      }
      console.error('Error adding course:', error);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div>
      <AdminNavBar />
      <div className="container">
        <h2>Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course ID</label>
            <input type="text" name="courseId" value={courseData.courseId} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Course Name</label>
            <input type="text" name="courseName" value={courseData.courseName} onChange={handleChange} className="form-control" required />
          </div>
          {/* Add other form fields as needed */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary">Add Course</button>
        </form>
      </div>
      <Footer />
      {/* Success popup */}
      {showSuccessPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <p>Course added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
