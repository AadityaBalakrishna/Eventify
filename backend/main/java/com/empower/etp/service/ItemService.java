package com.empower.etp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.empower.etp.entity.Item;
import com.empower.etp.repository.ItemRepository;

@Service
public class ItemService {
	@Autowired
	private ItemRepository ir;
	
	public Item create(Item item) {
		return ir.save(item);
	}
	
	public List<Item> read() {
		return ir.findAll();
	}

	public Item read(Integer id) {
		Optional<Item> temp = ir.findById(id);
		Item item=null;		
		if(temp.isPresent())
			item=temp.get();
		return item;
	}
	
	public Item update(Item item) {
		Item c = read(item.getId());
		if(c!=null)
		{
			c=item;
			ir.save(c);
		}
		return c;
	}
	
	public Item delete(Integer id) {
		Item c=read(id);
		if(c!=null)
		{
			ir.delete(c);
		}
		return c;
	}
}
