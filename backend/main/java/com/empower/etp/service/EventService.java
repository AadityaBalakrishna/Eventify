package com.empower.etp.service;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.empower.etp.entity.Event;
import com.empower.etp.entity.UserInfo;
import com.empower.etp.entity.Venue;
import com.empower.etp.repository.EventRepository;

@Service
public class EventService {

	@Autowired
	private EventRepository er;
	
	public Event create(Event event) {
		return er.save(event);
	}
	
	public List<Event> read() {
		return er.findAll();
	}
	
	public Event read(Integer cid) {
		return er.findById(cid).orElse(null);
	}
	
	public Event update(Event event) {
		if(read(event.getId())!=null)
		{
			return er.save(event);
		}else
		{
			return null;
		}
	}
	
	public Event delete(Integer cid) {
		Event emp=null;
		if(read(cid)!=null)
		{
			emp=read(cid);
			er.delete(emp);
		}
		return emp;
	}
	
	public List<Event> findByUserInfo(UserInfo userInfo)
	{
		return er.findByUserInfo(userInfo);
	}
	
	public List<Event> findByEventTypeAndStatus(String eventType, String status)
	{
		return er.findByEventTypeAndStatus(eventType, status);
	}
	
	public List<Event> findEventsByParticipant(String participantName)
	{
		return er.findEventsByParticipant(participantName);
	}
	
	public List<Event> findProfessionalEventsNotPartOf(String participantName)
	{
		return er.findProfessionalEventsNotPartOf(participantName);
	}
	
}


