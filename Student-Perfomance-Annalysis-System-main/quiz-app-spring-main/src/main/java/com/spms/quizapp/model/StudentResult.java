package com.spms.quizapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
//import jakarta.persistence.ManyToOne;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints=@UniqueConstraint(columnNames= {"studentId","quizId"}))
public class StudentResult {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	int markid;
	
	int StudentId;
	
	int quizId;
	
	int Marks;

	public int getMarkid() {
		return markid;
	}

	public void setMarkid(int markid) {
		this.markid = markid;
	}

	public int getStudentId() {
		return StudentId;
	}

	public void setStudentId(int studentId) {
		StudentId = studentId;
	}

	public int getQuizId() {
		return quizId;
	}

	public void setQuizId(int quizId) {
		this.quizId = quizId;
	}


	public int getMarks() {
		return Marks;
	}

	public void setMarks(int marks) {
		Marks = marks;
	}

	public StudentResult(int markid, int studentId, int quizId, int marks) {
		super();
		this.markid = markid;
		StudentId = studentId;
		this.quizId = quizId;
		Marks = marks;
	}

	public StudentResult() {
		super();
	}
	
	
}
