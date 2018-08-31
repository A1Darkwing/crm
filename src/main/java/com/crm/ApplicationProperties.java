package com.crm;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@ConfigurationProperties("")
public class ApplicationProperties {

  private Map<String, String> app = new HashMap<String, String>();
  private Map<String, String> sec = new HashMap<String, String>();
  private Map<String, String> spring = new HashMap<String, String>();

  public Map<String, String> getApp() {
    return app;
  }

  public void setApp(Map<String, String> app) {
    this.app = app;
  }

  public Map<String, String> getSec() {
    return sec;
  }

  public void setSec(Map<String, String> sec) {
    this.sec = sec;
  }
  
  public Map<String, String> getSpring() {
    return spring;
  }

  public void setSpring(Map<String, String> spring) {
    this.spring = spring;
  }

  public String getAppPropertyValue(String key) {
    if (StringUtils.isBlank(key)) {
      return null;
    }
    return app.get(key);
  }

  public String getSecPropertyValue(String key) {
    if (StringUtils.isBlank(key)) {
      return null;
    }
    return sec.get(key);
  }

  
  public String getSpringPropertyValue(String key) {
    if (StringUtils.isBlank(key)) {
      return null;
    }
    return spring.get(key);
  }

  public Integer getAppPropertyIntValue(String key) {
    if (StringUtils.isBlank(key)) {
      return null;
    }

    try {
      return Integer.parseInt(app.get(key));
    } catch (Exception ex) {
      return null;
    }
  }

}
