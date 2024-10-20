package com.spms.quizapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import java.util.List;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.spms.quizapp.dao.QuestionDao;
import com.spms.quizapp.dao.StudentDao;
import com.spms.quizapp.model.Question;
//
//import com.telusko.quizapp.model.Question;
//import com.telusko.quizapp.model.Quiz;
//import com.telusko.quizapp.model.Student;
import com.spms.quizapp.model.StudentResult;

//import movie_api.entity.Movie;

@Service
public class StudentService {
	@Autowired
	StudentDao dao;
	
	
	@Autowired
    StudentDao Dao;

    public ResponseEntity<List<StudentResult>> getAllResult() {
        try {
            return new ResponseEntity<>(Dao.findAll(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<StudentResult>> getResultByStudent(Integer id) {
        List<StudentResult> results = dao.findByStudent(id);
        if (!results.isEmpty()) {
            return ResponseEntity.ok(results); // Return the list of results
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if no results found
        }
    }
	
	
	public void addMarks(int StudentId, int QuizId, int marks) {


		StudentResult s = new StudentResult();
        s.setStudentId(StudentId);
        s.setQuizId(QuizId);
        s.setMarks(marks);
        dao.save(s);

    }

}
