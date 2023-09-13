package com.cdac.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "theatre")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class Theatre {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int theatreId;
	
	@Column(name="theatre_name", nullable = false)
	private String theatreName;
	
	@Column(name="theatre_location", nullable = false)
	private String theatreLocation;

	@Column(name="seats_capacity", nullable = false)
	private int seatsCapacity;
	
	@JsonIgnore
	@OneToMany(mappedBy = "theatre",cascade = CascadeType.ALL)
	private List<ShowDetails> show;	
	
}
