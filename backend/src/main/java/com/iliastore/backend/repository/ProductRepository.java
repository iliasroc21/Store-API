package com.iliastore.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iliastore.backend.pojo.Product;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFeatured(boolean featured);
    Page<Product> findByFeatured(boolean featured , Pageable page);
    Page<Product> findAllByPriceLessThanAndTitleContaining(double price ,String title ,  Pageable page);
    Page<Product> findAllByPriceLessThanAndTitleContainingAndShipping(double price ,String title , boolean shipping ,  Pageable page);
    Page<Product> findByCategoryAndPriceLessThanAndTitleContaining(String category ,double price , String title ,   Pageable page);
    Page<Product> findByCategoryAndPriceLessThanAndTitleContainingAndShipping(String category ,double price , String title ,boolean shipping  , Pageable page);
    Page<Product> findByCompanyAndPriceLessThanAndTitleContaining(String company ,double price , String title , Pageable page);
    Page<Product> findByCompanyAndPriceLessThanAndTitleContainingAndShipping(String company ,double price , String title ,boolean shipping ,  Pageable page);
    Page<Product> findByCompanyAndCategoryAndPriceLessThanAndTitleContaining(String company , String category , double price ,String title ,  Pageable page);
    Page<Product> findByCompanyAndCategoryAndPriceLessThanAndTitleContainingAndShipping(String company , String category , double price ,String title ,boolean shipping,   Pageable page);
   /*  Page<Product> findByCategoryIgnoreCaseAndShipping(String category ,boolean shipping ,  Pageable page);
    Page<Product> findByCompanyAndShipping(String company ,boolean shipping,  Pageable page);
    Page<Product> findByCompanyAndCategoryAndShipping(String company , String category , boolean shipping , Pageable page);
    Page<Product> findByPriceLessThan(double price , Pageable page); 
    Page<Product> findByCompanyAndCategoryAndShippingAndPriceLessThanAndTitleContaining(String company , String category , boolean shipping ,double minPrice, String search ,  Pageable page); */
    
    
}
