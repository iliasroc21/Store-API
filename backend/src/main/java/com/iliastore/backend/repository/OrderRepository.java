package com.iliastore.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iliastore.backend.pojo.Order;
@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    Page<Order>  findAllByEmail(String email , Pageable page);
    
    
}
