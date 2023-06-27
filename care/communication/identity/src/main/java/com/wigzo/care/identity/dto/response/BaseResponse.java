package com.wigzo.care.identity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponse implements Serializable {
    private Integer status;
    private Boolean success;
    private Object data;
    private String message;
}


