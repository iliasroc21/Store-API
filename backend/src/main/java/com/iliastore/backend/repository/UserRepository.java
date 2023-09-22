package com.iliastore.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iliastore.backend.pojo.User;



@Repository

public interface UserRepository extends JpaRepository<User ,Long> {
    Optional<User> findByEmailOrUsername(String email, String username); 
    Optional<User> findByEmail(String email);
}
