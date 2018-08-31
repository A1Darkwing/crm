package com.crm.core.common;

import org.springframework.util.StringUtils;

public class ImageUtils {
  
  /**
   * Get Image Url
   * @param path
   * @param imageName
   * @return url
   */
  public static String getImageUrl(String path, String imageName) {
    if (StringUtils.isEmpty(path) || StringUtils.isEmpty(imageName)) {
      return null;
    }
    return path + imageName;
  }
  
  /**
   * Get Image Url Thumb
   * @param pathThumb
   * @param imageName
   * @return urlThumb
   */
  public static String getImageUrlThumb(String pathThumb, String imageName) {
    if (StringUtils.isEmpty(pathThumb) || StringUtils.isEmpty(imageName)) {
      return null;
    }
    return pathThumb + imageName;
  }
}
