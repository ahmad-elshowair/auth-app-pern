-- create users table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    users(
        user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_email VARCHAR(50) NOT NULL UNIQUE,
        user_name VARCHAR(50) NOT NULL,
        user_password VARCHAR(225) NOT NULL,
        is_admin BOOLEAN
    );