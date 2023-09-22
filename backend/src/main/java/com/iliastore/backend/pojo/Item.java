package com.iliastore.backend.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id  ; 
    private int amount ; 
    private String cartId;
    private String company ; 
    private String image;
    private double price; 
    private String productColor ;
    private int productID;
    private String title ;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="order_id",referencedColumnName = "id")
    private Order order;
}
