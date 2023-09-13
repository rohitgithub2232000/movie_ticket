package com.cdac.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer>{
	@Query("SELECT p FROM Booking p WHERE CONCAT(p.user) LIKE %?1%")
	List<Booking> findByUserId(Integer userId);
}
