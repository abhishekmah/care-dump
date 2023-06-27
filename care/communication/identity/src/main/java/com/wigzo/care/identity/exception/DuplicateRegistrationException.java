package com.wigzo.care.identity.exception;

import org.springframework.http.HttpStatus;

public class DuplicateRegistrationException extends CustomException {
    public DuplicateRegistrationException() {
        super("Duplicate registration  :: Please provide a email that is not registered yet!", HttpStatus.BAD_REQUEST);
    }
}
