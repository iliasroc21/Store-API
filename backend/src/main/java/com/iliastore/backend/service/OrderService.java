package com.iliastore.backend.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.iliastore.backend.CONSTANTS;
import com.iliastore.backend.pojo.Item;
import com.iliastore.backend.pojo.Meta;
import com.iliastore.backend.pojo.Order;
import com.iliastore.backend.pojo.OrderResponse;
import com.iliastore.backend.pojo.Pagination;
import com.iliastore.backend.repository.ItemRepository;
import com.iliastore.backend.repository.OrderRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class OrderService {
    OrderRepository orderRepository ; 
    ItemRepository itemRepository ;
    public void createOrder(Order order){
        orderRepository.save(order);
        for(Item item :order.getCartItems()){
            item.setOrder(order);
            itemRepository.save(item);

            
        }

        

    }
    
    public OrderResponse getAllOrders(String email , int page){
        Pageable paging  = PageRequest.of(page -1 , CONSTANTS.pageSize);
        Page<Order> orders = orderRepository.findAllByEmail(email , paging);
        return unwrappedOrder(orders, page);
    }

    public OrderResponse unwrappedOrder(Page<Order> orders ,int page ){
        return OrderResponse.builder().data(orders.getContent()).
           meta(
            new Meta(new Pagination(
                page , CONSTANTS.pageSize , orders.getTotalPages() , 
                orders.getTotalElements()
                ), 
            CONSTANTS.companies , CONSTANTS.categories)).build();

    }
    

    
}
