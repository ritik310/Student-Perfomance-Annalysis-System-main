import { useEffect, useState } from "react";
import UserNavBar from "./UserNavBar"; // Assuming you have a StudentNavBar component
import toast from "react-hot-toast";
import Services from "../../Services/User.services";
import Footer from "../Footer";
import "./css/GetAllQuiz.css"; // Import CSS file for styling
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const GetAllQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await Services.GetAllQuiz();
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        toast.error("Error fetching quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <UserNavBar /> {/* Assuming this component exists */}
      <div>
        <h2>Quizzes</h2>
        <table className="quiz-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>
                  {/* Wrap quiz ID with Link */}
                  <Link to={`/user/QuizExam/${quiz.id}`}>
                    {quiz.id}
                  </Link>
                </td>
                <td>{quiz.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer /> {/* Assuming this component exists */}
    </div>
  );
};

export default GetAllQuiz;
