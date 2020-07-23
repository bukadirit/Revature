package com.revature.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.entities.Answer;
import com.revature.entities.Question;
import com.revature.entities.User;
import com.revature.DTOs.RSSAccountDTO;
import com.revature.repositories.AnswerRepository;
import com.revature.repositories.QuestionRepository;

@Service
public class QuestionService {

	@Autowired 
	RSSService rssService;	
	
	@Autowired
	QuestionRepository questionRepository;
	
	@Autowired
	AnswerRepository answerRepository;
	
	public QuestionService(QuestionRepository questionRepository) {
		this.questionRepository = questionRepository;
	}
	
	/**@author ken*/
	public Page<Question> getAllQuestions(Pageable pageable){
		return questionRepository.findAll(pageable);
	}

	/**@author ken*/
	public Page<Question> getAllQuestionsByUserId(Pageable pageable, int id){
		return questionRepository.getAllQuestionsByUserID(pageable, id);		
	}
	
	/** @Author James Walls */
	public Question save(Question question) {
		return questionRepository.save(question);
	}

	/**@author Hugh Thornhill*/
	public Question updateQuestionAcceptedAnswerId(Question question) {
		if(question.getId() == 0) {
			throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
		}
		
		// get question from database
		// ensure that only the answerId is updated
		// Question q = optQuestion.get()
		// if q.getAnswerId is null, set the answerId
		// q.setAnswer(question.getAnswer)
		// line 89 and up pretty similar
		// you will be saving q NOT question

		return save(question);
	}
	
	/**@author Hugh Thornhill, Ryan Clayton*/
	public Question updateQuestionStatus(Question question, int points) {

		// check the question accepted answer id is there
		if(question.getId() == 0) {
			throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
		}
		
		// ensures someone isn't maliciously updating the question
		Optional<Question> optQuestion = questionRepository.findById(question.getId());
		if(optQuestion.isPresent()) {
			
			// This overwrites the question from the parameter above, and replaces it with the one from the database
			question = optQuestion.get();
		}
		
		// If the status is already true OR the accepted id is 0/null then it will throw an error
		if(question.isStatus() == true || question.getAcceptedId() == 0) {
			throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
		}
		
		// Sets the status as true
		question.setStatus(true);
		
		Optional<Answer> optAnswer = answerRepository.findById(question.getAcceptedId());
		if(optAnswer.isPresent()) {
			Answer a = optAnswer.get();
			RSSAccountDTO dto = new RSSAccountDTO(a.getUserId(), points);
			User user = rssService.addPoints(dto);
			if (user == null) {
				throw new NullPointerException("Null value");
			}
		}
		return save(question);
	}
	
  /** @Author Natasha Poser */ 
	public Question findById(int id) {
		return questionRepository.findById(id)
				.orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}

	/**@author ken*/
	public Page<Question> getAllQuestionsByStatus(Pageable pageable, boolean status){
		return questionRepository.getQuestionsByStatus(pageable, status);
	}
	
}
