package com.cybage.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.cybage.model.BookingStatus;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class BookingDTO {

	private int bookingId;
	
	@NotNull(message = "Booking Date should not be null")
	private LocalDate bookingDate;

	@NotNull(message = "Booking Time should not be null")
	private LocalTime bookingTime;

	@NotNull(message = "Ticket count cannot be null")
	private int ticketCount;		

//	@NotNull(message = "Total amount cannot be null")
	private int totalAmount;
	
	private BookingStatus bookingStatus;

	private UserDTO user;

	private ShowDetailsDTO showDetails;

	

}
