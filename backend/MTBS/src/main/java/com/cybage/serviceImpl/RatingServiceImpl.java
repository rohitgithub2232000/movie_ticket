package com.cdac.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.RatingDTO;
import com.cdac.exception.ResourceNotFoundException;
import com.cdac.model.Movie;
import com.cdac.model.Rating;
import com.cdac.model.User;
import com.cdac.repository.MovieRepository;
import com.cdac.repository.RatingRepository;
import com.cdac.repository.UserRepository;
import com.cdac.service.RatingService;

@Service
public class RatingServiceImpl implements RatingService {
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private RatingRepository ratingRepository;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public RatingDTO createRating(RatingDTO ratingDTO, String userName, Integer movieId) {

		User user = this.userRepository.findByUserName(userName)
				.orElseThrow(() -> new ResourceNotFoundException("User", "user", userName));
		Movie movie = this.movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie", "movie", movieId));
		 Rating existingRating = ratingRepository.findByUserAndMovie(user, movie);
		    if (existingRating != null) {
		      throw new IllegalArgumentException("Rating already exists");
		    }

//		ratingDTO.setMovieId(movieId);
//		ratingDTO.setUserId(userId);

		Rating rating = this.modelMapper.map(ratingDTO, Rating.class);
		rating.setMovie(movie);
		rating.setUser(user);

		Rating savedRating = this.ratingRepository.save(rating);
		return this.modelMapper.map(savedRating, RatingDTO.class);
	}

	
	@Override
	public RatingDTO getRatingByRatingId(Integer ratingId) {
		Rating rating = this.ratingRepository.findById(ratingId)
				.orElseThrow(() -> new ResourceNotFoundException("Rating", "rating id", ratingId));
		return this.modelMapper.map(rating, RatingDTO.class);
	}

	@Override
	public List<RatingDTO> getAllRatings() {

		List<Rating> rating = this.ratingRepository.findAll();
		List<RatingDTO> ratingDTOs = rating.stream().map((c) -> this.modelMapper.map(c, RatingDTO.class))
				.collect(Collectors.toList());
		return ratingDTOs;
	}
	
	@Override
	public List<RatingDTO> getAllRatingsForUser(String userName) {
		User user = this.userRepository.findByUserName(userName)
				.orElseThrow(() -> new ResourceNotFoundException("User", "user name", userName));
		List<Rating> ratingBykeyWord = this.ratingRepository.findByUser(user);		
		List<RatingDTO> ratingDTO = ratingBykeyWord.stream().map(p -> this.modelMapper.map(p, RatingDTO.class))
				.collect(Collectors.toList());
		return ratingDTO;	
	}

	
	@Override
	public List<RatingDTO> getRatingByMovieId(Integer movieId) {
		Movie movie = this.movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie", "movie id", movieId));
		List<Rating> ratingByMovie = this.ratingRepository.findByMovie(movie);
		List<RatingDTO> ratingDTO = ratingByMovie.stream().map(p -> this.modelMapper.map(p, RatingDTO.class))
				.collect(Collectors.toList());
		return ratingDTO;
	}

	@SuppressWarnings("unused")
	@Override
	public void deleteRating(Integer ratingId) {
		Rating rating = this.ratingRepository.findById(ratingId)
				.orElseThrow(() -> new ResourceNotFoundException("Rating", "rating id: ", ratingId));

		this.ratingRepository.deleteById(ratingId);
		;
	}


//	@Override
//	public List<RatingDTO> getAllRatingsForUser(String userName) {
//		User user = this.userRepository.findByUserName(userName)
//				.orElseThrow(() -> new ResourceNotFoundException("User", "user name", userName));
//		
//		List<Rating> ratingByUserName=this.ratingRepository.findByUserName(user);
//		List<RatingDTO> ratingDTO = ratingByUserName.stream().map(p -> this.modelMapper.map(p, RatingDTO.class))
//				.collect(Collectors.toList());
//		return ratingDTO;		
//
//		
//	}

}
