import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';
import Services from '../../Services/admin.services';
import './css/CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await Services.GetCourse();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await Services.DeleteCourse(courseId);
      // After deletion, fetch courses again to update the list
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="container">
        <h2>Course List</h2>
        <Link to="/Admin/AddCourse" className="add-course-btn">Add Course</Link>
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Action</th> {/* Add a column for delete button */}
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.courseId}</td>
                <td>{course.courseName}</td>
                <td>
                  <button onClick={() => handleDeleteCourse(course.courseId)}>Delete</button> {/* Delete button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default CourseList;
