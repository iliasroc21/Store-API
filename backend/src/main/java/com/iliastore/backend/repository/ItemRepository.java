package com.iliastore.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iliastore.backend.pojo.Item;
@Repository
public interface ItemRepository extends JpaRepository<Item , Long> {
    
}
