-- PathPulse Database Schema

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username    VARCHAR(50)  UNIQUE NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    full_name   VARCHAR(100),
    avatar_url  TEXT,
    bio         TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    is_active   BOOLEAN DEFAULT TRUE
);

-- Journeys table
CREATE TABLE IF NOT EXISTS journeys (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(200),
    description     TEXT,
    transport_mode  VARCHAR(30) NOT NULL DEFAULT 'car',
    status          VARCHAR(20) NOT NULL DEFAULT 'active',
    start_time      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time        TIMESTAMPTZ,
    start_lat       DOUBLE PRECISION,
    start_lng       DOUBLE PRECISION,
    end_lat         DOUBLE PRECISION,
    end_lng         DOUBLE PRECISION,
    start_address   TEXT,
    end_address     TEXT,
    total_distance  DOUBLE PRECISION DEFAULT 0,
    total_duration  BIGINT DEFAULT 0,
    avg_speed       DOUBLE PRECISION DEFAULT 0,
    max_speed       DOUBLE PRECISION DEFAULT 0,
    fuel_consumed   DOUBLE PRECISION DEFAULT 0,
    co2_emitted     DOUBLE PRECISION DEFAULT 0,
    is_public       BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Vehicle profiles
CREATE TABLE IF NOT EXISTS vehicles (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(100) NOT NULL,
    type            VARCHAR(30) NOT NULL,
    make            VARCHAR(50),
    model           VARCHAR(50),
    year            INTEGER,
    fuel_type       VARCHAR(20),
    efficiency_kmpl DOUBLE PRECISION,
    is_default      BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Social follows
CREATE TABLE IF NOT EXISTS follows (
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- Journey likes
CREATE TABLE IF NOT EXISTS journey_likes (
    user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
    journey_id UUID REFERENCES journeys(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, journey_id)
);

-- Geo-fence alerts
CREATE TABLE IF NOT EXISTS geo_alerts (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    lat         DOUBLE PRECISION NOT NULL,
    lng         DOUBLE PRECISION NOT NULL,
    radius_m    INTEGER NOT NULL DEFAULT 500,
    trigger_on  VARCHAR(10) DEFAULT 'enter',
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_journeys_user_id ON journeys(user_id);
CREATE INDEX idx_journeys_status  ON journeys(status);
CREATE INDEX idx_journeys_created ON journeys(created_at DESC);
CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);
