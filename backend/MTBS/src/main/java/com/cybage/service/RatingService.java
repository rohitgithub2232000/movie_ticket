package com.cdac.service;

import java.util.List;

import com.cdac.dto.RatingDTO;

public interface RatingService {

	RatingDTO createRating(RatingDTO ratingDTO, String userName, Integer movieId);

	void deleteRating(Integer ratingId);

	List<RatingDTO> getAllRatings();

	RatingDTO getRatingByRatingId(Integer ratingId);

	List<RatingDTO> getRatingByMovieId(Integer movieId);

	List<RatingDTO> getAllRatingsForUser(String userName);

}
