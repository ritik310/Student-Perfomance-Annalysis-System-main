import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import toast from "react-hot-toast";
import adminServices from "../../Services/admin.services";
import Footer from "../Footer";
import "./css/AllStudentResults.css"
const AllStudentResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchAllResults();
  }, []);

  const fetchAllResults = async () => {
    try {
      const response = await adminServices.GetAllStudentResult();
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching student results:", error);
      toast.error("Failed to fetch student results");
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div className="all-student-results-container">
        <h2>All Student Results</h2>
        <table>
          <thead>
            <tr>
              <th>Mark ID</th>
              <th>Quiz ID</th>
              <th>Marks</th>
              <th>Student ID</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.markid}>
                <td>{result.markid}</td>
                <td>{result.quizId}</td>
                <td>{result.marks}</td>
                <td>{result.studentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AllStudentResults;
