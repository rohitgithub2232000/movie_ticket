package com.cybage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cybage.model.Movie;
import com.cybage.model.Rating;
import com.cybage.model.User;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

	List<Rating> findByMovie(Movie movie);

	@Query(value = "SELECT IF(COUNT(*) > 0, 'true', 'false') FROM  movie_ticket.rating r WHERE r.movie_id =?1  AND r.user_id= ?2", nativeQuery = true)
	Boolean findDuplicate(Integer movieId, Integer userId);

	List<Rating> findByUser(User user);

	Rating findByUserAndMovie(User user, Movie movie);

}
