package com.spms.quizapp.controller;

import com.spms.quizapp.model.QuestionWrapper;
import com.spms.quizapp.model.Quiz;
import com.spms.quizapp.model.Response;
import com.spms.quizapp.service.QuizService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// controller for quiz
@RestController
@RequestMapping("api")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("create")
    public ResponseEntity<String> createQuiz(@RequestParam String category, @RequestParam int numQ, @RequestParam String title){
       
    	return quizService.createQuiz(category, numQ, title);
    }
    
    @GetMapping("/getAllQuiz")
    public ResponseEntity<List<Quiz>> getAllQuiz() {
        return quizService.getAllQuiz();
    }
    
    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }
    

    @PostMapping("submit")
    public ResponseEntity<Integer> submitQuiz(@RequestParam Integer id, @RequestParam Integer StudentId, @RequestBody List<Response> responses){
        return quizService.calculateResult(id,StudentId, responses);
    }


}
