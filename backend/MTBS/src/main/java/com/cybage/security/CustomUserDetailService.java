//package com.cdac.security;
//package com.cdac.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import com.cdac.exception.ResourceNotFoundException;
//import com.cdac.model.User;
//import com.cdac.repository.UserRepository;
//	
//public class CustomUserDetailService implements  UserDetailsService{
// 
//	@Autowired
//	private UserRepository userRepository;
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		// using email as username
//		User user=this.userRepository.findByEmail(username).orElseThrow(() -> new ResourceNotFoundException("User", "username(email)", username));
//		   
//		return user;
//	}
//
//}
