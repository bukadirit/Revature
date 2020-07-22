package com.revature.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.fail;

import java.time.LocalDate;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.entities.Question;
import com.revature.repositories.QuestionRepository;

public class QuestionServiceTest {

	@Mock
	QuestionRepository questionRepository;
	
	@InjectMocks
	QuestionService questionService;
	
	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this);	
	}
	
	@Test
	public void updateQuestionAcceptedAnswerId_will_return_question() {
		Question q = new Question(1,1,"title","content", LocalDate.MIN, LocalDate.MIN, false, 1);
		Question q1 = new Question(1,1,"title","content", LocalDate.MIN, LocalDate.MIN, true, 1);
		Mockito.when(questionRepository.save(q)).thenReturn(q1);
		
		Question q2 = questionService.updateQuestionAcceptedAnswerId(q);
		//System.out.println(q2);
		
		assertEquals(q1,q2);
	}
	@Test(expected = HttpClientErrorException.class)
	public void updateQuestionAcceptedAnswerId_will_return_bad_request() {
		//Intentional send question with id = 0
		Question q2 = new Question(0,1,"title","content", LocalDate.MIN, LocalDate.MIN, true, 1);
		Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(null);
		
		Question q3 = questionService.updateQuestionAcceptedAnswerId(q2);
		assertNotEquals(q2, q3);
		
	}
	
	@Test(expected = HttpClientErrorException.class)
	public void updateQuestionStatus_will_return_bad_request() {
		//Intentional send question with id = 0
		Question q2 = new Question(0,1,"title","content", LocalDate.MIN, LocalDate.MIN, true, 1);
		Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(null);
		
		Question q3 = questionService.updateQuestionStatus(q2, 0);
		assertNotEquals(q2, q3);
		
	}

}
