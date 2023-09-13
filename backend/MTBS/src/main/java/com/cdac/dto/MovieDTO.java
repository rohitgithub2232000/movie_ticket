package com.cdac.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

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

public class MovieDTO {

	private int movieId;

	@NotBlank(message = "Movie name should not be blank")
	@Size(min = 2, max = 100, message = "Movie name should have minimum 2 characters and maximim 100 characters")
	private String movieName;

	@NotNull(message = "Release date should not be null")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate releaseDate;

	@NotNull(message = "Duration should not be null")
	private Integer duration;

	@NotBlank(message = "Movie Description should not be blank")
	@Size(min = 3, max = 100, message = "Movie description should have minimum 3 characters and maximim 100 characters")
	private String description;

	@NotBlank(message = "Movie Genre should not be blank")
	private String genre;
	
	private String imageName;
	
//	private byte[] image;

	public void setImagePath(String string) {
		// TODO Auto-generated method stub
		
	}
}
