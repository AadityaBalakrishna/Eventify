package com.empower.etp.service;

import java.util.List;
import com.empower.etp.entity.Cart;
import com.empower.etp.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class CartService {
	
	@Autowired
	private CartRepository cr;
	
	public Cart create(Cart cart) {
		return cr.save(cart);
	}
	public List<Cart> read() {
		return cr.findAll();
	}
	public Cart read(Integer cid) {
		return cr.findById(cid).orElse(null);
	}
	public Cart update(Cart cart) {
		if(read(cart.getId())!=null)
		{
			return cr.save(cart);
		}else
		{
			return null;
		}
	}
	public Cart delete(Integer cid) {
		Cart emp=null;
		if(read(cid)!=null)
		{
			emp=read(cid);
			cr.delete(emp);
		}
		return emp;
	}

    public List<Cart> getCartsByEventId(@PathVariable Integer eventId) {
        return cr.findCartsByEventId(eventId);
    }
}


