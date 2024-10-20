import React, { useState, useEffect } from 'react';
import Services from '../../Services/admin.services';
import { useNavigate } from "react-router-dom";
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';
import './css/CreateQuiz.css'
const CreateQuiz = () => {
  const [category, setCategory] = useState('');
  const [numQ, setNumQ] = useState('');
  const [title, setTitle] = useState('');
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch subjects when component mounts
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await Services.getAllSubject();
      setSubjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleCreateQuiz = async () => {
    try {
      await Services.CreateQuiz(category, numQ, title);
      // Assuming quiz creation is successful, navigate to some success page or route
      navigate('/admin');
    } catch (error) {
      // Handle error, show message or log it
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="create-quiz-form">
        <h2>Create Quiz</h2>
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.subjectName}>{subject.subjectName}</option>
            ))}
          </select>
        </label>
        <label>
          Number of Questions:
          <input type="number" value={numQ} onChange={e => setNumQ(e.target.value)} />
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <button onClick={handleCreateQuiz}>Create Quiz</button>
      </div>
      <Footer />
    </div>
  );
};

export default CreateQuiz;
