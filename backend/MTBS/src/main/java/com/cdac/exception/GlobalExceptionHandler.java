package com.cdac.exception;

import java.util.HashMap;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// whenever exceptions are thrown by ResourceNotFoundException.class following
	// method will be invoked
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException exp) {
		String message = exp.getMessage();
		ApiResponse apiResponse = new ApiResponse(message, false);
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
	}

	// whenever exceptions are thrown by MethodArgumentNotValidException.class
	// following
	// method will be invoked
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleMethodArgumentNotValidException(
			MethodArgumentNotValidException arg) {
		Map<String, String> response = new HashMap<>();
		// getBindingResult() ->Return the BindingResult that this BindException wraps.
		arg.getBindingResult().getAllErrors().forEach((err) -> {
			String fieldName = ((FieldError) err).getField();
			String message = err.getDefaultMessage();
			response.put(fieldName, message);
		});

		return new ResponseEntity<Map<String, String>>(response, HttpStatus.BAD_REQUEST);
	}

	// whenever exceptions are thrown by DataIntegrityViolationException.class
		// following
		// method will be invoked
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<UniqueKeyRespose> handleUniqueConstraintException(DataIntegrityViolationException ex) {
		UniqueKeyRespose uniqueKeyerror = new UniqueKeyRespose();
		uniqueKeyerror.setMessage("Unique constraint violation: " + ex.getMessage());
		return new ResponseEntity<>(uniqueKeyerror, HttpStatus.BAD_REQUEST);
	}

}
