package com.cdac.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.model.Movie;
import com.cdac.model.ShowDetails;

@Repository
public interface ShowDetailsRepository extends JpaRepository<ShowDetails, Integer> {

//	@Query("SELECT p FROM ShowDetails p WHERE CONCAT(p.movie,' ', p.theatre,' ',p.movieFormat,' ',p.movieLanguage) LIKE %?1%")
	@Query("SELECT p FROM ShowDetails p WHERE CONCAT(p.movie) LIKE %?1%")
	List<ShowDetails> findByKeyword(String keyword);

	@Query(value = "SELECT IF(COUNT(*) > 0, 'true', 'false') FROM  movie_ticket.show_details t WHERE t.theatre_id =?1  AND t.show_date= ?2 AND t.show_start_time =?3", nativeQuery = true)
	Boolean findDuplicate(Integer theatreId, LocalDate showDate, LocalTime showStartTime);

	List<ShowDetails> findByMovie(Movie movie);
	
	@Query(value = "SELECT * FROM show_details s WHERE s.show_date > CURRENT_DATE() OR (s.show_date = CURRENT_DATE() AND s.show_start_time >= CURRENT_TIME())", nativeQuery = true)
    List<ShowDetails> filterShowDetails();

}
