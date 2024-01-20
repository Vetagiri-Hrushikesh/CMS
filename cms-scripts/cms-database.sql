-- Create PoliticalManagementDB Database
CREATE DATABASE IF NOT EXISTS PoliticalManagementDB;
USE PoliticalManagementDB;

-- Table for User Roles
CREATE TABLE UserRoles (
    RoleID INT PRIMARY KEY,
    RoleName VARCHAR(50) NOT NULL
);

-- Insert static RoleIDs
INSERT INTO UserRoles (RoleID, RoleName) VALUES
(1, 'Admin'),
(2, 'District Incharge'),
(3, 'City Incharge'),
(4, 'Sub Incharge'),
(5, 'Member'),
(6, 'MLA'),
(7, 'MP');

-- Table for Users
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(255) NOT NULL,
    UserName VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES UserRoles(RoleID)
);

-- Add default admin user
INSERT INTO Users (FullName, UserName, PasswordHash, Email, RoleID) VALUES
('Admin User', 'admin', 'hashed_password', 'admin@example.com', 1), -- RoleID for 'Admin' is 1
('MP User', 'mp_user', 'hashed_password', 'mp_user@example.com', 7), -- RoleID for 'MP' is 7
('MLA User', 'mla_user', 'hashed_password', 'mla_user@example.com', 6), -- RoleID for 'MLA' is 6
('City Incharge User', 'city_incharge', 'hashed_password', 'city_incharge@example.com', 3), -- RoleID for 'City Incharge' is 3
('Sub Incharge User', 'sub_incharge', 'hashed_password', 'sub_incharge@example.com', 4), -- RoleID for 'Sub Incharge' is 4
('Member User', 'member', 'hashed_password', 'member@example.com', 5); -- RoleID for 'Member' is 5

-- Table for Districts
CREATE TABLE Districts (
    DistrictID INT PRIMARY KEY AUTO_INCREMENT,
    DistrictName VARCHAR(255) NOT NULL
);

-- Add default value for Districts (assuming Andhra Pradesh)
INSERT INTO Districts (DistrictName) VALUES
('Anantapur'),
('Chittoor'),
('East Godavari'),
('Guntur'),
('Krishna'),
('Kurnool'),
('Nellore'),
('Prakasam'),
('Srikakulam'),
('Visakhapatnam'),
('Vizianagaram'),
('West Godavari'),
('Y.S.R. Kadapa');

-- Table for Members of Parliament (MPs)
CREATE TABLE MPs (
    MPID INT PRIMARY KEY AUTO_INCREMENT,
    MPName VARCHAR(255) NOT NULL,
    DistrictID INT,
    UserID INT,
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Add default MP
INSERT INTO MPs (MPName, DistrictID, UserID) VALUES
('Default MP', 1, 1); -- Assuming DistrictID is 1, and UserID is 1

-- Table for Members of Legislative Assembly (MLAs)
CREATE TABLE MLAs (
    MLAID INT PRIMARY KEY AUTO_INCREMENT,
    MLAName VARCHAR(255) NOT NULL,
    DistrictID INT,
    UserID INT,
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Add default MLA
INSERT INTO MLAs (MLAName, DistrictID, UserID) VALUES
('Default MLA', 1, 1); -- Assuming DistrictID is 1, and UserID is 1

-- Table for Cities
CREATE TABLE Cities (
    CityID INT PRIMARY KEY AUTO_INCREMENT,
    CityName VARCHAR(255) NOT NULL,
    DistrictID INT,
    MPID INT,
    MLAID INT,
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID),
    FOREIGN KEY (MPID) REFERENCES MPs(MPID),
    FOREIGN KEY (MLAID) REFERENCES MLAs(MLAID)
);

-- Add default value for Cities (assuming Andhra Pradesh)
INSERT INTO Cities (CityName, DistrictID) VALUES
('Anantapur City', 1),
('Tirupati', 2),
('Kakinada', 3),
('Guntur', 4),
('Vijayawada', 5),
('Kurnool', 6),
('Nellore', 7),
('Ongole', 8),
('Srikakulam', 9),
('Visakhapatnam', 10),
('Vizianagaram', 11),
('Eluru', 12),
('Kadapa', 13);


-- Table for City Incharges
CREATE TABLE CityIncharges (
    InchargeID INT PRIMARY KEY AUTO_INCREMENT,
    InchargeName VARCHAR(255) NOT NULL,
    CityID INT,
    UserID INT,
    FOREIGN KEY (CityID) REFERENCES Cities(CityID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Add default City Incharge
INSERT INTO CityIncharges (InchargeName, CityID, UserID) VALUES
('Default City Incharge', 1, 1); -- Assuming CityID is 1, and UserID is 1

-- Table for Sub-Incharges
CREATE TABLE SubIncharges (
    SubInchargeID INT PRIMARY KEY AUTO_INCREMENT,
    SubInchargeName VARCHAR(255) NOT NULL,
    InchargeID INT,
    UserID INT,
    FOREIGN KEY (InchargeID) REFERENCES CityIncharges(InchargeID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Add default Sub Incharge
INSERT INTO SubIncharges (SubInchargeName, InchargeID, UserID) VALUES
('Default Sub Incharge', 1, 1); -- Assuming InchargeID is 1, and UserID is 1

-- Table for District Incharges
CREATE TABLE DistrictIncharges (
    InchargeID INT PRIMARY KEY AUTO_INCREMENT,
    InchargeName VARCHAR(255) NOT NULL,
    DistrictID INT,
    UserID INT,
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Add default District Incharge
INSERT INTO DistrictIncharges (InchargeName, DistrictID, UserID) VALUES
('Default District Incharge', 1, 1); -- Assuming DistrictID is 1, and UserID is 1

-- Table for People
CREATE TABLE Members (
    PersonID INT PRIMARY KEY AUTO_INCREMENT,
    MemberName VARCHAR(50) NOT NULL,
    SubInchargeID INT,
    UserID INT,
    FOREIGN KEY (SubInchargeID) REFERENCES SubIncharges(SubInchargeID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Divide Schema and Data
