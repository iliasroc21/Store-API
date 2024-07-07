package com.iliastore.backend.security.config;
import com.iliastore.backend.CONSTANTS;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;


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
    @Bean
    public FilterRegistrationBean corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.setAllowedHeaders(Arrays.asList(
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.ACCEPT));
        configuration.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name(),
                HttpMethod.PATCH.name()));
        configuration.setMaxAge(CONSTANTS.MAX_AGE);
        source.registerCorsConfiguration("/**", configuration);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));

        bean.setOrder(CONSTANTS.CORS_FILTER_ORDER);
        return bean;


    }
}
