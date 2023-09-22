package com.iliastore.backend.pojo;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id ; 
    @NotBlank(message =  "username cannot be blank")
	
    @Column(nullable=true, unique = true, length = 45)
    private String username ; 
    @Email(message="Please Provide a correct email")
    @NonNull
    @Column(nullable = false, unique = true, length = 45)
    private String email ; 
    @NotBlank(message =  "password cannot be blank")
    @NonNull
    
    private String password ; 
    private String provider = "local";
    private boolean confirmed = true ;
    private boolean blocked = false;
    private String createdAt =LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME); ; 
    private LocalDateTime updatedAt =null ;
    
    
   
    
}
