package com.empower.etp.repository;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.empower.etp.entity.Venue;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Integer> {

        @Query("select e.venue from Event e where e.eventDate=:ed")
        List<Venue> findNotAvailableVenuesByDate(@Param("ed")Date eventDate);

        @Query("select v from Venue v where v not in (select e.venue from Event e where e.eventDate=:ed)")
        List<Venue> findAvailableVenuesByDate(@Param("ed")Date eventDate);
}
