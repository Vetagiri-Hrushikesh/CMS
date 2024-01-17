-- create-database.sql

-- Create the 'CMSApp' database if it doesn't exist
CREATE DATABASE IF NOT EXISTS CMSApp;

-- Switch to the 'CMSApp' database
USE CMSApp;

-- Table for storing user information
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Add 'role' field to the users table
ALTER TABLE users
ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user' NOT NULL;

-- Table for storing group information
CREATE TABLE IF NOT EXISTS groups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
    admin_id INT NOT NULL  -- Foreign key referencing users.user_id
);

-- Table for storing group memberships
CREATE TABLE IF NOT EXISTS group_members (
    user_id INT NOT NULL,  -- Foreign key referencing users.user_id
    group_id INT NOT NULL, -- Foreign key referencing groups.group_id
    PRIMARY KEY (user_id, group_id)
);

-- Table for storing messages
CREATE TABLE IF NOT EXISTS messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,   -- Foreign key referencing users.user_id
    group_id INT NOT NULL,  -- Foreign key referencing groups.group_id
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing videos
CREATE TABLE IF NOT EXISTS videos (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,   -- Foreign key referencing users.user_id
    group_id INT NOT NULL,  -- Foreign key referencing groups.group_id
    file_path VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing photos
CREATE TABLE IF NOT EXISTS photos (
    photo_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,   -- Foreign key referencing users.user_id
    group_id INT NOT NULL,  -- Foreign key referencing groups.group_id
    file_path VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing documents
CREATE TABLE IF NOT EXISTS documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,   -- Foreign key referencing users.user_id
    group_id INT NOT NULL,  -- Foreign key referencing groups.group_id
    file_path VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
