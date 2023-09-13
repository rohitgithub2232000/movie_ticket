package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.model.Theatre;

@Repository
public interface TheatreRepository extends JpaRepository<Theatre, Integer> {

	@Query("SELECT p FROM Theatre p WHERE CONCAT(p.theatreName,' ', p.theatreLocation) LIKE %?1%")
	List<Theatre> findByKeyword(String theatre);

}
