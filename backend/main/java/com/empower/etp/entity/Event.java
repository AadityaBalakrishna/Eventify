package com.empower.etp.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "TP_EVENTS")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@ManyToOne
	@JoinColumn(name = "username")
	private UserInfo userInfo;
	private String eventName;
	private String eventType;
	@ManyToOne
	@JoinColumn(name = "venueId")
	private Venue venue;
	@Temporal(TemporalType.DATE)
	private Date eventDate;
	private String description;
	@Lob
	private String picture;
	private String status;
	@ManyToMany
	private List<UserInfo> participants=new ArrayList<>();
	@OneToMany
	private List<Cart> carts=new ArrayList<>();
	
	public Event() {}

	public Event(Integer id, UserInfo userInfo, String eventName, String eventType, Venue venue, Date eventDate,
			String description, String picture, String status, List<UserInfo> participants) {
		super();
		this.id = id;
		this.userInfo = userInfo;
		this.eventName = eventName;
		this.eventType = eventType;
		this.venue = venue;
		this.eventDate = eventDate;
		this.description = description;
		this.picture = picture;
		this.status = status;
		this.participants = participants;
	}

	public Event(Integer id, UserInfo userInfo, String eventName, String eventType, Venue venue, Date eventDate,
			String description, String picture, String status, List<UserInfo> participants, List<Cart> carts) {
		super();
		this.id = id;
		this.userInfo = userInfo;
		this.eventName = eventName;
		this.eventType = eventType;
		this.venue = venue;
		this.eventDate = eventDate;
		this.description = description;
		this.picture = picture;
		this.status = status;
		this.participants = participants;
		this.carts = carts;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public UserInfo getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public Venue getVenue() {
		return venue;
	}

	public void setVenue(Venue venue) {
		this.venue = venue;
	}

	public Date getEventDate() {
		return eventDate;
	}

	public void setEventDate(Date eventDate) {
		this.eventDate = eventDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<UserInfo> getParticipants() {
		return participants;
	}

	public void setParticipants(List<UserInfo> participants) {
		this.participants = participants;
	}

	public List<Cart> getCarts() {
		return carts;
	}

	public void setCarts(List<Cart> carts) {
		this.carts = carts;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", userInfo=" + userInfo + ", eventName=" + eventName + ", eventType=" + eventType
				+ ", venue=" + venue + ", eventDate=" + eventDate + ", description=" + description + ", picture="
				+ picture + ", status=" + status + ", participants=" + participants + ", carts=" + carts + "]";
	}
}
