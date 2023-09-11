package com.cybage.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.cybage.model.MovieFormat;
import com.cybage.model.MovieLanguage;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowDetailsDTO {

	private int showId;

	private int totalSeats;
	private int bookedSeats;
	private int availableSeats;

	@NotNull(message = "Show date should not be null")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate showDate;

	@NotNull(message = "Show Start Time should not be null")
	private LocalTime showStartTime;

	@NotNull(message = "Ticket Rate should not be null")
	private int ticketRate;

	private MovieDTO movie;
//	private Integer movieId;

	private TheatreDTO theatre;

	@NotBlank(message = "MovieFormat should not be null")
	private MovieFormat movieFormat;

	@NotNull(message = "Movie Language should not be null")
	private MovieLanguage movieLanguage;

}
