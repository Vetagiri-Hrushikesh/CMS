-- Create PoliticalManagementDB Database
CREATE DATABASE IF NOT EXISTS PoliticalManagementDB;
USE PoliticalManagementDB;

-- Table for User Roles
CREATE TABLE UserRoles (
    RoleID INT PRIMARY KEY,
    RoleName VARCHAR(50) NOT NULL
);

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

-- Table for Districts
CREATE TABLE Districts (
    DistrictID INT PRIMARY KEY AUTO_INCREMENT,
    DistrictName VARCHAR(255) NOT NULL
);

-- Table for Members of Parliament (MPs)
CREATE TABLE MPs (
    MPID INT PRIMARY KEY AUTO_INCREMENT,
    MPName VARCHAR(255) NOT NULL,
    DistrictID INT,
    UserID INT,
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table for Members of Legislative Assembly (MLAs)
CREATE TABLE MLAs (
    MLAID INT PRIMARY KEY AUTO_INCREMENT,
    MLAName VARCHAR(255) NOT NULL,
    DistrictID INT,
    UserID INT,
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

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

-- Table for City Incharges
CREATE TABLE CityIncharges (
    InchargeID INT PRIMARY KEY AUTO_INCREMENT,
    InchargeName VARCHAR(255) NOT NULL,
    CityID INT,
    UserID INT,
    FOREIGN KEY (CityID) REFERENCES Cities(CityID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table for Sub-Incharges
CREATE TABLE SubIncharges (
    SubInchargeID INT PRIMARY KEY AUTO_INCREMENT,
    SubInchargeName VARCHAR(255) NOT NULL,
    InchargeID INT,
    UserID INT,
    FOREIGN KEY (InchargeID) REFERENCES CityIncharges(InchargeID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table for District Incharges
CREATE TABLE DistrictIncharges (
    InchargeID INT PRIMARY KEY AUTO_INCREMENT,
    InchargeName VARCHAR(255) NOT NULL,
    DistrictID INT,
    UserID INT,
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table for People
CREATE TABLE Members (
    PersonID INT PRIMARY KEY AUTO_INCREMENT,
    MemberName VARCHAR(50) NOT NULL,
    SubInchargeID INT,
    UserID INT,
    FOREIGN KEY (SubInchargeID) REFERENCES SubIncharges(SubInchargeID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);