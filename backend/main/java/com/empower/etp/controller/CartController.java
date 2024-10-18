package com.empower.etp.controller;

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
import com.empower.etp.entity.Cart;
import com.empower.etp.service.CartService;
import oracle.net.aso.c;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/cart")
public class CartController {
	@Autowired
	private CartService cs;
	
	@PostMapping
	public List<Cart> create(@RequestBody List<Cart> carts) {
		for(Cart c:carts)
		{
			cs.create(c);
		}
		return  carts;
	}
	
	@GetMapping
	public List<Cart> read() {
		return cs.read();
	}
	
	@GetMapping("/{id}")
	public Cart read(@PathVariable("id")Integer id) {
		return cs.read(id);
	}
	
	@PutMapping
	public Cart update(@RequestBody Cart cart) {
		return cs.update(cart);
	}
	
	@DeleteMapping("/{id}")
	public Cart delete(@PathVariable("id")Integer id) {
		return cs.delete(id);
	}
	
    @GetMapping("/event/{eventId}")
    public List<Cart> getCartsByEventId(@PathVariable Integer eventId) {
        return cs.getCartsByEventId(eventId);
    }
}
