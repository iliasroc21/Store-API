package com.iliastore.backend.exception;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(Long productId){
        super("The product with id of "+productId +" does not exists !!!!");
        

    }
    
}
