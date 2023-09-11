package com.cybage.service;

import java.util.List;

import com.cybage.dto.BookingDTO;

public interface BookingService {
	// create-booking-admin
//	BookingDTO createBooking(BookingDTO bookingDTO);

	// create-booking-admin
	BookingDTO createBooking(BookingDTO bookingDTO, Integer showId, String userName);

	// update-booking-admin
	BookingDTO upateBooking(BookingDTO bookingDTO, Integer bookingId);

	// get-booking-byBookingId-admin/user
	BookingDTO getBookingByBookingId(Integer bookingId);

	// get-all-booking-admin/user
	List<BookingDTO> getAllBookings();

	List<BookingDTO> getAllBookingsForUser(String userName);

	// delete-booking
	void deleteBooking(Integer bookingId);

	// search booking by keyword
//	List<BookingDTO> getBookingByKeyword(String keyword);

}
