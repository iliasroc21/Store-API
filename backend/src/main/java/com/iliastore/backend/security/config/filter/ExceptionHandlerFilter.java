package com.iliastore.backend.security.config.filter;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import com.iliastore.backend.exception.UserNotFoundException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                try{
                    filterChain.doFilter(request, response);

                }
                catch(UserNotFoundException ex){
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    response.getWriter().write("the email you provided does not exists !!!!" );
                    response.getWriter().flush();

                }
                catch(RuntimeException ex){
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("BAD REQUEST" );
                    response.getWriter().flush();

                }
    }
    
}
