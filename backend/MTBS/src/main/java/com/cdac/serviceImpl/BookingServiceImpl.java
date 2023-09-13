package com.cdac.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.BookingDTO;
import com.cdac.exception.ResourceNotFoundException;
import com.cdac.model.Booking;
import com.cdac.model.BookingStatus;
import com.cdac.model.ShowDetails;
import com.cdac.model.User;
import com.cdac.repository.BookingRepository;
import com.cdac.repository.ShowDetailsRepository;
import com.cdac.repository.UserRepository;
import com.cdac.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private ShowDetailsRepository showDetailsRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public BookingDTO createBooking(BookingDTO bookingDTO, Integer showId, String userName) {

		ShowDetails showDetails = this.showDetailsRepository.findById(showId)
				.orElseThrow(() -> new ResourceNotFoundException("ShowDetails", "show id", showId));
		User user = this.userRepository.findByUserName(userName)
				.orElseThrow(() -> new ResourceNotFoundException("User", "user name", userName));
		
		Booking booking = this.modelMapper.map(bookingDTO, Booking.class);
		
		booking.setShowDetails(showDetails);
		booking.setUser(user);
		
		System.out.println((bookingDTO.getTicketCount()) * showDetails.getTicketRate());
		booking.setTotalAmount((bookingDTO.getTicketCount()) * showDetails.getTicketRate());
		booking.setBookingStatus(BookingStatus.CONFIRMED);

		Booking savedBooking = this.bookingRepository.save(booking);
		return this.modelMapper.map(savedBooking, BookingDTO.class);

	}


//	@Override
//	public BookingDTO createBooking(BookingDTO bookingDTO) {
//
//		// mapping bookingDTO object with Booking.class
//		ShowDetails showDetails = this.showDetailsRepository.findById(bookingDTO.getShowDetails().getShowId())
//				.orElseThrow(() -> new ResourceNotFoundException("ShowDetails", "showDetails id",
//						bookingDTO.getShowDetails().getShowId()));
//
//		User user = this.userRepository.findById(bookingDTO.getUser().getUserId())
//				.orElseThrow(() -> new ResourceNotFoundException("User", "user id", bookingDTO.getUser().getUserId()));
//
//		Booking booking = this.modelMapper.map(bookingDTO, Booking.class);
//
//		booking.setUser(user);
//		booking.setTotalAmount((bookingDTO.getTicketCount()) * bookingDTO.getShowDetails().getTicketRate());
//		booking.setBookingStatus(BookingStatus.CONFIRMED);
//
//		Booking savedBooking = this.bookingRepository.save(booking);
//		return this.modelMapper.map(savedBooking, BookingDTO.class);
//	}

	@Override
	public BookingDTO upateBooking(BookingDTO bookingDTO, Integer bookingId) {

		Booking booking = this.bookingRepository.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Booking", "booking id", bookingId));

		booking.setTicketCount(bookingDTO.getTicketCount());
		booking.setTotalAmount((bookingDTO.getTicketCount()) * bookingDTO.getShowDetails().getTicketRate());

		Booking updatedBooking = this.bookingRepository.save(booking);
		return this.modelMapper.map(updatedBooking, BookingDTO.class);

	}

	@Override
	public BookingDTO getBookingByBookingId(Integer bookingId) {
		Booking booking = this.bookingRepository.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Booking", "booking id", bookingId));
		return this.modelMapper.map(booking, BookingDTO.class);
	}

	@Override
	public List<BookingDTO> getAllBookings() {

		List<Booking> bookings = this.bookingRepository.findAll();
		List<BookingDTO> bookingDTOs = bookings.stream().map((c) -> this.modelMapper.map(c, BookingDTO.class))
				.collect(Collectors.toList());
		return bookingDTOs;
	}

	@Override
	public void deleteBooking(Integer bookingId) {

		Booking booking = this.bookingRepository.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Booking", "booking id: ", bookingId));

		this.bookingRepository.delete(booking);

	}


	@Override
	public List<BookingDTO> getAllBookingsForUser(String userName) {
		User user = this.userRepository.findByUserName(userName)
				.orElseThrow(() -> new ResourceNotFoundException("User", "user name", userName));
		List<Booking> bookingBykeyWord = this.bookingRepository. findByUserId (user.getUserId());		
		List<BookingDTO> bookingDTO = bookingBykeyWord.stream().map(p -> this.modelMapper.map(p, BookingDTO.class))
				.collect(Collectors.toList());
		return bookingDTO;		

	}

//	@Override
//	public List<BookingDTO> getBookingByKeyword(String keyword) {
////		List<Booking> bookingBykeyWord = this.bookingRepository.findByKeyword(keyword);
//		List<BookingDTO> bookingDTO = bookingBykeyWord.stream().map(p -> this.modelMapper.map(p, BookingDTO.class))
//				.collect(Collectors.toList());
//		return bookingDTO;
//	}

}
