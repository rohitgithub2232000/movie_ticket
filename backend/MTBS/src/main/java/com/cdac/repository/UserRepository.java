package com.cdac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	@Query("SELECT p FROM User p WHERE CONCAT(p.userName,' ', p.userMobileNumber,' ',p.emailId) LIKE %?1%")
	List<User> findByKeyword(String user);

	Optional<User> findByUserName(String userName);

	Boolean existsByuserName(String userName);

	Optional<?> findUserByEmailId(String emailId);
	
	@Query(value= "SELECT IF(COUNT(*) > 0, 'false', 'true') FROM  movie_ticket.user t WHERE t.user_email_id = ?1", nativeQuery = true)
	Boolean duplicateEmail(String emailId);


}
