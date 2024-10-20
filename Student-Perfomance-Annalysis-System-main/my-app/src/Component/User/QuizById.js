// GetQuizById.js

import React, { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import toast from "react-hot-toast";
import Services from "../../Services/User.services";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import "./css/GetQuizById.css"; // Import CSS file for styling

const GetQuizById = () => {
  const { id } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await Services.GetQuizById(id);
        setQuizQuestions(response.data);
        const initialAnswers = response.data.reduce((acc, question) => {
          acc[question.id] = { id: question.id, response: "" };
          return acc;
        }, {});
        setSelectedAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        toast.error("Error fetching quiz questions");
      }
    };

    fetchQuizQuestions();
  }, [id]);

  useEffect(() => {
    // Retrieve studentId from localStorage
    const val = localStorage.getItem("user-token");
    const object = JSON.parse(val);
    setStudentId(object[0].studentId);
  }, []);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: { ...prevState[questionId], response: selectedOption },
    }));
  };

  const handleSubmit = async () => {
    try {
      const responses = Object.values(selectedAnswers);
      await Services.SubmitQuiz(id, studentId, responses);
      console.log("Quiz submitted successfully");
      // Optionally, you can navigate to another page or show a success message
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Error submitting quiz");
    }
  };

  return (
    <div>
      <UserNavBar />
      <div className="quiz-container">
        <h2>Quiz Questions for Quiz ID: {id}</h2>
        <ul>
          {quizQuestions.map((question, index) => (
            <li key={question.id}>
              <div className="quiz-question">
                <h3>Question {index + 1}: {question.questionTitle}</h3>
                <ul className="quiz-options">
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={question.option1}
                        checked={selectedAnswers[question.id].response === question.option1}
                        onChange={() => handleAnswerSelect(question.id, question.option1)}
                      />
                      {question.option1}
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={question.option2}
                        checked={selectedAnswers[question.id].response === question.option2}
                        onChange={() => handleAnswerSelect(question.id, question.option2)}
                      />
                      {question.option2}
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={question.option3}
                        checked={selectedAnswers[question.id].response === question.option3}
                        onChange={() => handleAnswerSelect(question.id, question.option3)}
                      />
                      {question.option3}
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={question.option4}
                        checked={selectedAnswers[question.id].response === question.option4}
                        onChange={() => handleAnswerSelect(question.id, question.option4)}
                      />
                      {question.option4}
                    </label>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <button className="submit-button" onClick={handleSubmit}>Submit Quiz</button>
      </div>
    </div>
  );
};

export default GetQuizById;
