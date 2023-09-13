package com.cdac.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.cdac.dto.MovieDTO;
import com.cdac.payloads.response.MovieWithImageResponse;

public interface MovieService {

	// create-movie-admin
	MovieDTO createMovies(MovieDTO movieDTO, MultipartFile image) throws IOException;

	//create-movie-admin
	MovieDTO createMovie(MovieDTO movieDTO);

	// update-movie-admin
	MovieDTO upateMovie(MovieDTO movieDTO, Integer movieId);

	// get-movie-byMovieId-admin/user
	MovieDTO getMovieByMovieId(Integer movieId);

	// get-all-movie-admin/user
	List<MovieDTO> getAllMovies();

	// delete-movie
	void deleteMovie(Integer movieId);

	// search movie by keyword
	List<MovieDTO> getMovieByKeyword(String keyword);

	
	String getMovieImageUrl(MovieDTO movieDTO);

	MovieWithImageResponse getMovieWithImageByMovieId(Integer movieId);
}
