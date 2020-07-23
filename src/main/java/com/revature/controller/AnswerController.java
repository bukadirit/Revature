package com.revature.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

import com.revature.entities.Answer;
import com.revature.services.AnswerService;

@RestController
@RequestMapping("/answers")
@CrossOrigin(
		origins = { "http://localhost:3000" }, 
		methods = { RequestMethod.GET, RequestMethod.PUT, 
					RequestMethod.PATCH, RequestMethod.POST },
		allowedHeaders = { "content-type" }
	)
public class AnswerController {
	
	@Autowired
	AnswerService answerService;
	
/** @Author Natasha Poser */
	@GetMapping
	@PreAuthorize("hasAuthority('user')")
	public Page<Answer>getAnswers(Pageable pageable){
			return answerService.getAnswers(pageable);
	}

	/** @author Natasha Poser */
	@GetMapping("/{questionId}") 
	@PreAuthorize("hasAuthority('user')")
	public Page<Answer> getAnswersByQuestionId(Pageable pageable, @PathVariable int questionId){
		return answerService.getAnswerByQuestionId(pageable, questionId);
	}
	

	/** @Author James Walls */
	@PostMapping
	@PreAuthorize("hasAuthority('user')")
	public Answer saveAnswer( @RequestBody Answer answer) {
		return answerService.save(answer);
	}
	
	/**@author ken*/
	@GetMapping("/user/{id}")
	@PreAuthorize("hasAuthority('user')")
	public Page<Answer> getAllAnswersByUserID(Pageable pageable,@PathVariable int id){
		return answerService.getAllAnswersByUserID(pageable, id);
	} 
	
	/** @author Natasha Poser */
	@GetMapping("/acceptedAnswers/{acceptedId}")
	@PreAuthorize("hasAuthority('user')")
	public Page<Answer> getAcceptedAnswerByQuestionId(Pageable pageable, @PathVariable int acceptedId){
		return answerService.getAcceptedAnswerByQuestionId(pageable, acceptedId);
	}
	
	/** @author Natasha Poser */
	@GetMapping("/id/{id}")
	@PreAuthorize("hasAuthority('user')")
	public Page<Answer> getAnswerById(Pageable pageable, @PathVariable int id){
		return answerService.getAnswerById(pageable, id);
	}
}
 