package com.cdac.exception;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@SuppressWarnings("serial")
@Getter
@Setter
@NoArgsConstructor
public class ResourceNotFoundException extends RuntimeException {

	String resourceName;
	String fieldName;	
	long fieldValue;
//	String userName;

	// for almost all methods
	public ResourceNotFoundException(String resourceName, String fieldName, long fieldValue) {
		super(String.format("%s not found with %s: %s", resourceName, fieldName, fieldValue));
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}

	public ResourceNotFoundException(String string, String string2, Integer theatreId,
			@NotNull(message = "Show date should not be null") LocalDate showDate,
			@NotNull(message = "Show Start Time should not be null") LocalTime showStartTime) {
		// TODO Auto-generated constructor stub
	}

	public ResourceNotFoundException(String resourceName2, String fieldName2, String emailId) {
		// TODO Auto-generated constructor stub
	}

}
