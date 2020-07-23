package com.revature.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

		@Autowired
		private JwtRequestFilter jwtRequestFilter;
	
	 	@Override
	    protected void configure(HttpSecurity httpSecurity) throws Exception {
	 		httpSecurity.headers().frameOptions().disable();
	        httpSecurity.cors().and().
	        	csrf().disable().authorizeRequests().antMatchers("/login","/h2-console/**","/swagger-ui**/**").permitAll().
	        	anyRequest().authenticated()
	        	.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	 	}
}
