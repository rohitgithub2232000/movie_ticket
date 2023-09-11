package com.cybage.dto;

import java.util.Set;

import com.cybage.model.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {

	private int userId;

	@NotBlank(message = "User Name should not be blank")
	private String userName;

	@NotBlank(message = "User Mobile Number should not be blank")
	private String userMobileNumber;

	@NotBlank(message = "User Email Id should not be blank")
	@Email(message = "Invalid email! Email should be in format name@domain.com")
	private String emailId;

	@NotBlank(message = "User password cannot be blank")
	@Size(min = 8, max = 100, message = "Password should have minimum 8 characters and maximim 100 characters")
	private String password;

	private Set<Role> roles;
}
