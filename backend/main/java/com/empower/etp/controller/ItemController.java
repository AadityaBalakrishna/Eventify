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
import com.empower.etp.entity.Item;
import com.empower.etp.service.ItemService;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/item")
public class ItemController {
	
	@Autowired
	private ItemService its;
	
	@PostMapping
	public Item create(@RequestBody Item inventory) {
		return its.create(inventory);
	}
	
	@GetMapping
	public List<Item> read() {
		return its.read();
	}
	
	@GetMapping("/{id}")
	public Item read(@PathVariable("id")Integer id) {
		return its.read(id);
	}
	
	@PutMapping
	public Item update(@RequestBody Item inventory) {
		return its.update(inventory);
	}
	
	@DeleteMapping("/{id}")
	public Item delete(@PathVariable("id")Integer id) {
		return its.delete(id);
	}
}
