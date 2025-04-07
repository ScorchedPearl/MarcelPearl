package com.project.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ContestPerformanceResponse {
    private LocalDateTime date;
    private int rank;
}
