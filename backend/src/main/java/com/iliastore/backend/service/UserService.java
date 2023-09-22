package com.iliastore.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.iliastore.backend.exception.UserNotFoundException;
import com.iliastore.backend.pojo.User;
import com.iliastore.backend.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository ;
    private  BCryptPasswordEncoder bCryptPasswordEncoder ; 
    

    public void  registerUser(User user){
        boolean userExists = userRepository.findByEmailOrUsername(user.getEmail() , user.getUsername()).isPresent();
        if(userExists){
            throw new IllegalStateException("the Email" + user.getEmail() +" or Username "+user.getUsername()+" Already Exists"); 
        } 
        
        String encodedPassword =bCryptPasswordEncoder.encode(user.getPassword()) ;
        user.setPassword(encodedPassword); 
        userRepository.save(user);
         
    }
    public User getUser(String email ){
        return unwrappedUser(userRepository.findByEmail(email) ,email);

    }

    public static User unwrappedUser(Optional<User> entity , String email){
        if(entity.isPresent())return entity.get();
        else throw new UserNotFoundException(email);

    }
    
}
