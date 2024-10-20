// AllQuestions.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import toast from "react-hot-toast";
import adminServices from "../../Services/admin.services";
import Footer from "../Footer";
import "./css/AllQuestion.css"; // Import the CSS file

const AllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for showing success popup
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      const response = await adminServices.GetAllQuestion();
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to fetch questions");
    }
  };

  const handleAddQuestion = async () => {
    try {
      // Navigate to the "Add Question" page
      navigate("/Admin/AddQuestion");
    } catch (error) {
      console.error("Error navigating to add question page:", error);
      toast.error("Failed to navigate to add question page");
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="all-questions-container">
        <h2>All Questions</h2>
        <button className="add-question-button" onClick={handleAddQuestion}>Add Question</button>
        <ul>
          {questions.map((question, index) => (
            <li key={question.id}>
              <p>Question {index + 1}: {question.questionTitle}</p>
              <p> 1: {question.option1}</p>
              <p> 2: {question.option2}</p>
              <p> 3: {question.option3}</p>
              <p> 4: {question.option4}</p>
              <p> <b>Correct Answer: {question.rightAnswer}</b></p>
              <p>Category: {question.category}</p>
            </li>
          ))}
        </ul>
      </div>
      {showSuccessPopup && (
        <div className="success-popup">
          <p>Question added successfully!</p>
          <button onClick={() => setShowSuccessPopup(false)}>Close</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AllQuestions;
