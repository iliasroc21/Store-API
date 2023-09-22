package com.iliastore.backend.service;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.iliastore.backend.CONSTANTS;
import com.iliastore.backend.exception.ProductNotFoundException;
import com.iliastore.backend.pojo.Meta;
import com.iliastore.backend.pojo.Pagination;
import com.iliastore.backend.pojo.Product;
import com.iliastore.backend.pojo.ProductResponse;
import com.iliastore.backend.repository.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {
    ProductRepository productRepository; 
    public void saveProduct(Product product){
        productRepository.save(product);

    }
    public void saveAllProducts(List<Product> products){
        
        for(int i = 0 ; i < products.size(); i++){
            saveProduct(products.get(i));
        }

    }
    public ProductResponse getAllProducts(int page){
        Pageable paging  = PageRequest.of(page -1 , CONSTANTS.pageSize , Sort.by(Sort.Direction.ASC , "title"));
        Page<Product> products = productRepository.findAll(paging);
        return unwraProductResponse(products, page);


    }
   
    public ProductResponse getProductsByFeatured(boolean featured ,int page){
        Pageable paging = PageRequest.of(page-1 , CONSTANTS.pageSize);
        Page<Product> products = productRepository.findByFeatured(featured , paging);
        return unwraProductResponse(products, page);

    }
    public Product getSingleProduct(Long productId){
        return unwrappeProduct(productRepository.findById(productId), productId);

    }
    public ProductResponse getFilteredProducts(String search , String company , String category , String order , double price ,boolean shipping , int page){
    
        String fieldName= order.equalsIgnoreCase("a-z") || order.equalsIgnoreCase("z-a") ? "title" : "price";
        Direction direction = order.equalsIgnoreCase("a-z") || order.equalsIgnoreCase("low") ?  Sort.Direction.ASC : Sort.Direction.DESC ; 
        Sort sort  = Sort.by(direction , fieldName);
    
        Pageable paging = PageRequest.of(page-1, CONSTANTS.pageSize , sort );
        Page<Product> products = null ; 
        if(company.equalsIgnoreCase("all") && category.equalsIgnoreCase("all")){
             
            products = shipping ? productRepository.findAllByPriceLessThanAndTitleContainingAndShipping(price , search, shipping ,  paging) : productRepository.findAllByPriceLessThanAndTitleContaining(price , search,  paging);

        }
        else if(company.equalsIgnoreCase("all") && !category.equalsIgnoreCase("all")){
            products =shipping ? productRepository.findByCategoryAndPriceLessThanAndTitleContainingAndShipping(category, price , search , shipping ,   paging) : productRepository.findByCategoryAndPriceLessThanAndTitleContaining(category, price , search ,  paging)  ; 

        }
        else if(!company.equalsIgnoreCase("all") && category.equalsIgnoreCase("all")){
            products = shipping ?  productRepository.findByCompanyAndPriceLessThanAndTitleContainingAndShipping(company ,price ,search , shipping ,  paging) : productRepository.findByCompanyAndPriceLessThanAndTitleContaining(company ,price ,search ,  paging)   ;

        }
        else{
             products = shipping ?  productRepository.findByCompanyAndCategoryAndPriceLessThanAndTitleContainingAndShipping(company , category , price , search , shipping ,   paging) : productRepository.findByCompanyAndCategoryAndPriceLessThanAndTitleContaining(company , category , price , search ,   paging);
        }


        return unwraProductResponse(products, page);

    }
    
    public static Product unwrappeProduct(Optional<Product> entity , Long productId){
        if(entity.isPresent())return entity.get();
        else throw new ProductNotFoundException(productId);

    }
    public  ProductResponse unwraProductResponse(Page<Product> products , int page){
        return ProductResponse.builder().data(products.getContent()).
           meta(
            new Meta(new Pagination(
                page , CONSTANTS.pageSize , products.getTotalPages() , 
                products.getTotalElements()
                ), 
            CONSTANTS.companies , CONSTANTS.categories)).build();

    }

     
}
