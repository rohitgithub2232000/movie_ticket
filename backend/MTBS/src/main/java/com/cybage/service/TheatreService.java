package com.cybage.service;

import java.util.List;

import com.cybage.dto.TheatreDTO;

public interface TheatreService {

	// create-theatre-admin
	TheatreDTO createTheatre(TheatreDTO TheatreDTO);

	// update-theatre-admin
	TheatreDTO upateTheatre(TheatreDTO theatreDTO, Integer theatreId);

	// get-theatre-by-id-admin/user
	TheatreDTO getTheatreByTheatreId(Integer theatreId);

	// get-all-movie-admin/user
	List<TheatreDTO> getAllTheatres();

	// delete-theatre-admin
	void deleteTheatre(Integer theatreId);

//search theatre by keyword
	List<TheatreDTO> getTheatreByKeyword(String keyword);

}
