package com.cdac.payloads;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PasswordUpdateRequest {
	@NotBlank
	@Size(min = 3, max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	private Set<String> role;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;
//constructor for forget password
	public PasswordUpdateRequest(@NotBlank @Size(max = 50) @Email String email,
			@NotBlank @Size(min = 6, max = 40) String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public PasswordUpdateRequest(@NotBlank @Size(min = 3, max = 20) String username,
			@NotBlank @Size(max = 50) @Email String email, Set<String> role,
			@NotBlank @Size(min = 6, max = 40) String password) {
		super();
		this.username = username;
		this.email = email;
		this.role = role;
		this.password = password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}

}
