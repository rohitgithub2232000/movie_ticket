package com.cdac.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.RatingDTO;
import com.cdac.exception.ApiResponse;
import com.cdac.service.RatingService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/mtbs/")
@Slf4j
public class RatingController {

	@Autowired
	private RatingService ratingService;

	@PostMapping("/ratings/user/{userName}/movie/{movieId}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<RatingDTO> createRating(@Valid @RequestBody RatingDTO ratingDTO,
			@PathVariable String userName, @PathVariable Integer movieId) {
		System.out.println(ratingDTO.getRatingValue());
		log.info("Processing the request to createRating for movieId {} by user {} in the Class : {}  ", movieId,
				userName, this.getClass().getName());
		RatingDTO createRating = this.ratingService.createRating(ratingDTO, userName, movieId);
		return new ResponseEntity<RatingDTO>(createRating, HttpStatus.CREATED);
	}

	@GetMapping("/ratings/{ratingId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<RatingDTO> getRatingByRatingId(@PathVariable Integer ratingId) {
		log.info("Processing the request to getRatingByRatingId-{} in the Class : {}  ",ratingId, this.getClass().getName());
		RatingDTO ratingById = this.ratingService.getRatingByRatingId(ratingId);
		return new ResponseEntity<RatingDTO>(ratingById, HttpStatus.OK);
	}

	@GetMapping("/ratings/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getAllRatings() {
		log.info("Processing the request to getAllRatings in the Class : {}  ", this.getClass().getName());
		List<RatingDTO> ratings = this.ratingService.getAllRatings();
		return new ResponseEntity<>((!ratings.isEmpty()) ? ratings : new ApiResponse("Ratings list is empty ", true),
				HttpStatus.OK);
	}

	@GetMapping("/search/ratings/{userName}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getAllRatingsForUser(@PathVariable String userName) {
		log.info("Processing the request to getAllRatingsForUser - {} in the Class : {}  ",userName, this.getClass().getName());
		List<RatingDTO> serchedrating = this.ratingService.getAllRatingsForUser(userName);

		return new ResponseEntity<>((!serchedrating.isEmpty()) ? serchedrating
				: new ApiResponse("Rating not found with userName: " + userName, true), HttpStatus.OK);
	}

	@DeleteMapping("/ratings/{ratingId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteRating(@PathVariable Integer ratingId) {
		this.ratingService.deleteRating(ratingId);
		log.info("Processing the request to deleteRating with ratingId {} in the Class : {}  ",ratingId, this.getClass().getName());
		return new ResponseEntity<ApiResponse>(new ApiResponse("Rating Deleted Successfully", true), HttpStatus.OK);
	}

}
