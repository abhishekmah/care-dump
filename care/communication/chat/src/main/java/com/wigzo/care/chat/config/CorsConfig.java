package com.wigzo.care.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
//@PropertySource("classpath:communication/xmpp/src/main/java/com/wigzo/care/xmpp/config/XmppConfig.java")
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // String[] allowedCorsOrigins = appProperties.getAllowedCorsOrigins();
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("POST", "GET", "PATCH", "PUT", "OPTIONS");
        WebMvcConfigurer.super.addCorsMappings(registry);
    }
}