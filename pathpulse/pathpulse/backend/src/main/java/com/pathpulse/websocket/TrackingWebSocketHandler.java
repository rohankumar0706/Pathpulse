package com.pathpulse.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathpulse.kafka.GpsEventProducer;
import com.pathpulse.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * WebSocket handler for real-time GPS tracking.
 *
 * Message format (client → server):
 * {
 *   "type": "GPS_UPDATE",
 *   "lat": 51.5074,
 *   "lng": -0.1278,
 *   "speed": 45.2,
 *   "heading": 180.0,
 *   "altitude": 12.0
 * }
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class TrackingWebSocketHandler extends TextWebSocketHandler {

    private final GpsEventProducer  gpsEventProducer;
    private final JwtTokenProvider  jwtTokenProvider;
    private final ObjectMapper      objectMapper;

    // sessionId → WebSocketSession (for broadcasting back live updates to viewers)
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.put(session.getId(), session);
        log.info("WebSocket connected: {} | total sessions: {}", session.getId(), sessions.size());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        @SuppressWarnings("unchecked")
        Map<String, Object> payload = objectMapper.readValue(message.getPayload(), Map.class);
        String type = (String) payload.getOrDefault("type", "");

        switch (type) {
            case "GPS_UPDATE"  -> handleGpsUpdate(session, payload);
            case "PING"        -> session.sendMessage(new TextMessage("{\"type\":\"PONG\"}"));
            default            -> log.warn("Unknown message type: {} from session: {}", type, session.getId());
        }
    }

    private void handleGpsUpdate(WebSocketSession session, Map<String, Object> payload) {
        try {
            UUID journeyId = UUID.fromString((String) session.getAttributes().get("journeyId"));
            UUID userId    = UUID.fromString((String) session.getAttributes().get("userId"));

            double lat     = toDouble(payload.get("lat"));
            double lng     = toDouble(payload.get("lng"));
            double speed   = toDouble(payload.getOrDefault("speed",   0));
            double heading = toDouble(payload.getOrDefault("heading", 0));
            double alt     = toDouble(payload.getOrDefault("altitude",0));

            gpsEventProducer.publishGpsUpdate(journeyId, userId, lat, lng, speed, heading, alt);
        } catch (Exception e) {
            log.error("Failed to handle GPS update: {}", e.getMessage());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session.getId());
        log.info("WebSocket closed: {} | reason: {}", session.getId(), status);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        log.error("WebSocket error for session {}: {}", session.getId(), exception.getMessage());
    }

    private double toDouble(Object val) {
        if (val instanceof Number n) return n.doubleValue();
        if (val instanceof String s) return Double.parseDouble(s);
        return 0.0;
    }
}
