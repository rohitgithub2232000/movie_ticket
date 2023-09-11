package com.cybage.payloads.response;

import com.cybage.dto.MovieDTO;

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
