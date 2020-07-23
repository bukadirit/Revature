package com.revature.services;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.revature.DTOs.RSSAccountDTO;
import com.revature.DTOs.RSSUserDTO;
import com.revature.entities.User;
import com.revature.repositories.UserRepository;
import com.revature.util.JwtUtil;

@Service
public class RSSService {
	
	
	@Autowired
	UserRepository userRepository;

	@Value("${environments.rss}")
	String rssServiceUrl;
	
	RestTemplate restTemplate;
	 
	@Autowired
	public RSSService(RestTemplateBuilder restTemplateBuilder) {
		this.restTemplate = restTemplateBuilder.build();
	}
	

	
	
	
	/**
	 * @Author Ryan Clayton
	 * @param u this takes in a RSSUserDto object with an email and password populated
	 * @return User this user is authenticated with the RSS account service
	 */
	public User login(RSSUserDTO u) {
		// create headers
	    HttpHeaders headers = new HttpHeaders();
	    // set `content-type` header
	    headers.setContentType(MediaType.APPLICATION_JSON);
	    // set `accept` header
	    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	    String login = rssServiceUrl+"/user/login/";
		//create map for user login post parameters
		Map<String, Object> map = new HashMap<>();
		map.put("email", u.getEmail());
		map.put("password", u.getPassword());
		
		//build the request
		HttpEntity<Map<String,Object>> entity = new HttpEntity<>(map,headers);
		
		//send Post Request
		ResponseEntity<RSSUserDTO> response= this.restTemplate.postForEntity(login, entity, RSSUserDTO.class);
		
		//Begin building User object
		User user = new User();
		user.setEmail(u.getEmail());
		if(response.hasBody()) {	
			//continue building user from response body
			RSSUserDTO body = response.getBody();
			
			
			if(!userRepository.existsById(body.getUserId())) {
				user.setAdmin(body.getAdmin());
				user.setFirstName(body.getFirstName());
				user.setLastName(body.getLastName());
				user.setProfilePicture(body.getProfilePic());
				user.setUserID(body.getUserId());
				
				
				
				String newAcc = rssServiceUrl+"/account/new";
				//create map for new account post parameters
				map.clear();
				map.put("userId",body.getUserId());
				map.put("accTypeId",3);
				
				//build the request
				entity = new HttpEntity<>(map,headers);
				//send the request
				ResponseEntity<RSSAccountDTO> accResponse= this.restTemplate.postForEntity(newAcc, entity, RSSAccountDTO.class);
				if(accResponse.hasBody()) {
				
					//finish building user object
					RSSAccountDTO accBody = accResponse.getBody();
					user.setRSSAccountId(accBody.getAccId());
					user.setPoints(accBody.getPoints());
				
				}
				//create jwt for user
				JwtUtil jwt = new JwtUtil();
				user.setJwt(jwt.generateToken(user));
				
			}else {
				Optional<User> optUser = userRepository.findById(body.getUserId());
				if (optUser.isPresent()) {
					//get user data from our database
					user = optUser.get();
					
					String getPoints = rssServiceUrl+"/account/account";
					//create url for rss points request
					//create map for new account post parameters
					map.clear();
					map.put("userId",user.getUserID());
					map.put("accId",user.getRSSAccountId());
					
					//build the request
					entity = new HttpEntity<>(map,headers);
				
					//send the request
					ResponseEntity<RSSAccountDTO> accResponse= this.restTemplate.postForEntity(getPoints, entity, RSSAccountDTO.class);
					if(accResponse.hasBody()) {
						user.setPoints(accResponse.getBody().getPoints());
					}
					//create jwt token for our user
					JwtUtil jwt = new JwtUtil();
					user.setJwt(jwt.generateToken(user));

				}
			}
			
			return userRepository.save(user);
		}		
		return null;
	}

	/**
	 * @Author Kei
	 * @param id  this is the user's id number
	 * @return the number of points in a user's RSS account from the RSS account service
	 */
	public int getPoints(int id) {
		HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_JSON);
	    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	    String getPoints = rssServiceUrl+"/account/account";

	    Optional<User> optUser = userRepository.findById(id);
	    if (optUser.isPresent()) {
	    	User user = optUser.get();
	    
	    	Map<String, Object> map = new HashMap<>();
	    	map.put("accId", user.getRSSAccountId());
	    	
	    	HttpEntity<Map<String,Object>> entity = new HttpEntity<>(map,headers);
	    	
	    	ResponseEntity<RSSAccountDTO> response= this.restTemplate.postForEntity(getPoints, entity, RSSAccountDTO.class);
	    	
	    	RSSAccountDTO account = response.getBody();
	    	return account.getPoints();
	    }
	    return 0;

	}


	/**
	 * @Author Haji
	 * @param acc  this takes in an RSSAccountDTO object with the userId and the number of points populated
	 * @return the user with an updated number of points in both from our database as well as the RSS account service DB
	 */

	public User addPoints(RSSAccountDTO acc) {
		 	HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		    Optional<User> optUser = userRepository.findById(acc.getUserId());
		    if ( optUser.isPresent()) {
		    	User user = optUser.get();
		    	
		    	String addPoints = rssServiceUrl+"/account/points/a";
		    	Map<String, Object> map = new HashMap<>();
		    	map.put("accId", user.getRSSAccountId());
		    	map.put("points", acc.getPoints());
		    	
		    	HttpEntity<Map<String,Object>> entity = new HttpEntity<>(map,headers);
		    	
		    	ResponseEntity<RSSAccountDTO> response= this.restTemplate.postForEntity(addPoints, entity, RSSAccountDTO.class);
		    	
				if(response.getStatusCode()==HttpStatus.OK) {
					user.setPoints(user.getPoints()+acc.getPoints());
					return userRepository.save(user);
				}

		    }
		    return null;

		   

	}


}
