package com.iliastore.backend.pojo;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="product")
@Getter
@Setter

public class Product {
    @Id
   /*  @GeneratedValue(strategy = GenerationType.IDENTITY) */
    private Long id ;
    
    private String title; 
    private String company ; 
    @Column(length = 30000)
    private String description ; 
    private boolean featured ; 
    private LocalDateTime updatedAt ; 
    private LocalDateTime createdAt ;
    private LocalDateTime publishedAt ; 
    private String category ; 
    private String image; 
    private double price; 
    private boolean shipping ; 
    private List<String> colors;
    

    

    
}
