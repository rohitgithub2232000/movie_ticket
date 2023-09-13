package com.cdac.service;

import java.util.List;

import com.cdac.dto.CustomResponse;
import com.cdac.dto.ShowDetailsDTO;

public interface ShowDetailsService {

	// create-showDetials-admin/user
	ShowDetailsDTO createShowDetails(ShowDetailsDTO showDetailsDTO);

	// create--showDetials-admin/user
	CustomResponse createShowDetails(ShowDetailsDTO showDetailsDTO, Integer showDetialsId, Integer theatreId);

	// get-all-showDetials-admin/user
	ShowDetailsDTO getShowDetailsByShowDetailsId(Integer showId);

	// get-all-showDetials-admin/user
	List<ShowDetailsDTO> getAllShowDetails();

	public void updateSeatsCount(int ticketCount);

	// update-showDetials-admin
	ShowDetailsDTO upateShowDetails(ShowDetailsDTO showDetailsDTO, Integer showDetialsId);

	// delete-showDetials
	void deleteShowDetails(Integer showDetailsId);

	// search showDetials by keyword
	List<ShowDetailsDTO> getShowDetailsByMovieId(Integer movieId);

//	List<ShowDetailsDTO> getShowDetailsByDate(String keyword, LocalDate date);

}
