package com.cdac.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rating")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Rating {
	
	@Id
	@GeneratedValue
	private int ratingId;
	
	@Column(name="rating_value", nullable = false)
	private Integer ratingValue ;
		
	@ManyToOne(fetch = FetchType.LAZY)
//	Cascade type need to check
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
//	Cascade type need to check
	@JoinColumn(name = "movie_id")
	private Movie movie ;	
		
}
