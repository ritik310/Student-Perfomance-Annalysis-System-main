package com.spms.quizapp.dao;

import java.util.List;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

//import com.telusko.quizapp.model.Question;
//import com.telusko.quizapp.model.Question;
//import com.telusko.quizapp.model.Student;
import com.spms.quizapp.model.StudentResult;

public interface StudentDao extends JpaRepository<StudentResult, Integer> {
	@Query(value = "SELECT * FROM student_result q WHERE q.student_id = :id", nativeQuery = true)
    List<StudentResult> findByStudent(Integer id);

}
