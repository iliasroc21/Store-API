package com.iliastore.backend.pojo;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponse {
    
    private List<Product> data ; 
    private Meta meta  ; 

    
}
