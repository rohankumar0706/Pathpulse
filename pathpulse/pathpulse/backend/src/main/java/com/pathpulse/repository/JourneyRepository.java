package com.pathpulse.repository;

import com.pathpulse.model.Journey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, UUID> {

    Page<Journey> findByUserId(UUID userId, Pageable pageable);

    Optional<Journey> findByIdAndUserId(UUID id, UUID userId);

    @Query("SELECT j FROM Journey j WHERE j.isPublic = true AND j.user.id <> :userId ORDER BY j.createdAt DESC")
    Page<Journey> findPublicJourneysExcludingUser(@Param("userId") UUID userId, Pageable pageable);

    @Query("SELECT COUNT(j) FROM Journey j WHERE j.user.id = :userId AND j.status = 'ACTIVE'")
    long countActiveJourneys(@Param("userId") UUID userId);

    @Query("SELECT SUM(j.totalDistance) FROM Journey j WHERE j.user.id = :userId AND j.status = 'COMPLETED'")
    Double sumDistanceByUserId(@Param("userId") UUID userId);
}
