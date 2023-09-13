package com.cdac.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "show_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ShowDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int showId;

	private int totalSeats;
	private int bookedSeats;
	private int availableSeats;

	@Column(name = "show_date", nullable = false)	
	private LocalDate showDate;

	private LocalTime showStartTime;

	@Column(name = "ticket_rate", nullable = false)
	private int ticketRate;

	@ManyToOne(fetch = FetchType.LAZY)
//	Cascade type need to check
	@JoinColumn(name = "movie_id")
	private Movie movie;

	@ManyToOne(fetch = FetchType.LAZY)
//	Cascade type need to check
	@JoinColumn(name = "theatre_id")
	private Theatre theatre;

	private MovieFormat movieFormat;

	private MovieLanguage movieLanguage;	
	
	@JsonIgnore
	@OneToMany(mappedBy = "showDetails")	
	private List<Booking> boooking;

}
