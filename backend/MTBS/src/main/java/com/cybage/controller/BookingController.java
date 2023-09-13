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

import com.cdac.dto.BookingDTO;
import com.cdac.exception.ApiResponse;
import com.cdac.service.BookingService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/mtbs/")
@Slf4j
public class BookingController {
	@Autowired
	BookingService bookingService;

//	@PostMapping("/bookings/")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
//	public ResponseEntity<BookingDTO> createBooking(@Valid @RequestBody BookingDTO bookingDTO) {
//		log.info("Processing the request to createBooking in the Class : {}  ", this.getClass().getName());
//		BookingDTO createBooking = this.bookingService.createBooking(bookingDTO);
//		return new ResponseEntity<BookingDTO>(createBooking, HttpStatus.CREATED);
//	}

	@PostMapping("/bookings/showDetails/{showId}/users/{userName}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<BookingDTO> createBooking(@Valid @PathVariable Integer showId, @PathVariable String userName,
			@RequestBody BookingDTO bookingsDTO) {

		log.info("Processing the request to createBooking for showId {} by user {} in the Class : {}  ", showId,
				userName, this.getClass().getName());
		BookingDTO createBooking = this.bookingService.createBooking(bookingsDTO, showId, userName);
		return new ResponseEntity<BookingDTO>(createBooking, HttpStatus.CREATED);
	}

	@PutMapping("/bookings/{bookingId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<BookingDTO> updateBooking(@Valid @PathVariable Integer bookingId,
			@RequestBody BookingDTO bookingDTO) {
		log.info("Processing the request to updateBooking for bookingId {} in the Class : {}  ", bookingId,
				this.getClass().getName());
		BookingDTO updatedBooking = this.bookingService.upateBooking(bookingDTO, bookingId);
		return new ResponseEntity<BookingDTO>(updatedBooking, HttpStatus.OK);
	}

	@GetMapping("/search/bookings/{userName}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getAllBookingsForUser(@PathVariable String userName) {
		log.info("Processing the request to getAllBookingsForUser for user  {} in the Class : {}  ", userName,
				this.getClass().getName());
		List<BookingDTO> serchedbooking = this.bookingService.getAllBookingsForUser(userName);
		return new ResponseEntity<>((!serchedbooking.isEmpty()) ? serchedbooking
				: new ApiResponse("Booking not found with userName: " + userName, true), HttpStatus.OK);
	}

	@GetMapping("/bookings/{bookingId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<BookingDTO> getBookingByBookingId(@PathVariable Integer bookingId) {
		log.info("Processing the request to updateBooking for bookingId {} in the Class : {}  ",bookingId, this.getClass().getName());
		BookingDTO bookingById = this.bookingService.getBookingByBookingId(bookingId);
		return new ResponseEntity<BookingDTO>(bookingById, HttpStatus.OK);
	}

	@GetMapping("/bookings/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getAllBookings() {
		log.info("Processing the request to getAllBookings in the Class : {}  ", this.getClass().getName());
		List<BookingDTO> bookings = this.bookingService.getAllBookings();
		return new ResponseEntity<>((!bookings.isEmpty()) ? bookings : new ApiResponse("Booking list is empty ", true),
				HttpStatus.OK);
	}

	@DeleteMapping("/bookings/{bookingId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteBooking(@PathVariable Integer bookingId) {
		this.bookingService.deleteBooking(bookingId);
		log.info("Processing the request to deleteBooking for bookingId {} in the Class : {}  ",bookingId, this.getClass().getName());
		return new ResponseEntity<ApiResponse>(new ApiResponse("Booking Deleted Successfully", true), HttpStatus.OK);
	}

}
