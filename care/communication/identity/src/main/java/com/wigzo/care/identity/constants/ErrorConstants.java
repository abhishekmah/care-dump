package com.wigzo.care.identity.constants;

import org.springframework.http.HttpStatus;


public final class ErrorConstants {
    public static final HttpStatus DEFAULT_CODE = HttpStatus.INTERNAL_SERVER_ERROR;
    public static final String DEFAULT_MESSAGE = "Something went wrong! Please try again later.";

    private ErrorConstants() {

    }
}
