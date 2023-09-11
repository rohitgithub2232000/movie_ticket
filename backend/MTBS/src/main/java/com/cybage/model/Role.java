package com.cybage.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles")
public class Role {

	public Role(String string) {
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int id;
	
	  @Enumerated(EnumType.STRING)
	  @Column(length = 20)
	  private ERole name;

	
}
