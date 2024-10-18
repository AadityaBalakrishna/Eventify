package com.empower.etp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.empower.etp.entity.Cart;

public interface CartRepository  extends JpaRepository<Cart, Integer>
{        
    @Query(value = "SELECT c.* FROM TP_CART c WHERE c.id IN (SELECT ec.carts_id FROM TP_EVENTS_CARTS ec WHERE ec.event_id = :eventId)", nativeQuery = true)
    List<Cart> findCartsByEventId(@Param("eventId") Integer id);
} 
