package com.empower.etp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.empower.etp.entity.Event;
import com.empower.etp.entity.UserInfo;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer>{

        List<Event> findByUserInfo(UserInfo userInfo);

        List<Event> findByEventTypeAndStatus(String eventType, String status);

        @Query(value="select * from TP_EVENTS where id in(select event_id from TP_EVENTS_PARTICIPANTS WHERE PARTICIPANTS_USERNAME=:participantName)",nativeQuery=true)
        List<Event> findEventsByParticipant(@Param("participantName") String participantName);

        @Query(value="select * from TP_EVENTS where eventtype='Professional' and eventdate >=sysdate and status='upcoming' and id not in(select event_id from TP_EVENTS_PARTICIPANTS WHERE PARTICIPANTS_USERNAME=:participantName)", nativeQuery=true)
        List<Event> findProfessionalEventsNotPartOf(@Param("participantName") String participantName);
}
