package com.cybage.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cybage.dto.MovieDTO;
import com.cybage.exception.ApiResponse;
import com.cybage.payloads.response.MovieWithImageResponse;
import com.cybage.service.MovieService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/mtbs/")
@Slf4j
public class MovieController {

	@Autowired
	MovieService movieService;

	@Autowired
	ObjectMapper objectMapper;

	@PostMapping("/movies/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<MovieDTO> createMovies(@Valid @RequestPart("image") MultipartFile image,
			@RequestPart("movie") String movie) throws IOException {

		MovieDTO movieDTO = objectMapper.readValue(movie, MovieDTO.class);

		MovieDTO createMovie = this.movieService.createMovies(movieDTO, image);
		log.info("Processing the request to createMovie in the Class : {}  ", this.getClass().getName());
		return new ResponseEntity<MovieDTO>(createMovie, HttpStatus.CREATED);
	}

//	@PostMapping("/movies/")
////	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//	public ResponseEntity<MovieDTO> createMovie(@Valid @RequestBody MovieDTO movieDTO) {
//		MovieDTO createMovie = this.movieService.createMovie(movieDTO);
//		log.info("Processing the request to createMovie in the Class : {}  ", this.getClass().getName());
//		return new ResponseEntity<MovieDTO>(createMovie, HttpStatus.CREATED);
//	}

	@PutMapping("/movies/{movieId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<MovieDTO> updateMovie(@Valid @PathVariable Integer movieId, @RequestBody MovieDTO movieDTO) {
		MovieDTO updatedMovie = this.movieService.upateMovie(movieDTO, movieId);
		log.info("Processing the request to updateMovie in the Class : {}  ", this.getClass().getName());
		return new ResponseEntity<MovieDTO>(updatedMovie, HttpStatus.OK);
	}

	@GetMapping("/search/movies/{keyword}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getMovieByKeyword(@PathVariable String keyword) {

		List<MovieDTO> serchedmovie = this.movieService.getMovieByKeyword(keyword);
		log.info("Processing the request to search movie with keyword {} in the Class : {}  ", keyword,
				this.getClass().getName());
		return new ResponseEntity<>((!serchedmovie.isEmpty()) ? serchedmovie
				: new ApiResponse("Movie not found with keyword: " + keyword, true), HttpStatus.OK);
	}

	@GetMapping("/movies/images/{movieId}")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<MovieWithImageResponse> getMovieWithImageByMovieId(@PathVariable Integer movieId) {
		MovieWithImageResponse movieWithImageById = this.movieService.getMovieWithImageByMovieId(movieId);
		log.info("Processing the request to find movie with id {} in the Class : {}  ", movieId,
				this.getClass().getName());

		return new ResponseEntity<MovieWithImageResponse>(movieWithImageById, HttpStatus.OK);
	}

	@GetMapping("/movies/{movieId}")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<MovieDTO> getMovieByMovieId(@PathVariable Integer movieId) {
		MovieDTO movieById = this.movieService.getMovieByMovieId(movieId);
		log.info("Processing the request to find movie with id {} in the Class : {}  ", movieId,
				this.getClass().getName());
//		byte[] imageBytes = movieById.getImage();
//		if (imageBytes != null) {
//		    movieById.setImagePath(new String(imageBytes)); // Convert the bytes to a string and set the image path
//		}
//		
//	    HttpHeaders headers = new HttpHeaders();	
//	    headers.setContentType(MediaType.IMAGE_JPEG);
//	    headers.setContentLength(imageData.length);

		return new ResponseEntity<MovieDTO>(movieById, HttpStatus.OK);
//		response.getHeaders().setContentType(MediaType.IMAGE_JPEG);
//		response.getHeaders().setContentLength(imageData.length);
//		return response;
	}

	@GetMapping("/movies/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getAllMovies() {
		List<MovieDTO> movies = this.movieService.getAllMovies();
		log.info("Processing the request to getAllMovies in the Class : {}  ", this.getClass().getName());
		return new ResponseEntity<>((!movies.isEmpty()) ? movies : new ApiResponse("Movie list is empty ", true),
				HttpStatus.OK);
	}

	@DeleteMapping("/movies/{movieId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteMovie(@PathVariable Integer movieId) {
		this.movieService.deleteMovie(movieId);
		log.info("Processing the request to delete Movie with id {} in the Class : {}  ", movieId,
				this.getClass().getName());
		return new ResponseEntity<ApiResponse>(new ApiResponse("Movie Deleted Successfully", true), HttpStatus.OK);
	}
}
