package com.empower.etp.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.empower.etp.entity.Event;
import com.empower.etp.entity.UserInfo;
import com.empower.etp.exception.UserNotFoundException;
import com.empower.etp.service.EventService;
import com.empower.etp.service.UserInfoService;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/event")
public class EventController {

		@Autowired
		private EventService es;
		
		@Autowired
		private UserInfoService us;

		@PostMapping
		public Event create(@RequestBody Event event) {
			return es.create(event);
		}
		
		@GetMapping
		public List<Event> read() {
			return es.read();
		}
		
		@GetMapping("/{id}")
		public Event read(@PathVariable("id")Integer id) {
			return es.read(id);
		}
		
		@PutMapping
		public Event update(@RequestBody Event event) {
			return es.update(event);
		}
		
		@DeleteMapping("/{id}")
		public Event delete(@PathVariable("id")Integer id) {
			return es.delete(id);
		}
		
		@GetMapping("/MyEvents/{userInfo}")
		public List<Event> findByUserInfo(@PathVariable("userInfo")UserInfo userInfo) throws ParseException
		{
			return es.findByUserInfo(userInfo);
		}
		
		@GetMapping("/professional/upcoming")
		public List<Event> getUpcomingProfessionalEvents(){
			return es.findByEventTypeAndStatus("Professional", "upcoming");
		}
		
		@GetMapping("/MyParticipatedEvents/{participantName}") 
		public List<Event> findEventsByParticipant(@PathVariable("participantName") String participantName) 
		{
			return es.findEventsByParticipant(participantName);
		}
		
		@GetMapping("/NotParticipatedEvents/{participantName}") 
		public List<Event> findProfessionalEventsNotPartOf(@PathVariable("participantName") String participantName) 
		{
			return es.findProfessionalEventsNotPartOf(participantName);
		}
		
		@PostMapping("/join/{eventId}/{username}")
		public Event participantJoinsAnEvent(@PathVariable("eventId") Integer eventId,@PathVariable("username") String username) {
			Event event = es.read(eventId);
			Optional<UserInfo> temp = us.getUserByUsername(username);
			
			UserInfo user=null;
			if(temp.isPresent())
				user=temp.get();
			else
				throw new UserNotFoundException("User with username " + username + " not found");
		
			event.getParticipants().add(user);
			return es.update(event);	
		}
}
