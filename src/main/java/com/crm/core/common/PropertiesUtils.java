package com.crm.core.common;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.util.Properties;

public class PropertiesUtils {

  private static final String PROP_FILE_NAME = "system.properties";
  private static PropertiesUtils instance;
  private static String env;
  private Properties properties;

  private PropertiesUtils() {
    env = System.getProperty("spring.profiles.active");
    try {
      Resource resource = new ClassPathResource(PROP_FILE_NAME);
      properties = PropertiesLoaderUtils.loadProperties(resource);
    } catch (IOException ioe) {
      throw new RuntimeException(ioe);
    }
  }

  public static PropertiesUtils getInstance() {
    if (instance == null)
      instance = new PropertiesUtils();
    return instance;
  }

  public String getValue(String key) {
    String value = null;
    // Try to get property by environment.
    if (env != null) {
      String propKey = env + "." + key;
      value = properties.getProperty(propKey);
    }
    // If cannot find it, find the default property
    if (StringUtils.isBlank(value)) {
      value = properties.getProperty(key);
    }
    return value;
  }
}
