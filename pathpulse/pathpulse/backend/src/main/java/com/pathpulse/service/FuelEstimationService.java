package com.pathpulse.service;

import com.pathpulse.model.Journey.TransportMode;
import org.springframework.stereotype.Service;

/**
 * Estimates fuel consumption and CO₂ emissions based on
 * distance traveled and transport mode.
 *
 * Emission factors sourced from:
 * - UK Government GHG Conversion Factors 2023
 * - ICCT Real-World Fuel Consumption database
 */
@Service
public class FuelEstimationService {

    /**
     * Fuel efficiency in km/L for each transport mode.
     * Returns litres consumed for a given distance.
     */
    public double estimate(double distanceKm, TransportMode mode) {
        double kmPerLitre = switch (mode) {
            case CAR          -> 12.5;  // Average petrol car
            case ELECTRIC_CAR -> 0.0;   // kWh tracked separately
            case MOTORCYCLE   -> 18.0;
            case BICYCLE      -> 0.0;
            case FOOT         -> 0.0;
            case TRANSIT      -> 40.0;  // Per passenger km equivalent
        };
        if (kmPerLitre == 0) return 0.0;
        return distanceKm / kmPerLitre;
    }

    /**
     * CO₂ emissions in kilograms for a given fuel consumption.
     * Petrol: ~2.31 kg CO₂/litre
     * Diesel: ~2.68 kg CO₂/litre
     */
    public double co2Kg(double litres, TransportMode mode) {
        double kgPerLitre = switch (mode) {
            case CAR          -> 2.31;
            case MOTORCYCLE   -> 2.31;
            case TRANSIT      -> 2.68;
            default           -> 0.0;
        };
        return litres * kgPerLitre;
    }

    /** Equivalent trees needed to offset the CO₂ of one journey */
    public int treesEquivalent(double co2Kg) {
        // Average tree absorbs ~21 kg CO₂/year → per-journey fraction
        return (int) Math.ceil(co2Kg / 21.0);
    }
}
