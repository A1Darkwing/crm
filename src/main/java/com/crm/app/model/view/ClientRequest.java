package com.crm.app.model.view;

import org.hibernate.validator.constraints.NotBlank;

public class ClientRequest {

	private String id;
	@NotBlank(message = "validation.charityField.fieldName.required")
	private String fieldName;

	public ClientRequest() {
	}

	public ClientRequest(String id, String fieldName) {
		this.id = id;
		this.fieldName = fieldName;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
