
import './App.css';
// import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Component/LoginForm";
import Admin from './Component/Admin/Admin';

import Register from './Component/Register';
import  { Toaster } from 'react-hot-toast';
import PageLoading from './Component/PageLoading';
import AdminProtectedRoutes from './Component/AdminPrivateRoutes';
import StudentList from './Component/Admin/StudentsList';
import AdminProfile from './Component/Admin/AdminProfile';
import UpdateStudent from './Component/Admin/UpdateStudent';
import UpdateAdmin from './Component/Admin/UpdateAdmin';
import User from './Component/User/User';
import UserPrivateRoutes from './Component/UserPrivateRoutes';
import StudentProfile from './Component/User/StudentProfile';
import AdminList from './Component/Admin/AdminList';
import RegisterAdmin from './Component/RegisterAdmin';
import CreateQuiz from './Component/Admin/CreateQuiz';
import AddQuestion from './Component/Admin/AddQuestion';
import AllQuestion from './Component/Admin/AllQuestion';
import QuestionsByCategory from './Component/Admin/QuestionByCategory';
import AllStudentResults from './Component/Admin/AllStudentResult';
import AddCourse from './Component/Admin/AddCourse';
import CourseList from './Component/Admin/CourseList';
import AddSubject from './Component/Admin/AddSubject';
import SubjectList from './Component/Admin/SubjectList';
import GetAllQuiz from './Component/User/GetAllQuiz';
import GetQuizById from './Component/User/QuizById';
import StudentResult from './Component/User/StudentResult';
function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2200,
        }}
      />
        <Routes>

<Route exact path="/" element={<LoginForm />} />
<Route path='/register' element={<Register />} />
<Route path='/pageload' element={<PageLoading />} />

<Route element={<AdminProtectedRoutes />} >

  <Route path='/admin' element={<Admin />} />
  <Route path='/admin/StudentList' element={<StudentList/>} />
  <Route path='/admin/AdminData' element={<AdminProfile/>} />
  <Route path='/student/Add' element={<Register/>} />
  <Route path='/student/update/:id' element={<UpdateStudent/>} />
  <Route path='/admin/:UserName' element={<UpdateAdmin/>} />
  <Route path='/Admin/AdminList' element={<AdminList/>} />
  <Route path='/Admin/RegisterAdmin' element={<RegisterAdmin/>} />
  <Route path='/Admin/CreateQuiz' element={<CreateQuiz/>} />
  <Route path='/Admin/AddQuestion' element={<AddQuestion/>} />
  <Route path='/Admin/AllQuestions' element={<AllQuestion/>} />
  <Route path='/Admin/QuestionByCategory' element={<QuestionsByCategory />}/>
  <Route path='/Admin/Result' element={<AllStudentResults />}/>
  <Route path='/Admin/AddCourse' element={<AddCourse />}/>
  <Route path='/Admin/CourseList' element={<CourseList />}/>
  <Route path='/Admin/AddSubject' element={<AddSubject />}/>
  <Route path='/Admin/AllSubject' element={<SubjectList />} />
</Route>
<Route element={< UserPrivateRoutes />}>

          <Route path='/user' element={<User />} />
          <Route path='/user/StudentProfile' element={<StudentProfile/>} />
          <Route path='/user/Quiz' element={<GetAllQuiz />}/>
          <Route path='/user/QuizExam/:id' element={<GetQuizById />}/>
          <Route path='/user/marks' element={<StudentResult />}/>
          {/* <Route path='/user/Update' element={<Update />} />
          <Route path='/user/Delete' element={<Delete />} />
          <Route path='/user/AddStudent' element={<AddStudent />} />
          <Route path='/user/DeleteStudent' element={<DeleteStudent />} /> */}

        </Route> 
 
</Routes>
    </BrowserRouter>
    
  );
}

export default App;
