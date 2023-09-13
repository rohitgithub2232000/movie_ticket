package com.cdac.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TheatreDTO {
	private int theatreId;

	@NotBlank(message = "Theatre Name should not be blank")
	@Size(min = 2,max= 100,message = "Theatre name should have minimum 2 characters and maximim 50 characters")
	private String theatreName;

	@NotBlank(message = "Theatre Location should not be blank")
	@Size(min = 2,max= 100,message = "Theatre location should have minimum 2 characters and maximim 50 characters")
	private String theatreLocation;

	@NotNull(message = "Seats Capacity should not be null")	
	private int seatsCapacity;

}
