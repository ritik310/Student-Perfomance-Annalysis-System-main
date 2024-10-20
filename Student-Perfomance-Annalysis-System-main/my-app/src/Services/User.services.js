import httpClient from '../http-common';
import httpQuiz from '../http-quiz';
const GetStudent =() => {
    return httpClient.get('/student');
  }
  const GetAllQuiz = () => 
  {
    return httpQuiz.get('getAllQuiz')
  }
  
  const GetQuizById = (id)=>
  {
    return httpQuiz.get(`get/${id}`)
  }

  const SubmitQuiz = (quizId, studentId, responses) => {
    return httpQuiz.post(`submit?id=${quizId}&StudentId=${studentId}`, responses);
  }
  const GetStudentResultById = (id) =>{
    return httpQuiz.get(`student/${id}`)
  }
  
  
  export default {GetStudent,GetAllQuiz,GetQuizById,SubmitQuiz,GetStudentResultById};