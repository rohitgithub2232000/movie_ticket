package com.cdac.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bookingId;

	private LocalDate bookingDate;

	private LocalTime bookingTime;

	@Column(name = "ticket_count", nullable = false)
	private int ticketCount;

	@Column(name = "total_amount", nullable = false)
	private int totalAmount;

	private BookingStatus bookingStatus;

	@ManyToOne(fetch = FetchType.LAZY)
//	Cascade type need to check
	@JoinColumn(name = "user_id")
	private User user;
	

	@ManyToOne(fetch = FetchType.LAZY)
//	Cascade type need to check
	@JoinColumn(name = "show_id")
	private ShowDetails showDetails;

}
