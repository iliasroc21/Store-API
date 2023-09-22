package com.iliastore.backend.pojo;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
@RequiredArgsConstructor

@Entity
@Table(name="orders")
@Getter
@Setter

public class Order {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ; 
    private String address ; 
    private String name ; 
    private String orderTotal ; 
    private double chargeTotal; 
    @JsonIgnore
    private String email ;
    private int numItemsInCart;
    @OneToMany(mappedBy="order")
    private List<Item> cartItems ;


    

    

}