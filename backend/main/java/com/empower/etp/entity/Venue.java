package com.empower.etp.entity;

import java.util.Arrays;
import org.apache.tomcat.util.codec.binary.Base64;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "TP_VENUES")
public class Venue {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String venueName;
	private Long price;
	@Lob
	private String picture;
	
	public Venue() {}

	public Venue(Integer id, String venueName, Long price, String picture) {
		super();
		this.id = id;
		this.venueName = venueName;
		this.price = price;
		this.picture = picture;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getVenueName() {
		return venueName;
	}

	public void setVenueName(String venueName) {
		this.venueName = venueName;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Override
	public String toString() {
		return "Venue [id=" + id + ", venueName=" + venueName + ", price=" + price + ", picture=" + picture + "]";
	}
}
