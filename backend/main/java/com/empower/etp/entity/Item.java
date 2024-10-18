package com.empower.etp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TP_ITEMS")
public class Item {
	@Id
    private Integer id;
    private String category;
    private String item;
    private Double price;
    private Integer limit;
    
    public Item() {}

	public Item(Integer id, String category, String item, Double price, Integer limit) {
		super();
		this.id = id;
		this.category = category;
		this.item = item;
		this.price = price;
		this.limit = limit;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getItem() {
		return item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", category=" + category + ", item=" + item + ", price=" + price
				+ ", limit=" + limit + "]";
	}
}
