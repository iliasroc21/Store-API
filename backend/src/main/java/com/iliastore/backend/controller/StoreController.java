package com.iliastore.backend.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iliastore.backend.pojo.Order;
import com.iliastore.backend.pojo.OrderResponse;
import com.iliastore.backend.pojo.Product;
import com.iliastore.backend.pojo.ProductResponse;
import com.iliastore.backend.pojo.User;
import com.iliastore.backend.service.OrderService;
import com.iliastore.backend.service.ProductService;
import com.iliastore.backend.service.UserService;


import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class StoreController {
    ProductService productService;
    UserService userService; 
    OrderService orderService;

    @PostMapping("/products")
    public ResponseEntity<HttpStatus> saveAllProducts(@RequestBody List<Product> products){
        productService.saveAllProducts(products); 
        return new ResponseEntity<>(HttpStatus.CREATED);

    }
    @GetMapping("/products")
    public ResponseEntity<ProductResponse> getProducts(@RequestParam(required=false , name="featured") Boolean featured , 
    @RequestParam(required=false ,name="page" , defaultValue="1") int page,
    @RequestParam(required=false , name="search" ) String search , 
    @RequestParam(required=false , name="category" , defaultValue = "all") String category , 
    @RequestParam(required =false, name="company" ,  defaultValue="all") String company ,
    @RequestParam(required=false ,name="order" ,defaultValue="a-z"  ) String order ,
    @RequestParam(required = false , name ="shipping") boolean shipping ,  
    @RequestParam(required=false , name="price", defaultValue="100000") double price){
        if(featured!=null){
            return new ResponseEntity<>(productService.getProductsByFeatured(featured , page),HttpStatus.OK);
        }
        if(search!=null){
            return new ResponseEntity<ProductResponse>(productService.getFilteredProducts(search, company, category, order, price,shipping , page),HttpStatus.OK);

        }
        
        
        
        
        return new ResponseEntity<>(productService.getAllProducts(page ) , HttpStatus.OK);

        

        
        

    }
    @GetMapping("/products/{productId}")
    public ResponseEntity<Product> getSingleProduct(@PathVariable Long productId){
        return new ResponseEntity<>(productService.getSingleProduct(productId),HttpStatus.OK);


    }
    @PostMapping("/local/auth/register")
    public ResponseEntity<HttpStatus> registerUser(@RequestBody User user){
        userService.registerUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order){
        String email =SecurityContextHolder.getContext().getAuthentication().getName();
        order.setEmail(email);
        orderService.createOrder(order);
        return new ResponseEntity<>( order, HttpStatus.CREATED);

    }
    @GetMapping("/orders")
    public ResponseEntity<OrderResponse> getAllOrders(@RequestParam(required=false ,name="page" ,defaultValue="1") int page){
        String email=SecurityContextHolder.getContext().getAuthentication().getName();
        
        return new ResponseEntity<>( orderService.getAllOrders( email,  page ), HttpStatus.CREATED);

    }
}
