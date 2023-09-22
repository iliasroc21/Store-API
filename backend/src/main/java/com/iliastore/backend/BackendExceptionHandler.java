package com.iliastore.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.iliastore.backend.exception.ErrorResponse;
import com.iliastore.backend.exception.ProductNotFoundException;

@ControllerAdvice
public class BackendExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ProductNotFoundException.class)

    public ResponseEntity<ErrorResponse> handleProductNotFoundException(RuntimeException ex){
        System.out.println("ilias rouchdi");
        return new ResponseEntity<>(new ErrorResponse(ex.getMessage() , HttpStatus.NOT_FOUND) , HttpStatus.NOT_FOUND);
        
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex){
        return new ResponseEntity<>(new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST),HttpStatus.BAD_REQUEST);

    }
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalStateArgument(IllegalStateException ex){
        return new ResponseEntity<>( new ErrorResponse(ex.getMessage() , HttpStatus.CONFLICT),HttpStatus.CONFLICT);
    }
    
}
