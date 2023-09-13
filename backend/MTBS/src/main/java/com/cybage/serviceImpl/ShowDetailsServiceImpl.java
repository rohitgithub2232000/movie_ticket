package com.cdac.serviceImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.CustomResponse;
import com.cdac.dto.ShowDetailsDTO;
import com.cdac.exception.ResourceNotFoundException;
import com.cdac.model.Movie;
import com.cdac.model.ShowDetails;
import com.cdac.model.Theatre;
import com.cdac.repository.MovieRepository;
import com.cdac.repository.ShowDetailsRepository;
import com.cdac.repository.TheatreRepository;
import com.cdac.service.ShowDetailsService;

@Service
public class ShowDetailsServiceImpl implements ShowDetailsService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ShowDetailsRepository showDetailsRepository;

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private TheatreRepository theatreRepository;

	@Override
	public CustomResponse createShowDetails(ShowDetailsDTO showDetailsDTO, Integer movieId, Integer theatreId) {
		// for the new fresh entry : returns :: false, for duplicate entry return true..

		// movie should not overlap: while adding..
		// ok same theatre same movie, same date should be diffrent timings..(with free
		// interval)
		// movie should not be shceduled before the released date.
		CustomResponse customResponse = new CustomResponse();

		Boolean duplicateValue = this.showDetailsRepository.findDuplicate(theatreId, showDetailsDTO.getShowDate(),
				showDetailsDTO.getShowStartTime());

//		                        = this.showDetailsRepository.findfreeInterval(showDetailsDTO.getShowDate(),
//				showDetailsDTO.getShowStartTime());
		Movie movie = this.movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie", "movie id", movieId));

		// ValidateScheduling(showDetailsDTO.getShowDate());
		//
		LocalDate today = LocalDate.now();
		if (showDetailsDTO.getShowDate().isBefore(today)) {
			System.out.println(showDetailsDTO.getShowDate() + " is in the past.");
			CustomResponse customResponse2 = new CustomResponse();
			customResponse2.setMessage("Movie can't be scheduled in past date: ");
			return customResponse2;
		}
		// movie cant be scheduled before release date..
		/*
		 * take the movies release date and the schedule date together and compare each.
		 * if rdate < s date then just return the validation msg.
		 */

//		LocalDate date1 = movie.getReleaseDate();
//		LocalDate date2 = showDetailsDTO.getShowDate();
//
//		if (date1.compareTo(date2) < 0) {
//			System.out.println("date1 is before date2");
//		} else if (date1.compareTo(date2) > 0) {
//			System.out.println("date1 is after date2");
//		} else {
//			System.out.println("date1 is equal to date2");
//		}

		Theatre theatre = this.theatreRepository.findById(theatreId)
				.orElseThrow(() -> new ResourceNotFoundException("Theatre", "theatre id", theatreId));

		ShowDetails showDetails = this.modelMapper.map(showDetailsDTO, ShowDetails.class);

		showDetails.setMovie(movie);
		showDetails.setTheatre(theatre);
		showDetails.setTotalSeats(theatre.getSeatsCapacity());
		showDetails.setAvailableSeats(theatre.getSeatsCapacity());
		showDetails.setBookedSeats(0);

		if (!duplicateValue) {
			ShowDetails savedShowDetails = this.showDetailsRepository.save(showDetails);
			customResponse.setMessage("show details saved successfully");
			customResponse.setShowDetailsDTO(modelMapper.map(savedShowDetails, ShowDetailsDTO.class));
			return customResponse;
		}
		CustomResponse customResponse1 = new CustomResponse();
		customResponse1.setMessage("duplicate entry");
		return customResponse1;
	}

	@Override
	public ShowDetailsDTO createShowDetails(ShowDetailsDTO showDetailsDTO) {

		Movie movie = this.movieRepository.findById(showDetailsDTO.getMovie().getMovieId()).orElseThrow(
				() -> new ResourceNotFoundException("Movie", "movie id", showDetailsDTO.getMovie().getMovieId()));
		Theatre theatre = this.theatreRepository.findById(showDetailsDTO.getTheatre().getTheatreId())
				.orElseThrow(() -> new ResourceNotFoundException("Theatre", "theatre id",
						showDetailsDTO.getTheatre().getTheatreId()));
		ShowDetails showDetails = this.modelMapper.map(showDetailsDTO, ShowDetails.class);
		showDetails.setMovie(movie);
		showDetails.setTheatre(theatre);
		showDetails.setMovieFormat(showDetailsDTO.getMovieFormat());
		showDetails.setMovieLanguage(showDetailsDTO.getMovieLanguage());
		showDetails.setTotalSeats(showDetailsDTO.getTheatre().getSeatsCapacity());
		showDetails.setAvailableSeats(showDetailsDTO.getTheatre().getSeatsCapacity());
		showDetails.setBookedSeats(0);

		ShowDetails savedShowDetails = this.showDetailsRepository.save(showDetails);
		return this.modelMapper.map(savedShowDetails, ShowDetailsDTO.class);

	}

	@Override
	public ShowDetailsDTO getShowDetailsByShowDetailsId(Integer showDetailsId) {
		ShowDetails showDetails = this.showDetailsRepository.findById(showDetailsId)
				.orElseThrow(() -> new ResourceNotFoundException("ShowDetails", "showDetails id", showDetailsId));
		return this.modelMapper.map(showDetails, ShowDetailsDTO.class);
	}

	@Override
	public ShowDetailsDTO upateShowDetails(ShowDetailsDTO showDetailsDTO, Integer showDetailsId) {

		ShowDetails showDetails = this.showDetailsRepository.findById(showDetailsId)
				.orElseThrow(() -> new ResourceNotFoundException("ShowDetails", "showDetails id", showDetailsId));

		Movie movie = this.movieRepository.findById(showDetailsDTO.getMovie().getMovieId()).orElseThrow(
				() -> new ResourceNotFoundException("Movie", "movie id", showDetailsDTO.getMovie().getMovieId()));

		Theatre theatre = this.theatreRepository.findById(showDetailsDTO.getTheatre().getTheatreId())
				.orElseThrow(() -> new ResourceNotFoundException("Theatre", "theatre id",
						showDetailsDTO.getTheatre().getTheatreId()));

		showDetails.setMovie(movie);
		showDetails.setTheatre(theatre);
		showDetails.setMovieFormat(showDetailsDTO.getMovieFormat());
		showDetails.setMovieLanguage(showDetailsDTO.getMovieLanguage());
		showDetails.setShowDate(showDetailsDTO.getShowDate());
		showDetails.setShowStartTime(showDetailsDTO.getShowStartTime());
		showDetails.setTicketRate(showDetailsDTO.getTicketRate());

		ShowDetails updatedShowDetails = this.showDetailsRepository.save(showDetails);
		return this.modelMapper.map(updatedShowDetails, ShowDetailsDTO.class);

	}

	@Override
	public List<ShowDetailsDTO> getAllShowDetails() {

		List<ShowDetails> showDetailss = this.showDetailsRepository.findAll();
		
		List<ShowDetails> filteredShowDetailss = showDetailsRepository.filterShowDetails();
//		List<ShowDetails> filteredShowDetailss = showDetailss.stream().filter(sd -> {
//			LocalDate startDate = sd.getShowDate();
//			LocalTime startTime = sd.getShowStartTime();
//			LocalDateTime startDateTime = LocalDateTime.of(startDate, startTime);
//			LocalDateTime currentDateTime = LocalDateTime.now();
//			return startDateTime.isAfter(currentDateTime) || startDateTime.isEqual(currentDateTime);
//		}).collect(Collectors.toList());
		
		List<ShowDetailsDTO> showDetailsDTOs = filteredShowDetailss.stream()
				.map((c) -> this.modelMapper.map(c, ShowDetailsDTO.class)).collect(Collectors.toList());
		return showDetailsDTOs;
	}

	@Override
	public void deleteShowDetails(Integer showDetailsId) {

		ShowDetails showDetails = this.showDetailsRepository.findById(showDetailsId)
				.orElseThrow(() -> new ResourceNotFoundException("ShowDetails", "showDetails id: ", showDetailsId));

		this.showDetailsRepository.delete(showDetails);

	}

//	@Override
//	public List<ShowDetailsDTO> getShowDetailsByDate(M keyword) {
//		List<ShowDetails> showDetailsBykeyWord = this.showDetailsRepository.findByMovie(keyword);
//		List<ShowDetails> showDetailsByDate = this.showDetailsRepository.findBy;
//		List<ShowDetailsDTO> showDetailsDTO = showDetailsBykeyWord.stream().map(p -> this.modelMapper.map(p, ShowDetailsDTO.class))
//				.collect(Collectors.toList());
//		return showDetailsDTO;		
//	}

	@Override
	public List<ShowDetailsDTO> getShowDetailsByMovieId(Integer movieId) {
		Movie movie = this.movieRepository.findById(movieId)
				.orElseThrow(() -> new ResourceNotFoundException("Movie", "movie id", movieId));
		List<ShowDetails> showDetailsByMovie = this.showDetailsRepository.findByMovie(movie);
		List<ShowDetailsDTO> showDetailsDTO = showDetailsByMovie.stream()
				.map(p -> this.modelMapper.map(p, ShowDetailsDTO.class)).collect(Collectors.toList());
		return showDetailsDTO;
	}

	@Override
	public void updateSeatsCount(int ticketCount) {
//		availableSeats = totalSeats - ticketCount;
//		bookedSeats = totalSeats - availableSeats;
	}

//	public CustomResponse ValidateScheduling(LocalDate localDate) {
//
//		LocalDate today = LocalDate.now();
//		if (localDate.isBefore(today)) {
//			System.out.println(localDate + " is in the past.");
//			CustomResponse customResponse2 = new CustomResponse();
//			customResponse2.setMessage("Movie can't be scheduled in past date: ");
//			return customResponse2;
//		} else if (localDate.isAfter(today)) {
//			System.out.println(localDate + " is in the future.");
//		} else {
//			System.out.println(localDate + " is today.");
//		}
//		return null;
//	}

}
