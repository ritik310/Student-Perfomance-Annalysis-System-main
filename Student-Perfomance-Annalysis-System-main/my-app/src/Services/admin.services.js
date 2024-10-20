import httpClient from '../http-common';
import httpQuiz from '../http-quiz';
const login = (data,page) => {
  return httpClient.post('/login/'+page, data);
};

const registerStudent =(data) => {
  return  httpClient.post('/student',data)
}

const DeleteStudent =(id) => {
  return httpClient.delete(`/student/${id}`);
}

const UpdateStudent = (id,student )=> {
  return httpClient.put(`/student/${id}`,student);
}

const GetStudent =() => {
  return httpClient.get('/student');
}

const GetStudentById = (id) => {
  return httpClient.get(`/student/${id}`)
}

const GetAdminDetail = () => {
  return httpClient.get('/admin');
}

const UpdateAdmin = (UserName,data) => {
  return httpClient.put(`/admin/${UserName}`,data);
}

const RegisterAdmin = (data)=>
{
  return httpClient.post('/admin',data);
}

const DeleteAdmin =(name) =>
{
  return httpClient.delete(`/admin/${name}`);
}

const GetCourse = ()=>
{
  return httpClient.get('course');
}

const AddCourse = (data) =>
{
  return httpClient.post('course',data)
}

const DeleteCourse = (id) =>
{
  return httpClient.delete(`course/${id}`)
}

const AddSubject = (id,data) =>
{
  return httpClient.post(`course/${id}`,data)
}



const CreateQuiz = (category, numQ, title) => {
  return httpQuiz.post(`/create?category=${category}&numQ=${numQ}&title=${title}`);
}


const getAllSubject =()=> {
  return httpClient.get('/subject')
}

const  DeleteSubject = (id) =>
{
  return httpClient.delete(`/subject/${id}`)
}
const AddQuestion =(data) => {
  return httpQuiz.post('/add',data)
}

const GetAllQuestion = () => {
  return httpQuiz.get('allQuestions')
}

const GetQuestionByCategory = (category) =>{
  return httpQuiz.get(`category/${category}`)
}

const GetAllStudentResult = () => {
  return httpQuiz.get('allResult')
}

const GetStudentResultById = (id) =>{
  return httpQuiz.get(`student/${id}`)
}

export default {login,GetStudent,UpdateStudent,DeleteStudent,registerStudent,
  DeleteAdmin,GetAdminDetail,UpdateAdmin,GetStudentById,RegisterAdmin,CreateQuiz,getAllSubject,AddQuestion,GetAllQuestion,GetQuestionByCategory,GetAllStudentResult,GetStudentResultById,AddCourse,GetCourse,DeleteCourse,AddSubject,DeleteSubject};