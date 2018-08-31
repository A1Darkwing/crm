package com.crm.core.servlet;

import com.crm.core.common.PropertiesUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;

public abstract class BaseImageServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;
  private static final int DEFAULT_BUFFER_SIZE = 10240; // 10KB

  /**
   * @see HttpServlet#HttpServlet()
   */
  public BaseImageServlet() {
    super();
  }

  /**
   * @return The property key that configured with Image Path
   */
  public abstract String getImagePathProperty();

  /**
   * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
   */
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String requestedImage = request.getPathInfo();
    if (requestedImage == null) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404.
      return;
    }
    requestedImage = URLDecoder.decode(requestedImage, "UTF-8") + ".jpg";
    File image = new File(PropertiesUtils.getInstance().getValue(getImagePathProperty()), requestedImage);
    if (!image.exists()) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404.
      return;
    }
    String contentType = getServletContext().getMimeType(image.getName());
    if (contentType == null || !contentType.startsWith("image")) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND); // 404.
      return;
    }

    // Init servlet response.
    response.reset();
    response.setBufferSize(DEFAULT_BUFFER_SIZE);
    response.setContentType(contentType);
    response.setHeader("Content-Length", String.valueOf(image.length()));
    response.setHeader("Content-Disposition", "inline; filename=\"" + image.getName() + "\"");

    // Prepare streams.
    BufferedInputStream input = null;
    BufferedOutputStream output = null;

    try {
      // Open streams.
      input = new BufferedInputStream(new FileInputStream(image), DEFAULT_BUFFER_SIZE);
      output = new BufferedOutputStream(response.getOutputStream(), DEFAULT_BUFFER_SIZE);

      // Write file contents to response.
      byte[] buffer = new byte[DEFAULT_BUFFER_SIZE];
      int length;
      while ((length = input.read(buffer)) > 0) {
        output.write(buffer, 0, length);
      }
    } finally {
      close(output);
      close(input);
    }
  }

  /**
   * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
   */
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  }

  private static void close(Closeable resource) {
    if (resource != null) {
      try {
        resource.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}
