package com.cdac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.cdac.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

	@Query("SELECT p FROM Movie p WHERE CONCAT(p.description,' ', p.duration,' ',p.genre,' ',p.movieName,' ',p.releaseDate) LIKE %?1%")
	List<Movie> findByKeyword(String movie);

	Optional<Movie> findByMovieName(String movieName);

}
/*
 * movie_id description duration genre movie_name release_date
 */
