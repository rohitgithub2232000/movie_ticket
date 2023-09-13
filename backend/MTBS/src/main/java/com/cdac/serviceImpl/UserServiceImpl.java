package com.cdac.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.UserDTO;
import com.cdac.exception.ResourceNotFoundException;
import com.cdac.model.User;
import com.cdac.repository.UserRepository;
import com.cdac.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDTO createUser(UserDTO userDTO) {

		// mapping userDTO object with User.class
		User user = this.modelMapper.map(userDTO, User.class);
//		user.setGenre(userDTO.getGenre().toUpperCase());
		User savedUser = this.userRepository.save(user);
		return this.modelMapper.map(savedUser, UserDTO.class);
	}

	@Override
	public UserDTO upateUser(UserDTO userDTO, Integer userId) {

		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "user id", userId));

		user.setUserName(userDTO.getUserName());
		user.setUserMobileNumber(userDTO.getUserMobileNumber());
		user.setEmailId(userDTO.getEmailId());
//		user.setPassword(userDTO.getPassword());
		
		User updatedUser = this.userRepository.save(user);
		return this.modelMapper.map(updatedUser, UserDTO.class);

	}

	@Override
	public UserDTO getUserByUserId(Integer userId) {
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "user id", userId));
		return this.modelMapper.map(user, UserDTO.class);
	}

	@Override
	public List<UserDTO> getAllUsers() {

		List<User> users = this.userRepository.findAll();
		List<UserDTO> userDTOs = users.stream().map((c) -> this.modelMapper.map(c, UserDTO.class))
				.collect(Collectors.toList());
		return userDTOs;
	}

	@Override
	public void deleteUser(Integer userId) {

		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "user id: ", userId));

		this.userRepository.delete(user);

	}

	@Override
	public List<UserDTO> getUserByKeyword(String keyword) {
		List<User> userBykeyWord = this.userRepository.findByKeyword(keyword);
		List<UserDTO> userDTO = userBykeyWord.stream().map(p -> this.modelMapper.map(p, UserDTO.class))
				.collect(Collectors.toList());
		return userDTO;
	}

}
