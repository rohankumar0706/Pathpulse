package com.pathpulse.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Component
@RequiredArgsConstructor
@Slf4j
public class GpsEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${pathpulse.kafka.topics.gps-updates}")
    private String gpsUpdatesTopic;

    @Value("${pathpulse.kafka.topics.journey-events}")
    private String journeyEventsTopic;

    /**
     * Publish a live GPS coordinate update.
     * Called at high frequency (every 1-5 seconds) during an active journey.
     */
    public void publishGpsUpdate(UUID journeyId, UUID userId,
                                  double lat, double lng,
                                  double speed, double heading, double altitude) {
        GpsUpdateEvent event = GpsUpdateEvent.builder()
                .journeyId(journeyId)
                .userId(userId)
                .lat(lat)
                .lng(lng)
                .speed(speed)
                .heading(heading)
                .altitude(altitude)
                .timestamp(Instant.now())
                .build();

        CompletableFuture<SendResult<String, Object>> future =
                kafkaTemplate.send(gpsUpdatesTopic, journeyId.toString(), event);

        future.whenComplete((result, ex) -> {
            if (ex != null) {
                log.error("Failed to publish GPS update for journey {}: {}", journeyId, ex.getMessage());
            }
        });
    }

    /** Publish journey lifecycle events (started, paused, ended) */
    public void publishJourneyStarted(UUID journeyId, UUID userId) {
        publishJourneyEvent("JOURNEY_STARTED", journeyId, userId);
    }

    public void publishJourneyEnded(UUID journeyId, UUID userId) {
        publishJourneyEvent("JOURNEY_ENDED", journeyId, userId);
    }

    public void publishJourneyPaused(UUID journeyId, UUID userId) {
        publishJourneyEvent("JOURNEY_PAUSED", journeyId, userId);
    }

    private void publishJourneyEvent(String eventType, UUID journeyId, UUID userId) {
        Map<String, Object> event = Map.of(
                "eventType",  eventType,
                "journeyId",  journeyId.toString(),
                "userId",     userId.toString(),
                "timestamp",  Instant.now().toString()
        );
        kafkaTemplate.send(journeyEventsTopic, journeyId.toString(), event)
                .whenComplete((result, ex) -> {
                    if (ex != null) {
                        log.error("Failed to publish {} for journey {}: {}", eventType, journeyId, ex.getMessage());
                    } else {
                        log.debug("Published {} for journey {}", eventType, journeyId);
                    }
                });
    }
}
