package com.spms.quizapp.service;

import com.spms.quizapp.dao.QuestionDao;
import com.spms.quizapp.dao.QuizDao;
//import com.telusko.quizapp.dao.StudentDao;
import com.spms.quizapp.model.Question;
import com.spms.quizapp.model.QuestionWrapper;
import com.spms.quizapp.model.Quiz;
import com.spms.quizapp.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;
    @Autowired
    QuestionDao questionDao;
    @Autowired
    StudentService ss;
//    @Autowired
//    StudentDao dao;


    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        List<Question> questions = questionDao.findRandomQuestionsByCategory(category, numQ);

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);
        quizDao.save(quiz);

        return new ResponseEntity<>("Success", HttpStatus.CREATED);

    }


    public ResponseEntity<List<Quiz>> getAllQuiz() {
        List<Quiz> quizzes = quizDao.findAll();
//        List<QuestionWrapper> questionWrappers = new ArrayList<>();

//        for (Quiz quiz : quizzes) {
//            // Assuming QuestionWrapper constructor takes Quiz object
//            QuestionWrapper wrapper = new QuestionWrapper(quiz); // Construct the wrapper
//            questionWrappers.add(wrapper);
//        }
System.out.println(quizzes);
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Optional<Quiz> quiz = quizDao.findById(id);
        List<Question> questionsFromDB = quiz.get().getQuestions();
        List<QuestionWrapper> questionsForUser = new ArrayList<>();
        for(Question q : questionsFromDB){
            QuestionWrapper qw = new QuestionWrapper(q.getId(), q.getQuestionTitle(), q.getOption1(), q.getOption2(), q.getOption3(), q.getOption4());
            questionsForUser.add(qw);
        }

        return new ResponseEntity<>(questionsForUser, HttpStatus.OK);

    }

    public ResponseEntity<Integer> calculateResult(Integer id, Integer StudentId, List<Response> responses) {
        Quiz quiz = quizDao.findById(id).get();
        
        List<Question> questions = quiz.getQuestions();
        int right = 0;
        int i = 0;
        for(Response response : responses){
            if(response.getResponse().equals(questions.get(i).getRightAnswer()))
                right++;

            i++;
        }
        ss.addMarks(StudentId, id, right);
        return new ResponseEntity<>(right, HttpStatus.OK);
    }
}
