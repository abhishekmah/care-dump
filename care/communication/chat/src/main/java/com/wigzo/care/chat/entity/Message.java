package com.wigzo.care.chat.entity;


import lombok.Data;
import org.springframework.data.cassandra.core.cql.Ordering;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.Indexed;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Table("message")
//@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Message {
    @PrimaryKeyColumn(name = "key", type = PrimaryKeyType.PARTITIONED)
    private UUID key;
    @PrimaryKeyColumn(
            name = "time",
            ordinal = 6,
            type = PrimaryKeyType.CLUSTERED,
            ordering = Ordering.DESCENDING)
    private LocalDateTime time;
    @PrimaryKeyColumn(name = "userphone", ordinal = 1, type = PrimaryKeyType.PARTITIONED)
    private String userPhone;
    @Indexed
    private String messageId;
    @PrimaryKeyColumn(name = "platform", ordinal = 4, type = PrimaryKeyType.PARTITIONED)
    private String platform;
    private String direction;
    @PrimaryKeyColumn(name = "status", ordinal = 5, type = PrimaryKeyType.PARTITIONED)
    private String status;
    private LocalDateTime deliveryTime;
    // todo adding receiving time
    //private LocalDateTime receiveTime;
    private LocalDateTime sentTime;
    private LocalDateTime readTime;
    @PrimaryKeyColumn(name = "agentId", ordinal = 3, type = PrimaryKeyType.PARTITIONED)
    private Long agentId;
    private String note;
    private UUID replyTo;
    //    private List<UUID> mentions;
//    todo partition key
    @PrimaryKeyColumn(name = "orgToken", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    public String orgToken;
    public String messageType;
    public String label;
    public BigDecimal cost;
    public String sourceUuid;
    public String templateButtons;
    public String headers;
    public String message;
}
