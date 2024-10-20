import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import toast from "react-hot-toast";
import adminServices from "../../Services/admin.services";
import Footer from "../Footer";
import './css/QuestionsByCategory.css';

const QuestionsByCategory = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await adminServices.getAllSubject();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const fetchQuestionsByCategory = async (category) => {
    try {
      const response = await adminServices.GetQuestionByCategory(category);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions by category:", error);
      toast.error("Failed to fetch questions by category");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    fetchQuestionsByCategory(selectedCategory); // Call fetchQuestionsByCategory when the category changes
  };

  return (
    <div>
      <AdminNavBar />
      <div className="questions-by-category-container">
        <h2>Questions By Category</h2>
        <div>
          <label>Select Category: </label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.subjectId} value={category.subjectName}>{category.subjectName}</option>
              ))}
          </select>
        </div>
        <ul>
          {questions.map((question, index) => (
            <li key={question.id}>
              <p>Question {index + 1}: {question.questionTitle}</p>
              <p> 1: {question.option1}</p>
              <p> 2: {question.option2}</p>
              <p> 3: {question.option3}</p>
              <p> 4: {question.option4}</p>
              <p><b>Correct Answer: {question.rightAnswer}</b></p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionsByCategory;
