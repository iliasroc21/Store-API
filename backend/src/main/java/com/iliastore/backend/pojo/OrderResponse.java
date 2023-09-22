package com.iliastore.backend.pojo;

import java.util.List;

import lombok.Builder;
import lombok.Data;




@Data
@Builder
public class OrderResponse {
    private List<Order> data;
    private Meta meta;
    
}
