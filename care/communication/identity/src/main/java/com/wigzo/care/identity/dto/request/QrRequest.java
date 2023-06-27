package com.wigzo.care.identity.dto.request;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QrRequest extends BaseDto {

    @NotBlank
    @NotNull(message = "title should not be null")
    private String title;

    private String subTitle;

    private String text;

    @NotNull(message = "type should not be null")
    private String type;

    @NotNull(message = "Media Id should not be null")
    private Long mediaId;

    @NotBlank
    @NotNull(message = "template should not be null")
    private String template;

    private Boolean isActive;

}
