package com.cdac.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.TheatreDTO;

import com.cdac.exception.ResourceNotFoundException;
import com.cdac.model.Theatre;

import com.cdac.repository.TheatreRepository;
import com.cdac.service.TheatreService;

@Service
public class TheatreServiceImpl implements TheatreService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private TheatreRepository theatreRepository;

	@Override
	public TheatreDTO createTheatre(TheatreDTO theatreDTO) {
		// mapping theatreDTO object with Theatre.class
		Theatre theatre = this.modelMapper.map(theatreDTO, Theatre.class);
		Theatre savedTheatre = this.theatreRepository.save(theatre);
		return this.modelMapper.map(savedTheatre, TheatreDTO.class);
	}
	
	@Override
	public TheatreDTO upateTheatre(TheatreDTO theatreDTO, Integer theatreId) {

		Theatre theatre = this.theatreRepository.findById(theatreId)
				.orElseThrow(() -> new ResourceNotFoundException("Theatre", "theatre id", theatreId));

		theatre.setTheatreName(theatreDTO.getTheatreName());
		theatre.setTheatreLocation(theatreDTO.getTheatreLocation());		
		theatre.setSeatsCapacity(theatreDTO.getSeatsCapacity());
		
		Theatre updatedTheatre = this.theatreRepository.save(theatre);
		return this.modelMapper.map(updatedTheatre, TheatreDTO.class);

	}


	@Override
	public TheatreDTO getTheatreByTheatreId(Integer theatreId) {
		Theatre theatre = this.theatreRepository.findById(theatreId)
				.orElseThrow(() -> new ResourceNotFoundException("Theatre", "theatre id", theatreId));
		return this.modelMapper.map(theatre, TheatreDTO.class);
	}

	
	@Override
	public List<TheatreDTO> getAllTheatres() {

		List<Theatre> theatres = this.theatreRepository.findAll();
		List<TheatreDTO> theatreDTOs = theatres.stream().map((c) -> this.modelMapper.map(c, TheatreDTO.class))
				.collect(Collectors.toList());
		return theatreDTOs;
	}


	@Override
	public void deleteTheatre(Integer theatreId) {

		Theatre theatre = this.theatreRepository.findById(theatreId)
				.orElseThrow(() -> new ResourceNotFoundException("Theatre", "theatre id: ", theatreId));

		this.theatreRepository.delete(theatre);

	}

	@Override
	public List<TheatreDTO> getTheatreByKeyword(String keyword) {
		List<Theatre> theatreBykeyWord = this.theatreRepository.findByKeyword(keyword);
		List<TheatreDTO> theatreDTO = theatreBykeyWord.stream().map(p -> this.modelMapper.map(p, TheatreDTO.class))
				.collect(Collectors.toList());
		return theatreDTO;
	}
}
