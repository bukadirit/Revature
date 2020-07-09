package com.revature.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.entities.Questions;

@Repository
public interface QuestionRepository extends JpaRepository<Questions, Integer>{

}