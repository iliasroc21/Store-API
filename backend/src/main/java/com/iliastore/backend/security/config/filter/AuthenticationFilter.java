package com.iliastore.backend.security.config.filter;
import java.io.IOException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.iliastore.backend.CONSTANTS;
import com.iliastore.backend.pojo.AuthenticationResponse;
import com.iliastore.backend.pojo.Identifier;
import com.iliastore.backend.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
@AllArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    
    AuthenticationManager authenticationManager; 
    UserService userService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try{
            Identifier identifier = new ObjectMapper().readValue(request.getInputStream() , Identifier.class);
            Authentication authentication = new UsernamePasswordAuthenticationToken(identifier.getIdentifier(),identifier.getPassword());
            System.out.println(identifier.getIdentifier());
            System.out.println(identifier.getPassword());
            return authenticationManager.authenticate(authentication) ; 
             

        }
        catch(IOException ex){
            throw new RuntimeException();


        }
    
    }
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(failed.getMessage());
        response.getWriter().flush();
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String token = JWT.create().withSubject(authResult.getName())
        .sign(Algorithm.HMAC512(CONSTANTS.SECRECT_KEY));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        AuthenticationResponse authenticationResponse = new AuthenticationResponse(token , userService.getUser(authResult.getName()));
        String jsonResponse =objectMapper.writeValueAsString(authenticationResponse);
        response.setContentType("application/json");
        response.getWriter().write(jsonResponse);
       
        
        
    }


    
}
