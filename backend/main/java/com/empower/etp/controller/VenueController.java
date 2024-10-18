package com.empower.etp.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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
import com.empower.etp.service.VenueService;
import com.empower.etp.entity.Venue;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/venue")
public class VenueController {

		@Autowired
		private VenueService vs;
		
		@PostMapping
		public Venue create(@RequestBody Venue venue) {
			return vs.create(venue);
		}
		
		@GetMapping
		public List<Venue> read() {
			return vs.read();
		}
		
		@GetMapping("/{id}")
		public Venue read(@PathVariable("id")Integer id) {
			return vs.read(id);
		}
		
		@PutMapping
		public Venue update(@RequestBody Venue venue) {
			return vs.update(venue);
		}
		
		@DeleteMapping("/{id}")
		public Venue delete(@PathVariable("id")Integer id) {
			return vs.delete(id);
		}
		
		@GetMapping("/notavailable/{dt}")
		public List<Venue> findNotAvailableVenues(@PathVariable("dt")String dt) throws ParseException
		{
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Date edate=sdf.parse(dt);
			return vs.findNotAvailableVenues(edate);
		}
		
		@GetMapping("/available/{dt}")
		public List<Venue> findAvailableVenues(@PathVariable("dt")String dt) throws ParseException
		{
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
			Date edate=sdf.parse(dt);
			
			return vs.findAvailableVenues(edate);
		}	
}

