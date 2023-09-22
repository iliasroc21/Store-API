package com.iliastore.backend.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String email){
        super("User with Email  "+email+" Is Not Found !!!");

    }
}
