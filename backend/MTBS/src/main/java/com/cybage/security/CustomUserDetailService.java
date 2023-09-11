//package com.cybage.security;
//package com.cybage.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import com.cybage.exception.ResourceNotFoundException;
//import com.cybage.model.User;
//import com.cybage.repository.UserRepository;
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
