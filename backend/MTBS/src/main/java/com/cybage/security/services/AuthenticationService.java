package com.cybage.security.services;

import com.cybage.payloads.LoginRequest;
import com.cybage.payloads.PasswordUpdateRequest;
import com.cybage.payloads.SignUpRequest;
import com.cybage.payloads.response.JwtResponse;
import com.cybage.payloads.response.MessageResponse;

public interface AuthenticationService {
	
	//login
	JwtResponse authenticateUser(LoginRequest loginRequest);
	
	//register
	MessageResponse registerUser(SignUpRequest signupRequest);
	
    MessageResponse forgetPassword(String emailId, PasswordUpdateRequest passwordUpdateRequest);
}
