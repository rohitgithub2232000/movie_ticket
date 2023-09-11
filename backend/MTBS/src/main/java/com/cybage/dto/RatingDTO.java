package com.cybage.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class RatingDTO {

	private int ratingId;

	@NotNull(message = "Rating Value should not be null")
	private Integer ratingValue;

	private UserDTO user;

	private MovieDTO movie;

}
