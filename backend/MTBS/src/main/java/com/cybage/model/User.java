package com.cdac.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class User {


// constructor regi.
	public User(String userName, String userMobileNumber,  String emailId, String password) {
	
		this.userName = userName;
		this.userMobileNumber = userMobileNumber;
		this.emailId = emailId;
		this.password = password;
	}

	//	Taking email as Primary key. Any issue? (Need to implement pattern for it)
	@Id
	@GeneratedValue
	private int userId;
	
	@Column(name="user_name", nullable = false)
	private String userName;
	
	@Column(name="user_mobile_number", nullable = false,unique = true)
	private String userMobileNumber;
	
	@Column(name="user_email_id")
	private String emailId;
	
	@Column(name="user_password")
	private String password;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	private List<Booking> booking;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	private List<Rating> rating;
	
	@ManyToMany(fetch = FetchType.LAZY)
	  @JoinTable(  name = "user_roles", 
	        joinColumns = @JoinColumn(name = "user_id"), 
	        inverseJoinColumns = @JoinColumn(name = "role_id"))
	  private Set<Role> roles = new HashSet<>();
	
}
