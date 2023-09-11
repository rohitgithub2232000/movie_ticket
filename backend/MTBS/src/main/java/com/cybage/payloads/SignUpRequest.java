package com.cybage.payloads;

import java.util.Set;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class SignUpRequest {

	private String userName;

	private String userMobileNumber;

	private String emailId;
	private String password;
	private Set<String> role;
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public void setUserMobileNumber(String userMobileNumber) {
		this.userMobileNumber = userMobileNumber;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setRole(Set<String> role) {
		this.role = role;
	}
	public SignUpRequest(String userName, String userMobileNumber, String emailId, String password, Set<String> role) {
		super();
		this.userName = userName;
		this.userMobileNumber = userMobileNumber;
		this.emailId = emailId;
		this.password = password;
		this.role = role;
	}
	public SignUpRequest(String userName, String userMobileNumber, String emailId, String password) {
		super();
		this.userName = userName;
		this.userMobileNumber = userMobileNumber;
		this.emailId = emailId;
		this.password = password;
	}
}
