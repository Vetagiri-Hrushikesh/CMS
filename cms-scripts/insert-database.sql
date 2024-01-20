USE PoliticalManagementDB;

-- Insert static RoleIDs
INSERT INTO UserRoles (RoleID, RoleName) VALUES
(1, 'Admin'),
(2, 'District Incharge'),
(3, 'City Incharge'),
(4, 'Sub Incharge'),
(5, 'Member'),
(6, 'MLA'),
(7, 'MP');


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
