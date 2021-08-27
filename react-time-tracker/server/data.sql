-- CREATE DATABASE time_tracker;
\c time_tracker
DROP TABLE IF EXISTS shifts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    join_at timestamp with time zone,
    last_login_at timestamp with time zone
);

CREATE TABLE shifts (
    id SERIAL PRIMARY KEY,
    start TIMESTAMPTZ,
    stop TIMESTAMPTZ,
    category TEXT,
    type TEXT,
    u_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
