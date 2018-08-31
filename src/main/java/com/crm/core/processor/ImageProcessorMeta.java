package com.crm.core.processor;

public class ImageProcessorMeta {
  private final String path;
  private final boolean isCrop;
  private final int maxWidth;
  private final int maxHeight;

  public ImageProcessorMeta(String path, boolean isCrop, int maxWidth, int maxHeight) {
    this.path = path;
    this.isCrop = isCrop;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
  }

  public String getPath() {
    return path;
  }

  public boolean isCrop() {
    return isCrop;
  }

  public int getMaxWidth() {
    return maxWidth;
  }

  public int getMaxHeight() {
    return maxHeight;
  }
}
