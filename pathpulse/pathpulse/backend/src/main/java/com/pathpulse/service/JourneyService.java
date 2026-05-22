package com.pathpulse.service;

import com.pathpulse.dto.JourneyDto;
import com.pathpulse.dto.StartJourneyRequest;
import com.pathpulse.kafka.GpsEventProducer;
import com.pathpulse.model.Journey;
import com.pathpulse.model.User;
import com.pathpulse.repository.JourneyRepository;
import com.pathpulse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class JourneyService {

    private final JourneyRepository journeyRepository;
    private final UserRepository    userRepository;
    private final GpsEventProducer  gpsEventProducer;
    private final FuelEstimationService fuelEstimationService;

    public Page<JourneyDto> findByUser(UUID userId, Pageable pageable) {
        return journeyRepository.findByUserId(userId, pageable)
                .map(JourneyDto::from);
    }

    public JourneyDto findById(UUID journeyId) {
        Journey journey = journeyRepository.findById(journeyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Journey not found: " + journeyId));
        return JourneyDto.from(journey);
    }

    public JourneyDto startJourney(UUID userId, StartJourneyRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Journey journey = Journey.builder()
                .user(user)
                .title(request.getTitle())
                .transportMode(request.getTransportMode())
                .startLat(request.getStartLat())
                .startLng(request.getStartLng())
                .startAddress(request.getStartAddress())
                .startTime(Instant.now())
                .status(Journey.JourneyStatus.ACTIVE)
                .isPublic(request.getIsPublic())
                .build();

        journey = journeyRepository.save(journey);
        log.info("Journey started: {} for user: {}", journey.getId(), userId);

        gpsEventProducer.publishJourneyStarted(journey.getId(), userId);
        return JourneyDto.from(journey);
    }

    public JourneyDto endJourney(UUID userId, UUID journeyId) {
        Journey journey = getOwnedJourney(userId, journeyId);
        validateActiveJourney(journey);

        journey.setStatus(Journey.JourneyStatus.COMPLETED);
        journey.setEndTime(Instant.now());

        if (journey.getStartTime() != null) {
            journey.setTotalDuration(
                Instant.now().toEpochMilli() - journey.getStartTime().toEpochMilli()
            );
        }

        // Estimate fuel based on distance + transport mode
        double fuel = fuelEstimationService.estimate(
                journey.getTotalDistance(), journey.getTransportMode());
        journey.setFuelConsumed(fuel);
        journey.setCo2Emitted(fuelEstimationService.co2Kg(fuel, journey.getTransportMode()));

        journey = journeyRepository.save(journey);
        gpsEventProducer.publishJourneyEnded(journeyId, userId);

        log.info("Journey ended: {} | distance: {} km | duration: {} min",
                journeyId,
                String.format("%.1f", journey.getTotalDistance()),
                journey.getTotalDuration() / 60000);

        return JourneyDto.from(journey);
    }

    public JourneyDto pauseJourney(UUID userId, UUID journeyId) {
        Journey journey = getOwnedJourney(userId, journeyId);
        validateActiveJourney(journey);
        journey.setStatus(Journey.JourneyStatus.PAUSED);
        return JourneyDto.from(journeyRepository.save(journey));
    }

    public JourneyDto resumeJourney(UUID userId, UUID journeyId) {
        Journey journey = getOwnedJourney(userId, journeyId);
        if (journey.getStatus() != Journey.JourneyStatus.PAUSED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Journey is not paused");
        }
        journey.setStatus(Journey.JourneyStatus.ACTIVE);
        return JourneyDto.from(journeyRepository.save(journey));
    }

    public void deleteJourney(UUID userId, UUID journeyId) {
        Journey journey = getOwnedJourney(userId, journeyId);
        journeyRepository.delete(journey);
        log.info("Journey deleted: {} by user: {}", journeyId, userId);
    }

    public Page<JourneyDto> getFeed(UUID userId, Pageable pageable) {
        return journeyRepository.findPublicJourneysExcludingUser(userId, pageable)
                .map(JourneyDto::from);
    }

    // ── Helpers ────────────────────────────────────────────────────────

    private Journey getOwnedJourney(UUID userId, UUID journeyId) {
        return journeyRepository.findByIdAndUserId(journeyId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Journey not found or access denied"));
    }

    private void validateActiveJourney(Journey journey) {
        if (journey.getStatus() != Journey.JourneyStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Journey is not active. Current status: " + journey.getStatus());
        }
    }
}
