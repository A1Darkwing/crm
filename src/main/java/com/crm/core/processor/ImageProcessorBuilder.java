package com.crm.core.processor;

import java.util.ArrayList;
import java.util.List;

public class ImageProcessorBuilder {
  private int fileSizeLimit;
  private String fileTypeAllow;
  private String[] mimeTypeAllow;
  private List<ImageProcessorMeta> imageMetaList;

  public ImageProcessorBuilder(int fileSizeLimit, String fileTypeAllow, String[] mimeTypeAllow) {
    this.fileSizeLimit = fileSizeLimit;
    this.fileTypeAllow = fileTypeAllow;
    this.mimeTypeAllow = mimeTypeAllow;
    this.imageMetaList = new ArrayList<ImageProcessorMeta>();
  }

  public ImageProcessorBuilder addImageMeta(String path, boolean isCrop, int maxWidth, int maxHeight) {
    this.imageMetaList.add(new ImageProcessorMeta(path, isCrop, maxWidth, maxHeight));
    return this;
  }

  public ImageProcessor build() {
    return new ImageProcessor(fileSizeLimit, fileTypeAllow, mimeTypeAllow, imageMetaList);
  }
}
