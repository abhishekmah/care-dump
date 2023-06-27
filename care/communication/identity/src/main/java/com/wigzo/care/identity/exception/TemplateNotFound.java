package com.wigzo.care.identity.exception;

import org.springframework.http.HttpStatus;

public class TemplateNotFound extends CustomException {
    public TemplateNotFound() {
        super("Data not found!", HttpStatus.NOT_FOUND);
    }

    public TemplateNotFound(HttpStatus notFound, String message) {

    }
}
