package com.wigzo.care.identity.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Campaign {
    private Integer organization;
    private String type;
    private String campaignId;
}
