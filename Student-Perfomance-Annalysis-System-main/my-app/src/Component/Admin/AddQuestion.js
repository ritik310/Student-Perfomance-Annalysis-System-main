import React, { useState, useEffect } from 'react';
import Services from '../../Services/admin.services';
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';
import './css/AddQuestion.css'; // Import the CSS file

const CreateQuestion = () => {
  const initialQuestionData = {
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    difficultyLevel: '', // Modified to store difficulty level
    category: ''
  };

  const [questionData, setQuestionData] = useState(initialQuestionData);
  const [categories, setCategories] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await Services.getAllSubject();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddQuestion = async () => {
    try {
      await Services.AddQuestion(questionData);
      console.log('Question added successfully');
      setSuccessPopup(true);
      setQuestionData(initialQuestionData); // Reset questionData to initial state
    } catch (error) {
      console.error('Error adding question:', error);
      setErrorPopup(true);
    }
  };

  const handleClosePopup = () => {
    setSuccessPopup(false);
    setErrorPopup(false);
    setQuestionData(initialQuestionData); // Reset questionData to initial state
  };

  return (
    <div>
      <AdminNavBar />
      <div className="create-question-container">
        <h2>Add Question</h2>
        <label>
          Question Title:
          <input type="text" name="questionTitle" value={questionData.questionTitle} onChange={handleChange} />
        </label>
        <label>
          Option 1:
          <input type="text" name="option1" value={questionData.option1} onChange={handleChange} />
        </label>
        <label>
          Option 2:
          <input type="text" name="option2" value={questionData.option2} onChange={handleChange} />
        </label>
        <label>
          Option 3:
          <input type="text" name="option3" value={questionData.option3} onChange={handleChange} />
        </label>
        <label>
          Option 4:
          <input type="text" name="option4" value={questionData.option4} onChange={handleChange} />
        </label>
        <label>
          Right Answer:
          <input type="text" name="rightAnswer" value={questionData.rightAnswer} onChange={handleChange} />
        </label>
        <label>
          Difficulty Level:
          <select name="difficultyLevel" value={questionData.difficultyLevel} onChange={handleChange}>
            <option value="">Select Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Category:
          <select name="category" value={questionData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.subjectName}>{category.subjectName}</option>
            ))}
          </select>
        </label>
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      {successPopup && (
        <div className="success-popup">
          <p>Question added successfully!</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
      {errorPopup && (
        <div className="error-popup">
          <p>Error adding question. Please try again.</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default CreateQuestion;
