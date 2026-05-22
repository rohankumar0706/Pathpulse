package com.pathpulse.dto;

import com.pathpulse.model.Journey;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JourneyDto {
    private UUID   id;
    private UUID   userId;
    private String username;
    private String avatarUrl;
    private String title;
    private String description;
    private String transportMode;
    private String status;
    private Instant startTime;
    private Instant endTime;
    private Double  startLat;
    private Double  startLng;
    private Double  endLat;
    private Double  endLng;
    private String  startAddress;
    private String  endAddress;
    private Double  totalDistance;
    private Long    totalDuration;
    private Double  avgSpeed;
    private Double  maxSpeed;
    private Double  fuelConsumed;
    private Double  co2Emitted;
    private Boolean isPublic;
    private Instant createdAt;

    public static JourneyDto from(Journey j) {
        return JourneyDto.builder()
                .id(j.getId())
                .userId(j.getUser().getId())
                .username(j.getUser().getUsername())
                .avatarUrl(j.getUser().getAvatarUrl())
                .title(j.getTitle())
                .description(j.getDescription())
                .transportMode(j.getTransportMode().name())
                .status(j.getStatus().name())
                .startTime(j.getStartTime())
                .endTime(j.getEndTime())
                .startLat(j.getStartLat())
                .startLng(j.getStartLng())
                .endLat(j.getEndLat())
                .endLng(j.getEndLng())
                .startAddress(j.getStartAddress())
                .endAddress(j.getEndAddress())
                .totalDistance(j.getTotalDistance())
                .totalDuration(j.getTotalDuration())
                .avgSpeed(j.getAvgSpeed())
                .maxSpeed(j.getMaxSpeed())
                .fuelConsumed(j.getFuelConsumed())
                .co2Emitted(j.getCo2Emitted())
                .isPublic(j.getIsPublic())
                .createdAt(j.getCreatedAt())
                .build();
    }
}
