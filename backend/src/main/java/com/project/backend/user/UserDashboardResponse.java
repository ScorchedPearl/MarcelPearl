package com.project.backend.user;

import com.project.backend.components.Forums;
import com.project.backend.components.Submissions;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class UserDashboardResponse {
    private String username;
    private String MarcelPearlId;
    private String bio;
    private List<String> badges;
    private String profilePhoto;
    private int streak;
    private Map<String, Long> pieChartData;
    private long totalSolved;
    private List<Submissions> latestSubmissions;
    private List<ContestPerformanceResponse> contestData;
    private List<Forums> forums;
    private List<String> languages;
}
