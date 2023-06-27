package com.wigzo.care.chat.utils;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

@Component
public class CommonUtils {

    public LocalDateTime convertDateToString(String time) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
        LocalDateTime convertTime = LocalDateTime.parse(time, formatter);
        return convertTime;
    }

    public LocalDateTime convertDate(String createdDateTime) {


        DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM-dd HH:mm:ss")
                .appendOffset("+HH:mm", "+00:00")
                .toFormatter();

        // Parse the string to OffsetDateTime
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(createdDateTime, formatter);
        // Convert OffsetDateTime to LocalDateTime
        LocalDateTime localDateTime = offsetDateTime.toLocalDateTime();

        return localDateTime;

    }

}
