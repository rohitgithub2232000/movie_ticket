package com.cdac.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {
	private String userName;
	private String emailId;
	private String password;
	public LoginRequest(String userName, String emailId, String password) {
		super();
		this.userName = userName;
		this.emailId = emailId;
		this.password = password;
	}
	
	public LoginRequest(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}
	

}
