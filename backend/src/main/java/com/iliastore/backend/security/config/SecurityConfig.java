package com.iliastore.backend.security.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.iliastore.backend.security.config.filter.AuthenticationFilter;
import com.iliastore.backend.security.config.filter.ExceptionHandlerFilter;
import com.iliastore.backend.security.config.filter.JwtAuthorizationFilter;
import com.iliastore.backend.security.config.manager.CustomAuthenticationManager;
import com.iliastore.backend.service.UserService;


@Configuration
public class SecurityConfig {
      /* authorize.
               requestMatchers(HttpMethod.POST ,CONSTANTS.REGISTER_PATH).authenticated()
               .anyRequest().permitAll() */

    private final CustomAuthenticationManager authenticationManager;
    UserService userService;
    
    public SecurityConfig(@Lazy CustomAuthenticationManager authenticationManager , @Lazy UserService userService) {
        this.authenticationManager=authenticationManager;
        this.userService = userService ; 
    } 

    



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager ,userService);
        authenticationFilter.setFilterProcessesUrl("/local/auth/login");
        http.csrf((csrf)->csrf.disable()).
        authorizeHttpRequests((authorize) ->
               authorize.
               requestMatchers(HttpMethod.POST, "/orders").authenticated()
               .requestMatchers(HttpMethod.GET , "/orders").authenticated().
               anyRequest().permitAll() 

        ).addFilterBefore( new ExceptionHandlerFilter(),AuthenticationFilter.class )
        .addFilter(authenticationFilter)
        .addFilterAfter(new JwtAuthorizationFilter(), AuthenticationFilter.class)
        .sessionManagement((session)->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();

    }
    
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}
