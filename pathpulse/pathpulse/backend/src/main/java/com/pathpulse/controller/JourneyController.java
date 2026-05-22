package com.pathpulse.controller;

import com.pathpulse.dto.JourneyDto;
import com.pathpulse.dto.StartJourneyRequest;
import com.pathpulse.security.UserPrincipal;
import com.pathpulse.service.JourneyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/journeys")
@RequiredArgsConstructor
public class JourneyController {

    private final JourneyService journeyService;

    /** List current user's journeys (paginated) */
    @GetMapping
    public ResponseEntity<Page<JourneyDto>> listJourneys(
            @AuthenticationPrincipal UserPrincipal principal,
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(journeyService.findByUser(principal.getId(), pageable));
    }

    /** Start a new journey */
    @PostMapping
    public ResponseEntity<JourneyDto> startJourney(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody StartJourneyRequest request) {
        JourneyDto journey = journeyService.startJourney(principal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(journey);
    }

    /** Get journey details */
    @GetMapping("/{id}")
    public ResponseEntity<JourneyDto> getJourney(@PathVariable UUID id) {
        return ResponseEntity.ok(journeyService.findById(id));
    }

    /** End an active journey */
    @PutMapping("/{id}/end")
    public ResponseEntity<JourneyDto> endJourney(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id) {
        return ResponseEntity.ok(journeyService.endJourney(principal.getId(), id));
    }

    /** Pause an active journey */
    @PutMapping("/{id}/pause")
    public ResponseEntity<JourneyDto> pauseJourney(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id) {
        return ResponseEntity.ok(journeyService.pauseJourney(principal.getId(), id));
    }

    /** Resume a paused journey */
    @PutMapping("/{id}/resume")
    public ResponseEntity<JourneyDto> resumeJourney(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id) {
        return ResponseEntity.ok(journeyService.resumeJourney(principal.getId(), id));
    }

    /** Delete a journey */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJourney(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id) {
        journeyService.deleteJourney(principal.getId(), id);
        return ResponseEntity.noContent().build();
    }

    /** Get public feed (other users' public journeys) */
    @GetMapping("/feed")
    public ResponseEntity<Page<JourneyDto>> getFeed(
            @AuthenticationPrincipal UserPrincipal principal,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(journeyService.getFeed(principal.getId(), pageable));
    }
}
