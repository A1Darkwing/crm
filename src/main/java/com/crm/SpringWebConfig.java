package com.crm;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration

public class SpringWebConfig extends WebMvcConfigurerAdapter {
	
	  @Override
    public void configurePathMatch(PathMatchConfigurer matcher) {
        matcher.setUseRegisteredSuffixPatternMatch(true);
    }

    
    @Override
    public void configureMessageConverters(
      List<HttpMessageConverter<?>> converters) {
     
      converters.add(createJsonMultiPartHttpMessageConverter());
 
        super.configureMessageConverters(converters);
    }
    
    private HttpMessageConverter<Object> createJsonMultiPartHttpMessageConverter() {
 
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        List<MediaType> m = new ArrayList<>();
        m.add(MediaType.APPLICATION_OCTET_STREAM);
        converter.setSupportedMediaTypes(m);
 
        return converter;
    }
}
