package com.wigzo.care.identity.exception;


import com.wigzo.care.identity.constants.ErrorConstants;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;


@Data
@EqualsAndHashCode(callSuper = true)
public class CustomException extends Exception {
    private String message;
    private HttpStatus code;

    public CustomException() {
        this.message = ErrorConstants.DEFAULT_MESSAGE;
        this.code = ErrorConstants.DEFAULT_CODE;
    }

    public CustomException(String message) {
        super(message);
        this.message = message;
        this.code = ErrorConstants.DEFAULT_CODE;
    }

    public CustomException(String message, HttpStatus code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
