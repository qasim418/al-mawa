-- Moon Sighting Configuration Table
-- Run this SQL to create the table for storing moon sighting settings

CREATE TABLE IF NOT EXISTS moon_sighting_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adjustment INT NOT NULL DEFAULT -1 COMMENT 'Day adjustment from calculated date (-2 to +2)',
    source VARCHAR(100) NOT NULL DEFAULT 'Chicago Hilal Committee' COMMENT 'Moon sighting authority',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default configuration
INSERT INTO moon_sighting_config (id, adjustment, source) 
VALUES (1, -1, 'Chicago Hilal Committee')
ON DUPLICATE KEY UPDATE 
    adjustment = VALUES(adjustment), 
    source = VALUES(source);

-- Verify the table was created
SELECT * FROM moon_sighting_config;
