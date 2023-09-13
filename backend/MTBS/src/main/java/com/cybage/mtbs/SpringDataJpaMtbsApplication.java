package com.cdac.mtbs;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.cdac") // used because bean is in different package
@EnableJpaRepositories(basePackages = "com.cdac.repository") // to enable JPA repository
@EntityScan(basePackages = "com.cdac.model") // scan this package and create table in database

public class SpringDataJpaMtbsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringDataJpaMtbsApplication.class, args);
	}

	@Bean
	ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
