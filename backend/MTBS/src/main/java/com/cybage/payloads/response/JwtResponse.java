
package com.cybage.payloads.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private int id;
	private String userName;
	private String emailId;
	private List<String> roles;

	public JwtResponse(String accessToken, int id, String userName, String emailId, List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.userName = userName;
		this.emailId = emailId;
		this.roles = roles;
	}

}
