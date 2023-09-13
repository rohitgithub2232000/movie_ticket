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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.TheatreDTO;
import com.cdac.exception.ApiResponse;
import com.cdac.service.TheatreService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/mtbs/")
@Slf4j

public class TheatreController {

	@Autowired
	TheatreService theatreService;

	// @PreAuthorize("hasRole('ADMIN')")
	// @PreAuthorize("hasRole('USER') or hasRole('ADMIN')") : only access to admin
	// or user
	// @PreAuthorize("hasRole('USER')") only to user

	@PostMapping("/theatres/")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<TheatreDTO> createTheatre(@Valid @RequestBody TheatreDTO theatreDTO) {
		log.info("Processing the request to createTheatre in the Class : {}  ", this.getClass().getName());
		TheatreDTO createTheatre = this.theatreService.createTheatre(theatreDTO);
		return new ResponseEntity<TheatreDTO>(createTheatre, HttpStatus.CREATED);
	}

	@PutMapping("/theatres/{theatreId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<TheatreDTO> updateTheatre(@Valid @PathVariable Integer theatreId,
			@RequestBody TheatreDTO theatreDTO) {
		log.info("Processing the request to updateTheatre with theatreId {} in the Class : {}  ",theatreId, this.getClass().getName());
		TheatreDTO updatedTheatre = this.theatreService.upateTheatre(theatreDTO, theatreId);
		return new ResponseEntity<TheatreDTO>(updatedTheatre, HttpStatus.OK);
	}

	@GetMapping("/search/theatres/{keyword}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getTheatreByKeyword(@PathVariable String keyword) {
		log.info("Processing the request to getTheatreByKeyword with keyword {} in the Class : {}  ",keyword, this.getClass().getName());
		List<TheatreDTO> serchedtheatre = this.theatreService.getTheatreByKeyword(keyword);

		return new ResponseEntity<>((!serchedtheatre.isEmpty()) ? serchedtheatre
				: new ApiResponse("Theatre not found with keyword: " + keyword, true), HttpStatus.OK);
	}

	@GetMapping("/theatres/{theatreId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<TheatreDTO> getTheatreByTheatreId(@PathVariable Integer theatreId) {
		log.info("Processing the request to getTheatreByTheatreId with theatreId {} in the Class : {}  ",theatreId, this.getClass().getName());
		TheatreDTO theatreById = this.theatreService.getTheatreByTheatreId(theatreId);
		return new ResponseEntity<TheatreDTO>(theatreById, HttpStatus.OK);

	}

	@GetMapping("/theatres/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getAllTheatres() {
		log.info("Processing the request to getAllTheatres  in the Class : {}  ", this.getClass().getName());
		List<TheatreDTO> theatres = this.theatreService.getAllTheatres();
		return new ResponseEntity<>((!theatres.isEmpty()) ? theatres : new ApiResponse("Theatre list is empty ", true),
				HttpStatus.OK);
	}

	@DeleteMapping("/theatres/{theatreId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteTheatre(@PathVariable Integer theatreId) {
		this.theatreService.deleteTheatre(theatreId);
		log.info("Processing the request to deleteTheatre with theatreId {} in the Class : {}  ",theatreId, this.getClass().getName());
		return new ResponseEntity<ApiResponse>(new ApiResponse("Theatre Deleted Successfully", true), HttpStatus.OK);
	}

}
