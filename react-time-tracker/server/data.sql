-- CREATE DATABASE time_tracker;
\c time_tracker

CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    start TIMESTAMPTZ,
    stop TIMESTAMPTZ,
    category TEXT,
    type TEXT
);
