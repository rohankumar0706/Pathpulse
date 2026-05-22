package com.pathpulse.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "journeys", indexes = {
    @Index(name = "idx_journeys_user_id", columnList = "user_id"),
    @Index(name = "idx_journeys_status",  columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Journey {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "transport_mode", length = 30, nullable = false)
    @Builder.Default
    private TransportMode transportMode = TransportMode.CAR;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    @Builder.Default
    private JourneyStatus status = JourneyStatus.ACTIVE;

    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "start_lat")
    private Double startLat;

    @Column(name = "start_lng")
    private Double startLng;

    @Column(name = "end_lat")
    private Double endLat;

    @Column(name = "end_lng")
    private Double endLng;

    @Column(name = "start_address", columnDefinition = "TEXT")
    private String startAddress;

    @Column(name = "end_address", columnDefinition = "TEXT")
    private String endAddress;

    @Column(name = "total_distance")
    @Builder.Default
    private Double totalDistance = 0.0;

    @Column(name = "total_duration")
    @Builder.Default
    private Long totalDuration = 0L;

    @Column(name = "avg_speed")
    @Builder.Default
    private Double avgSpeed = 0.0;

    @Column(name = "max_speed")
    @Builder.Default
    private Double maxSpeed = 0.0;

    @Column(name = "fuel_consumed")
    @Builder.Default
    private Double fuelConsumed = 0.0;

    @Column(name = "co2_emitted")
    @Builder.Default
    private Double co2Emitted = 0.0;

    @Column(name = "is_public")
    @Builder.Default
    private Boolean isPublic = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    public enum TransportMode {
        CAR, MOTORCYCLE, BICYCLE, FOOT, TRANSIT, ELECTRIC_CAR
    }

    public enum JourneyStatus {
        ACTIVE, PAUSED, COMPLETED, CANCELLED
    }
}
