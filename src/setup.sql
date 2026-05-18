DROP TABLE IF EXISTS project_category CASCADE;
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS organization CASCADE;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT REFERENCES organization(organization_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE project_category (
    project_id INT REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INT REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

INSERT INTO category (name) VALUES
('Environment'),
('Education'),
('Community');

INSERT INTO project (organization_id, title, description, location, date) VALUES
(1, 'Community Center Paint', 'Painting the local community center rooms.', 'Downtown Community Center', '2026-06-01'),
(1, 'Library Ramp Build', 'Building a wooden ramp for wheelchair access.', 'City Library', '2026-06-08'),
(1, 'Park Bench Repair', 'Repairing broken wooden benches.', 'Central Park', '2026-06-15'),
(1, 'Youth Shelter Roof Fix', 'Patching the leaking roof of the youth shelter.', 'Youth Shelter', '2026-06-22'),
(1, 'Bus Shelter Clean', 'Cleaning and painting local bus stops.', 'Main Street Stop', '2026-06-29'),

(2, 'Community Garden Plant', 'Planting seasonal vegetables in the urban garden.', 'GreenHarvest Farm', '2026-06-02'),
(2, 'Compost Bin Assembly', 'Building new compost bins for public use.', 'North Garden', '2026-06-09'),
(2, 'Apple Harvest Day', 'Picking fresh apples to donate to local shelters.', 'Community Orchard', '2026-06-16'),
(2, 'Rain Barrel Install', 'Setting up rainwater collection systems.', 'South Garden', '2026-06-23'),
(2, 'Seed Cataloging Project', 'Sorting and packing seeds for residents.', 'Local Library Annex', '2026-06-30'),

(3, 'Soup Kitchen Preparation', 'Helping prepare and serve lunch to the homeless.', 'Unity Soup Kitchen', '2026-06-03'),
(3, 'Street Litter Cleanup', 'Picking up trash along major streets.', 'Broadway Ave', '2026-06-10'),
(3, 'Senior Center Visit', 'Playing games and spending time with seniors.', 'Golden Care Center', '2026-06-17'),
(3, 'School Supplies Packing', 'Filling backpacks with notebooks and pencils.', 'Unity Office', '2026-06-24'),
(3, 'Coat Drive Sorting', 'Sorting donated winter coats by size.', 'Red Cross Warehouse', '2026-07-01');

INSERT INTO project_category (project_id, category_id) VALUES
(1, 3), (2, 3), (3, 1), (4, 3), (5, 3),
(6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
(11, 3), (12, 1), (13, 3), (14, 2), (15, 3);
