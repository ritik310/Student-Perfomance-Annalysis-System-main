// StudentResult.js

import React, { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar";
import toast from "react-hot-toast";
import Services from "../../Services/User.services";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import './css/StudentResult.css';

const StudentResult = () => {
  const [studentId, setStudentId] = useState("");
  const [studentResults, setStudentResults] = useState([]);
  
  // Retrieve studentId from localStorage
  useEffect(() => {
    const fetchStudentResults = async () => {
      try {
        const val = localStorage.getItem("user-token");
        const object = JSON.parse(val);
        setStudentId(object[0].studentId);
        const response = await Services.GetStudentResultById(studentId);
        setStudentResults(response.data);
      } catch (error) {
        console.error("Error fetching student results:", error);
        // toast.error("Error fetching student results");
      }
    };

    fetchStudentResults();
  }, [studentId]);

  return (
    <div>
      <UserNavBar />
      <div>
        <h2>Student Results for Student ID: {studentId}</h2>
        <table>
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {studentResults.map((result) => (
              <tr key={result.markid}>
                <td>{result.quizId}</td>
                <td>{result.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default StudentResult;
