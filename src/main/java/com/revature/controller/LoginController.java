package com.revature.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature.DTOs.RSSUserDTO;
import com.revature.entities.User;
import com.revature.services.RSSService;


@RestController
@RequestMapping("/login")
@CrossOrigin(
		origins = { "http://localhost:3000" }, 
		methods = { RequestMethod.GET, RequestMethod.PUT, 
					RequestMethod.PATCH, RequestMethod.POST },
		allowedHeaders = { "content-type" }
	)
public class LoginController {

	@Autowired
	RSSService rssService;
	
	
	/** This method is used for logging in a user and validating their credentials with RSS account service
	 * 
	 * @author Ryan Clayton
	 * @param email 	This is the user's email needed for login validation
	 * @param password 	User must supply a password for validation
	 * 
	 * @return User		This is the instance of the User entity in our database provided from the RSS account service	
	 * 	 */
	@PostMapping
	public User loginUser(@RequestBody RSSUserDTO u) {
		return rssService.login(u);
		
	}
	
}
