package com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ErrorInfoResponse {
    private HttpStatus status;
    private String message;
    private LocalDateTime date;
}
