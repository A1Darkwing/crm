package com.crm.core.processor;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

public class ImageProcessor {

  public static final String ERROR_FILE_SIZE_LIMIT = "FILE_SIZE_LIMIT";
  public static final String ERROR_FILE_TYPE_NOT_ALLOWED = "FILE_TYPE_NOT_ALLOWED";
  public static final String ERROR_MISSING_META = "MISSING_META";

  private int fileSizeLimit;
  private String fileTypeAllow;
  private String[] mimeTypeAllow;
  private List<ImageProcessorMeta> imageMetaList;

  public ImageProcessor(int fileSizeLimit, String fileTypeAllow, String[] mimeTypeAllow, List<ImageProcessorMeta> imageMetaList) {
    this.fileSizeLimit = fileSizeLimit;
    this.fileTypeAllow = fileTypeAllow;
    this.mimeTypeAllow = mimeTypeAllow;
    this.imageMetaList = imageMetaList;
  }

  private void validate(MultipartFile multipartFile) throws ImageProcessorException {
    List<String> errors = new ArrayList<String>();
    boolean f = false;
    for (String mime : mimeTypeAllow) {
      if (mime.equalsIgnoreCase(multipartFile.getContentType())) {
        f = true;
        break;
      }
    }
    if (!f) {
      errors.add(ERROR_FILE_TYPE_NOT_ALLOWED);
    }
    String fileNameTemp = "", fileExt = "";
    fileNameTemp = multipartFile.getOriginalFilename();
    if (fileNameTemp.indexOf(".") > -1) {
      fileExt = fileNameTemp.substring(fileNameTemp.lastIndexOf("."), fileNameTemp.length());
    }
    fileExt = fileExt.toLowerCase();

    // Check for valid file type uploadOld file
    if (fileTypeAllow.indexOf(fileExt) == -1) {
      errors.add(ERROR_FILE_TYPE_NOT_ALLOWED);
    }

    // Check for limit uploadOld file
    if (multipartFile.getSize() <= 0 || multipartFile.getSize() > fileSizeLimit) {
      errors.add(ERROR_FILE_SIZE_LIMIT);
    }

    if (!errors.isEmpty()) {
      throw new ImageProcessorException(errors);
    }
  }

  public void upload(MultipartFile multipartFile, String fileName) throws IOException, ImageProcessorException {
    if (CollectionUtils.isEmpty(imageMetaList)) {
      throw new ImageProcessorException(ERROR_MISSING_META);
    }

    validate(multipartFile);
    String fileNameTemp = "", fileExt = "";
    fileNameTemp = multipartFile.getOriginalFilename();
    if (fileNameTemp.indexOf(".") > -1) {
      fileExt = fileNameTemp.substring(fileNameTemp.lastIndexOf("."), fileNameTemp.length());
    }
    fileExt = fileExt.toLowerCase();
    BufferedImage origin = ImageIO.read(multipartFile.getInputStream());
    BufferedImage img = null;
    if (origin == null) return;
    if( origin.getColorModel().getTransparency() != Transparency.OPAQUE) {
      int w = origin.getWidth();
      int h = origin.getHeight();
      img = new BufferedImage(w,h,BufferedImage.TYPE_INT_RGB);
      Graphics2D g = img.createGraphics();
      g.setColor(Color.WHITE);
      g.fillRect(0,0,w,h);
      g.drawRenderedImage(origin, null);
      g.dispose();
    } else {
      img = origin;
    }
    for (ImageProcessorMeta meta : imageMetaList) {
      if (img.getWidth() > meta.getMaxWidth() || img.getHeight() > meta.getMaxHeight()) {
        Thumbnails.Builder<BufferedImage> imgBuidler = Thumbnails.of(img);
        if (meta.isCrop()) {
          imgBuidler = imgBuidler.crop(Positions.CENTER);
        }
        img = imgBuidler.size(meta.getMaxWidth(), meta.getMaxHeight()).asBufferedImage();
      } else {
        if (meta.isCrop()) {
          Thumbnails.Builder<BufferedImage> imgBuidler = Thumbnails.of(img);
          imgBuidler = imgBuidler.crop(Positions.CENTER);
          int idealSize = img.getWidth() > img.getHeight() ? img.getHeight() : img.getWidth();
          img = imgBuidler.size(idealSize, idealSize).asBufferedImage();
        }
      }
      File newFile = new File(meta.getPath() + fileName + ".jpg");
      newFile.getParentFile().mkdirs();
      String fileExtTemp = "jpg";
      if (fileExt.length() > 1) {
        fileExtTemp = fileExt.substring(1);
      }
      ImageIO.write(img, fileExtTemp, newFile);
    }
  }
  
  public void deleteImg(String fileName) {
    for (ImageProcessorMeta meta : imageMetaList) {
      if (!FileUtils.deleteQuietly(new File(meta.getPath() + fileName + ".jpg"))) {
      }
    }
  }

public class ImageProcessorException extends Exception {
    private static final long serialVersionUID = -7119154217309977823L;

    private List<String> errorCodes;

    public ImageProcessorException(List<String> errorCodes) {
      this.errorCodes = errorCodes;
    }

    public ImageProcessorException(String error) {
      errorCodes = new ArrayList<String>();
      errorCodes.add(error);
    }

    public List<String> getErrorCodes() {
      return errorCodes;
    }

    public void setErrorCodes(List<String> errorCodes) {
      this.errorCodes = errorCodes;
    }

  }

}
