package com.crm.core.common;

import java.util.UUID;
import org.bson.types.ObjectId;

public final class ApplicationUtils {

	private ApplicationUtils() {
	}

	public static String generateLongId() {
		return UUID.randomUUID().toString();
	}

	public static String generateImageName() {
		return (new ObjectId()).toString();
	}


}
