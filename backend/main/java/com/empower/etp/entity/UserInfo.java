package com.empower.etp.entity;

import java.util.Arrays;
import java.util.Date;
import org.apache.tomcat.util.codec.binary.Base64;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "TP_USERS")
public class UserInfo
{
	@Id
    private String username;
    private String password;
    private String name;
    private String role;
    @Temporal(TemporalType.DATE)
    private Date dob;
    @Lob
    private String picture;
    
    public UserInfo() {}

	public UserInfo(String username, String password, String name, String role, Date dob, String picture) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.role = role;
		this.dob = dob;
		this.picture = picture;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Override
	public String toString() {
		return "UserInfo [username=" + username + ", password=" + password + ", name=" + name + ", role=" + role
				+ ", dob=" + dob + ", picture=" + picture + "]";
	}
}
