package com.spms.quizapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spms.quizapp.model.StudentResult;
import com.spms.quizapp.service.StudentService;
@CrossOrigin("*")
@RestController
@RequestMapping("api")
public class StudentResultController {
	
	@Autowired
    StudentService sService;

    @GetMapping("allResult")
    public ResponseEntity<List<StudentResult>> getAllResult(){
        return sService.getAllResult();
    }

    @GetMapping("student/{id}")
    public ResponseEntity<List<StudentResult>> getResultByStudent(@PathVariable("id") Integer id){
        return sService.getResultByStudent(id);
    }

}
