package com.crm.core.servlet;

public class ClientImageServlet extends BaseImageServlet {

	private static final long serialVersionUID = 1L;

  @Override
  public String getImagePathProperty() {
    return "image.client.path";
  }
}
