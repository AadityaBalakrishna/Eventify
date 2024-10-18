package com.empower.etp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TP_CART")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "username")
    private UserInfo userInfo;
    @ManyToOne
    private Item item;
    private Integer  quantity;  
    private Integer cartPrice;

    public Cart() {}

	public Cart(Integer id, UserInfo userInfo, Item item, Integer quantity) {
		super();
		this.id = id;
		this.userInfo = userInfo;
		this.item = item;
		this.quantity = quantity;
	}
	
	public Cart(Integer id, UserInfo userInfo, Item item, Integer quantity, Integer cartPrice) {
		super();
		this.id = id;
		this.userInfo = userInfo;
		this.item = item;
		this.quantity = quantity;
		this.cartPrice = cartPrice;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public UserInfo getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public Integer getCartPrice() {
		return cartPrice;
	}

	public void setCartPrice(Integer cartPrice) {
		this.cartPrice = cartPrice;
	}

	@Override
	public String toString() {
		return "Cart [id=" + id + ", userInfo=" + userInfo + ", item=" + item + ", quantity=" + quantity
				+ ", cartPrice=" + cartPrice + "]";
	}
}
