package com.iliastore.backend.security.config.filter;

import java.io.IOException;
import java.util.Arrays;
import org.springframework.security.core.Authentication;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.iliastore.backend.CONSTANTS;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthorizationFilter extends OncePerRequestFilter  {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                String header = request.getHeader("Authorization")  ;
                if(header== null || !header.startsWith("Bearer")){
                    filterChain.doFilter(request, response);
                    return ; 

                }
                String token = header.replace("Bearer ","");
                String user = JWT.require(Algorithm.HMAC512(CONSTANTS.SECRECT_KEY)).build().verify(token).getSubject();
                System.out.println(user);
                Authentication authentication =new UsernamePasswordAuthenticationToken(user, null, Arrays.asList());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(request, response);
    }
    
}
