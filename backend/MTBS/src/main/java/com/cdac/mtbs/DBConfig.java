//package com.cdac.mtbs;
//
//import javax.sql.DataSource;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.jdbc.datasource.DriverManagerDataSource;
//
//@Configuration
//public class DBConfig {
//	/*
//	 * Failed to configure a DataSource: 'url' attribute is not specified and no
//	 * embedded datasource could be configured
//	 * 
//	 * -> this class avoids the above error.
//	 */
//	@Bean
//	public DataSource dataSource() {
//		DriverManagerDataSource dataSource = new DriverManagerDataSource();
//		dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
//		dataSource.setUrl("jdbc:mysql://localhost:3306/movie_ticket");
//		dataSource.setUsername("root");
//		dataSource.setPassword("root");
//
//		return dataSource;
//	}
//
//}
