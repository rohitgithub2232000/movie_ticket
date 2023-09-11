package com.cybage.serviceImpl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cybage.dto.MovieDTO;
import com.cybage.exception.ResourceNotFoundException;
import com.cybage.model.Movie;
import com.cybage.payloads.response.MovieWithImageResponse;
import com.cybage.repository.MovieRepository;
import com.cybage.service.MovieService;

@Service
public class MovieServiceImpl implements MovieService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private MovieRepository movieRepository;

	@Value("${imagePath}")
	private String movieImagePath;
	
//	When project is build
	@Value("${imagePathforbuild}")
	private String movieImagePathWhenBuild;

	@Override
	public MovieDTO createMovies(MovieDTO movieDTO, MultipartFile image) throws IOException {

		// mapping movieDTO object with Movie.class

		Movie movie = this.modelMapper.map(movieDTO, Movie.class);
		movie.setGenre(movieDTO.getGenre().toUpperCase());

		// Image file Name
		String name = image.getOriginalFilename();

//		// Full path
//		String filePath = movieImagePath + File.separator + name;
		
		// Full path for build
		String filePathForBuild = movieImagePathWhenBuild + File.separator + name;

		// create directory where images are uploaded
		File uploadDirectory = new File(movieImagePathWhenBuild);

		if (!uploadDirectory.exists()) {
			uploadDirectory.mkdir();
		}

		// Perform copy operation to save image file in the above created directory
		Files.copy(image.getInputStream(), Paths.get(filePathForBuild));

		movie.setImageName(name);
		Movie savedMovie = this.movieRepository.save(movie);		
		return this.modelMapper.map(savedMovie, MovieDTO.class);
	}

//	@Override
//	public MovieDTO createMovies(MovieDTO movieDTO, MultipartFile image) {
//
//		// mapping movieDTO object with Movie.class
//
//		Movie movie = this.modelMapper.map(movieDTO, Movie.class);
//		movie.setGenre(movieDTO.getGenre().toUpperCase());
//
//		if (image != null) {
//			byte[] imageData = null;
//			try {
//				imageData = image.getBytes();
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			movie.setImage(imageData);
//		}
//
//		Movie savedMovie = this.movieRepository.save(movie);
//		return this.modelMapper.map(savedMovie, MovieDTO.class);
//	}

	@Override
	public MovieDTO createMovie(MovieDTO movieDTO) {

		// mapping movieDTO object with Movie.class

		Movie movie = this.modelMapper.map(movieDTO, Movie.class);
		movie.setGenre(movieDTO.getGenre().toUpperCase());
		Movie savedMovie = this.movieRepository.save(movie);
		return this.modelMapper.map(savedMovie, MovieDTO.class);
	}

	@Override
	public MovieDTO upateMovie(MovieDTO movieDTO, Integer movieId) {

		Movie movie = this.movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie", "movie id", movieId));

		movie.setDescription(movieDTO.getDescription());
		movie.setDuration(movieDTO.getDuration());
		movie.setGenre(movieDTO.getGenre());
		movie.setReleaseDate(movieDTO.getReleaseDate());
		movie.setMovieName(movieDTO.getMovieName());
		Movie updatedMovie = this.movieRepository.save(movie);
		return this.modelMapper.map(updatedMovie, MovieDTO.class);

	}
	
	@Override
	public MovieDTO getMovieByMovieId(Integer movieId) {
		Movie movie = this.movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie", "movie id", movieId));

		return this.modelMapper.map(movie, MovieDTO.class);
	}
	
	
	@Override
	public MovieWithImageResponse getMovieWithImageByMovieId(Integer movieId) {
		Movie movie = this.movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie", "movie id", movieId));

		MovieDTO movieDTOById=modelMapper.map(movie, MovieDTO.class);
		
		MovieWithImageResponse movieWithImageResponse = new MovieWithImageResponse();
		movieWithImageResponse.setMovieDTO(movieDTOById);
		movieWithImageResponse.setImageUrl(getMovieImageUrl(movieDTOById));
		return movieWithImageResponse;
	}

	@Override
    public String getMovieImageUrl(MovieDTO movieDTO) {
        return movieImagePath + "//"+ movieDTO.getImageName();
    }

	@Override
	public List<MovieDTO> getAllMovies() {

		List<Movie> movies = this.movieRepository.findAll();
		List<MovieDTO> movieDTOs = movies.stream().map((c) -> this.modelMapper.map(c, MovieDTO.class))
				.collect(Collectors.toList());
		return movieDTOs;
	}

	@Override
	public void deleteMovie(Integer movieId) {

		Movie movie = this.movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie", "movie id: ", movieId));

		this.movieRepository.delete(movie);

	}

	@Override
	public List<MovieDTO> getMovieByKeyword(String keyword) {
		List<Movie> movieBykeyWord = this.movieRepository.findByKeyword(keyword);
		List<MovieDTO> movieDTO = movieBykeyWord.stream().map(p -> this.modelMapper.map(p, MovieDTO.class))
				.collect(Collectors.toList());
		return movieDTO;
	}

}
