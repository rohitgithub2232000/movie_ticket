package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.UserDTO;
import com.cdac.exception.ApiResponse;
import com.cdac.service.UserService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/mtbs/")
@Slf4j
public class UserController {
	@Autowired
	UserService userService;

	// @PreAuthorize("hasRole('ADMIN')")
	// @PreAuthorize("hasRole('USER') or hasRole('ADMIN')") : only access to admin or user
	// @PreAuthorize("hasRole('USER')") only to user

	@PutMapping("/users/{userId}")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<UserDTO> updateUser(@Valid @PathVariable Integer userId, @RequestBody UserDTO userDTO) {
		log.info("Processing the request to updateUser for user {} in the Class : {}  ",userDTO.getUserName(), this.getClass().getName());
		UserDTO updatedUser = this.userService.upateUser(userDTO, userId);
		return new ResponseEntity<UserDTO>(updatedUser, HttpStatus.OK);
	}

	@GetMapping("/search/users/{keyword}")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUserByKeyword(@PathVariable String keyword) {
		log.info("Processing the request to getUserByKeyword with keyword {} in the Class : {}  ",keyword, this.getClass().getName());
		List<UserDTO> sercheduser = this.userService.getUserByKeyword(keyword);

		return new ResponseEntity<>((!sercheduser.isEmpty()) ? sercheduser
				: new ApiResponse("User not found with keyword: " + keyword, true), HttpStatus.OK);
	}

	@GetMapping("/users/{userId}")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<UserDTO> getUserByUserId(@PathVariable Integer userId) {
		log.info("Processing the request to getUserByUserId with userId {} in the Class : {}  ",userId, this.getClass().getName());
		UserDTO userById = this.userService.getUserByUserId(userId);
		return new ResponseEntity<UserDTO>(userById, HttpStatus.OK);
	}

	@GetMapping("/users/")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAllUsers() {
		log.info("Processing the request to getAllUsers in the Class : {}  ", this.getClass().getName());
		List<UserDTO> users = this.userService.getAllUsers();
		return new ResponseEntity<>((!users.isEmpty()) ? users : new ApiResponse("User list is empty ", true),
				HttpStatus.OK);
	}

	@DeleteMapping("users/{userId}")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Integer userId) {		
		this.userService.deleteUser(userId);
		log.info("Processing the request to deleteUser with userId {} in the Class : {}  ",userId, this.getClass().getName());
		return new ResponseEntity<ApiResponse>(new ApiResponse("User Deleted Successfully", true), HttpStatus.OK);
	}
}
