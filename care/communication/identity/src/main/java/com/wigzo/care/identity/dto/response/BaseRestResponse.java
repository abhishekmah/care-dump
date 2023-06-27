package com.wigzo.care.identity.dto.response;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class BaseRestResponse<T> {
    private int status;
    private boolean success;
    private String message;
    private String error;
    private T data;

    public BaseRestResponse(int status, boolean success, String message, String error, T data) {
        this.status = status;
        this.success = success;
        this.message = message;
        this.error = error;
        this.data = data;
    }

}

