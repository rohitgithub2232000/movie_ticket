package com.cdac.security.services;

import com.cdac.payloads.LoginRequest;
import com.cdac.payloads.PasswordUpdateRequest;
import com.cdac.payloads.SignUpRequest;
import com.cdac.payloads.response.JwtResponse;
import com.cdac.payloads.response.MessageResponse;

public interface AuthenticationService {
	
	//login
	JwtResponse authenticateUser(LoginRequest loginRequest);
	
	//register
	MessageResponse registerUser(SignUpRequest signupRequest);
	
    MessageResponse forgetPassword(String emailId, PasswordUpdateRequest passwordUpdateRequest);
}
