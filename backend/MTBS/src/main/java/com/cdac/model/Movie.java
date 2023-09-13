package com.cdac.model;

import java.time.LocalDate;
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
@Table(name = "movie")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int movieId;

	@Column(name = "movie_name", nullable = false,unique=true)
	private String movieName;

	@Column(name = "release_date", nullable = false)
	private LocalDate releaseDate;

	@Column(name = "duration", nullable = false)
	private Integer duration;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "genre", nullable = false)
	private String genre;
	
	@Column(name = "imageName", nullable = false)
	private String imageName;

//	@Lob
//	@Column(name = "image", nullable = true, columnDefinition="LONGBLOB")
//	private byte[] image;

	@JsonIgnore
	@OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
	private List<ShowDetails> showDetails;

	@JsonIgnore
	@OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
	private List<Rating> rating;

}
