package com.cdac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.payloads.LoginRequest;
import com.cdac.payloads.PasswordUpdateRequest;
import com.cdac.payloads.SignUpRequest;
import com.cdac.payloads.response.JwtResponse;
import com.cdac.payloads.response.MessageResponse;
import com.cdac.repository.RoleRepository;
import com.cdac.repository.UserRepository;
import com.cdac.security.jwt.JwtUtils;
import com.cdac.security.services.AuthenticationService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthenticationController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping("/signin")
	public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		JwtResponse jwtResponse = authenticationService.authenticateUser(loginRequest);
		
		log.info("Processing the request for the login for user {} in the Class : {}  ", loginRequest.getEmailId(), this.getClass().getName() );
		return new ResponseEntity<>(jwtResponse, HttpStatus.CREATED);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		MessageResponse messageResponse = authenticationService.registerUser(signUpRequest);
		return new ResponseEntity<>(messageResponse, HttpStatus.CREATED);
	}

	@PutMapping("/forgetpassword/{emailId}")
	public ResponseEntity<MessageResponse> forgetPassword(@Valid @PathVariable String emailId,
			@RequestBody PasswordUpdateRequest passwordUpdateRequest) {
		// PasswordUpdateRequest updatedPassword =
		// this.authenticationService.forgetPasword(emailId);
		log.info("Processing the request for the forget password for email {} in the Class : {}  ", emailId, this.getClass().getName() );
		MessageResponse messageResponse = this.authenticationService.forgetPassword(emailId, passwordUpdateRequest);
		return new ResponseEntity<>(messageResponse, HttpStatus.OK);
	}

}
