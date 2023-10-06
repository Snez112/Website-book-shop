/*
 * (C) Copyright 2022. All Rights Reserved.
 *
 * @author DongTHD
 * @date Mar 10, 2022
*/
package vn.fs.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

	private String name;
	private String email;
	private String password;
	private String phone;
	private String address;
	private Boolean gender;
	private Boolean status;
	private String image;
	private LocalDate registerDate;

	private Set<String> role;

}
