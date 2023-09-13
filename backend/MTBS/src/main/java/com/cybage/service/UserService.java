package com.cdac.service;

import java.util.List;

import com.cdac.dto.UserDTO;

public interface UserService {
	
	//create-user-admin
		UserDTO createUser(UserDTO userDTO);

		//update-user-admin
		UserDTO upateUser(UserDTO userDTO, Integer userId);

		//get-user-byUserId-admin/user
		UserDTO getUserByUserId(Integer userId);

		//get-all-user-admin/user
		List<UserDTO> getAllUsers();

		//delete-user
		void deleteUser(Integer userId);

		//search user by keyword
		List<UserDTO> getUserByKeyword(String keyword); 

}
