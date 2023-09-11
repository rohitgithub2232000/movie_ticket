package com.cybage.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.cybage.dto.CustomResponse;
import com.cybage.dto.ShowDetailsDTO;
import com.cybage.exception.ApiResponse;
import com.cybage.service.ShowDetailsService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/mtbs/")
@Slf4j
public class ShowDetailsController {

	@Autowired
	private ShowDetailsService showDetailsService;

	@PostMapping("/showDetails/")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ShowDetailsDTO> createShowDetails(@Valid @RequestBody ShowDetailsDTO showDetailsDTO) {

		log.info("Processing the request to createShowDetails in the Class : {}  ", this.getClass().getName());
		ShowDetailsDTO createShowDetails = this.showDetailsService.createShowDetails(showDetailsDTO);
		return new ResponseEntity<ShowDetailsDTO>(createShowDetails, HttpStatus.CREATED);
	}

	// Implementation to avoid show duplication
	@PostMapping("/showDetails/movies/{movieId}/theatres/{theatreId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createShowDetails(@Valid @PathVariable Integer movieId, @PathVariable Integer theatreId,
			@RequestBody ShowDetailsDTO showDetailsDTO) {

		log.info("Processing the request to createShowDetails with movieId-{} theatreId- {} in the Class : {}  ",movieId,theatreId, this.getClass().getName());
		CustomResponse createShowDetails = this.showDetailsService.createShowDetails(showDetailsDTO, movieId,
				theatreId);
		return new ResponseEntity<>(createShowDetails, HttpStatus.CREATED);
	}

	@GetMapping("/showDetails/{showDetailsId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ShowDetailsDTO> getShowDetailsByShowDetailsId(@PathVariable Integer showDetailsId) {
		log.info("Processing the request to getShowDetailsByShowDetailsId-{} in the Class : {}  ",showDetailsId, this.getClass().getName());
		ShowDetailsDTO showDetailsById = this.showDetailsService.getShowDetailsByShowDetailsId(showDetailsId);		
		return new ResponseEntity<ShowDetailsDTO>(showDetailsById, HttpStatus.OK);
	}

	@GetMapping("/showDetails/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getAllShowDetails() {
		log.info("Processing the request to getAllShowDetails in the Class : {}  ", this.getClass().getName());
		List<ShowDetailsDTO> showDetails = this.showDetailsService.getAllShowDetails();
		return new ResponseEntity<>(
				(!showDetails.isEmpty()) ? showDetails : new ApiResponse("ShowDetails list is empty ", true),
				HttpStatus.OK);
	}

	@DeleteMapping("/showDetails/{showDetailsId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteShowDetails(@PathVariable Integer showDetailsId) {
		this.showDetailsService.deleteShowDetails(showDetailsId);
		log.info("Processing the request to deleteShowDetails with showId {} in the Class : {}  ",showDetailsId, this.getClass().getName());
		return new ResponseEntity<ApiResponse>(new ApiResponse("ShowDetails Deleted Successfully", true),
				HttpStatus.OK);
	}

	@PutMapping("/showDetails/{showDetailsId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ShowDetailsDTO> updateShowDetails(@Valid @PathVariable Integer showDetailsId,
			@RequestBody ShowDetailsDTO showDetailsDTO) {
		ShowDetailsDTO updatedShowDetails = this.showDetailsService.upateShowDetails(showDetailsDTO, showDetailsId);
		return new ResponseEntity<ShowDetailsDTO>(updatedShowDetails, HttpStatus.OK);
	}

	@GetMapping("/search/showDetails/{movieId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getShowDetailsByMovieId(@PathVariable Integer movieId) {
		log.info("Processing the request to getShowDetailsByMovieId with movieId {} in the Class : {}  ",movieId, this.getClass().getName());
		List<ShowDetailsDTO> serchedshow = this.showDetailsService.getShowDetailsByMovieId(movieId);
		return new ResponseEntity<>((!serchedshow.isEmpty()) ? serchedshow
				: new ApiResponse("Show not found with movieId: " + movieId, true), HttpStatus.OK);
	}

}
