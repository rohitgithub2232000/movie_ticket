package com.cybage.serviceImpl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cybage.exception.ResourceNotFoundException;
import com.cybage.model.ERole;
import com.cybage.model.Role;
import com.cybage.model.User;
import com.cybage.payloads.LoginRequest;
import com.cybage.payloads.PasswordUpdateRequest;
import com.cybage.payloads.SignUpRequest;
import com.cybage.payloads.response.JwtResponse;
import com.cybage.payloads.response.MessageResponse;
import com.cybage.repository.RoleRepository;
import com.cybage.repository.UserRepository;
import com.cybage.security.jwt.JwtUtils;
import com.cybage.security.services.AuthenticationService;
import com.cybage.security.services.UserDetailsImpl;

@Service
public class AuthenticationServiceImplementation implements AuthenticationService {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Override
	public JwtResponse authenticateUser(LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return new JwtResponse(jwt, userDetails.getUserId(), userDetails.getUsername(), userDetails.getEmailId(),
				roles);
	}

	@Override
	public MessageResponse registerUser(SignUpRequest signUpRequest) {
		System.out.println("my pass1: " + signUpRequest.getPassword());
		System.out.println(userRepository.duplicateEmail(signUpRequest.getEmailId()));

//		if (!userRepository.duplicateEmail(signUpRequest.getEmailId())) {
//
//			return new MessageResponse("Error: Email is already in use!");
//		}
		// Create new user's account
		User user = new User(signUpRequest.getUserName(), signUpRequest.getUserMobileNumber(),
				signUpRequest.getEmailId(), encoder.encode(signUpRequest.getPassword()));
		System.out.println("encoded pass e " + user.getPassword());

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		user.setRoles(roles);
		System.out.println("encoded pass " + user.getPassword());
		userRepository.save(user);
		return new MessageResponse("User registered successfully!");
	}

	@SuppressWarnings("unused")
	@Override
	public MessageResponse forgetPassword(String emailId, PasswordUpdateRequest passwordUpdateRequest) {
		User user = (User) this.userRepository.findUserByEmailId(emailId)
				.orElseThrow(() -> new ResourceNotFoundException(" User ", " email ", emailId));

		user.setPassword(encoder.encode(passwordUpdateRequest.getPassword()));
		User updatedPassword = this.userRepository.save(user);
		return new MessageResponse("Password updated successfully!");
	}

}
