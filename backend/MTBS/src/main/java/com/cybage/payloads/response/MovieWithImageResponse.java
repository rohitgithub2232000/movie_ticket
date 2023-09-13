package com.cdac.payloads.response;

import com.cdac.dto.MovieDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class MovieWithImageResponse {
	
	private MovieDTO movieDTO;
	
	private String imageUrl;

}
