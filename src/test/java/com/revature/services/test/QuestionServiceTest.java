package com.revature.services.test;

import static org.junit.Assert.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import com.revature.entities.Question;
import com.revature.repositories.AnswerRepository;
import com.revature.repositories.QuestionRepository;
import com.revature.services.QuestionService;
import com.revature.services.RSSService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QuestionServiceTest {
	
	@Autowired
	QuestionService questionService;
	
	@MockBean
	QuestionRepository questionRepository;
	
	@MockBean
	AnswerRepository answerRepository;
	
	@MockBean
	RSSService rssService;

	/** @author Hugh Thornhill */
	@Test
	public void getAllQuestionsTest() throws Exception {
		Question question = new Question(1, 0, "Title", "Content", LocalDate.MIN, null, false, 1);
		List<Question> questions = new ArrayList<>();
		questions.add(question);
		Page<Question> pageResult = new PageImpl<>(questions);
		when(questionRepository.findAll(Mockito.any(Pageable.class))).thenReturn((pageResult));
		Page<Question> result = questionService.getAllQuestions(PageRequest.of(1, 5));
		assertThat(pageResult).contains(question);
		assertEquals(pageResult, result);
	}

	/** @author Hugh Thornhill */
	@Test
	public void getAllQuestionsByUserID() throws Exception {
		Question question = new Question(1, 0, "Title", "Content", LocalDate.MIN, null, false, 1);
		List<Question> questions = new ArrayList<>();
		questions.add(question);
		Page<Question> pageResult = new PageImpl<Question>(questions);
		when(questionRepository.getAllQuestionsByUserID(Mockito.any(Pageable.class), Mockito.anyInt()))
				.thenReturn((pageResult));
		Page<Question> result = questionService.getAllQuestionsByUserId(PageRequest.of(1, 5), 1);
		assertThat(result).contains(question);
	}
	
	/** @author ken */
	@Test
	public void getAllQuestionsByStatus() throws Exception {
		Question question = new Question(1, 0, "Title", "Content", LocalDate.MIN, null, false, 1);
		List<Question> questions = new ArrayList<>();
		questions.add(question);
		Page<Question> pageResult = new PageImpl<Question>(questions);
		when(questionRepository.getQuestionsByStatus(Mockito.any(Pageable.class), Mockito.anyBoolean()))
		.thenReturn((pageResult));
		Page<Question> result = questionService.getAllQuestionsByStatus(PageRequest.of(1, 5), false);
		assertThat(result).contains(question);
	}
	
	/** @author ken */
	@Test
	public void updateQuestionAcceptedAnswerId() throws Exception {
		Question question = new Question(1, 0, "Title", "Content", LocalDate.MIN, null, false, 1);
	
		//Question pageResult = new PageImpl<Question>(questions);
		when(questionRepository.save(Mockito.any(Question.class)))
		.thenReturn(question);
		Question result = questionService.updateQuestionAcceptedAnswerId(question);
		//assertThat(result).contains(question);
		assertEquals(result, question);
	}
	
	/** @author James */
	@Test
	public void updateQuestion() throws Exception {
		Question question = new Question(1, 0, "Title", "Content", LocalDate.MIN, null, false, 1);
	
		when(questionRepository.save(Mockito.any(Question.class)))
		.thenReturn(question);
		Question result = questionService.save(question);
		assertEquals(result, question);
	}
	
}