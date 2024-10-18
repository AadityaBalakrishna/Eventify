package com.empower.etp.service;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.empower.etp.repository.VenueRepository;
import com.empower.etp.entity.Venue;

@Service
public class VenueService
{
	@Autowired
	private VenueRepository vr;
	
	public Venue create(Venue venue) {
		return vr.save(venue);
	}
	
	public List<Venue> read() {
		return vr.findAll();
	}
	
	public Venue read(Integer id) {
		return vr.findById(id).orElse(null);
	}
	
	public Venue update(Venue venue)
	{
		if(read(venue.getId())!=null)
		{
			return vr.save(venue);
		}else
		{
			return null;
		}	
	}
	
	public Venue delete(Integer id)
	{
		Venue bmp=null;
		if(read(id)!=null)
		{
			bmp=read(id);
			vr.delete(bmp);
		}
		return bmp;
	}

	public List<Venue> findNotAvailableVenues(Date dt)
	{
		return vr.findNotAvailableVenuesByDate(dt);
	}
	
	public List<Venue> findAvailableVenues(Date dt)
	{
		return vr.findAvailableVenuesByDate(dt);
	}
}
