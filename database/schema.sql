-- Al-Mawa: Prayer Times Admin (MySQL)
-- Create DB first (phpMyAdmin): al_mawa

CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(64) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_admin_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS prayer_times (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(32) NOT NULL,
  adhan_time CHAR(5) NOT NULL,
  iqamah_time CHAR(5) NULL,
  sort_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_prayer_key (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Simple fundraising progress storage (single row id=1)
CREATE TABLE IF NOT EXISTS fundraising_progress (
  id TINYINT UNSIGNED NOT NULL,
  raised_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO fundraising_progress (id, raised_amount) VALUES (1, 0)
ON DUPLICATE KEY UPDATE
  raised_amount = raised_amount;

-- Initial default rows (same as current placeholder schedule)
INSERT INTO prayer_times (`key`, adhan_time, iqamah_time, sort_order) VALUES
('Fajr', '05:30', '05:45', 10),
('Sunrise', '06:52', NULL, 20),
('Dhuhr', '13:30', '13:45', 30),
('Asr', '17:10', '17:25', 40),
('Maghrib', '19:45', '19:50', 50),
('Isha', '21:00', '21:10', 60),
('Jumuah', '13:00', '13:30', 70)
ON DUPLICATE KEY UPDATE
  adhan_time = VALUES(adhan_time),
  iqamah_time = VALUES(iqamah_time),
  sort_order = VALUES(sort_order);

-- Islamic Measures & Standards table
CREATE TABLE IF NOT EXISTS islamic_measures (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(64) NOT NULL,
  label VARCHAR(128) NOT NULL,
  value VARCHAR(255) NOT NULL,
  sort_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_measure_key (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial default rows for Islamic Measures
INSERT INTO islamic_measures (`key`, label, value, sort_order) VALUES
('zakat_nisab_gold', 'Zakat Nisab (Gold)', '87.48 g / 3.09 oz', 10),
('zakat_nisab_silver', 'Zakat Nisab (Silver)', '612.36 g / 21.60 oz', 20),
('qurbani_nisab', 'Qurbani Nisab', '612.36 g / 21.60 oz (or its value)', 30),
('sadaqat_fitr_wheat', 'Sadaqat al-Fitr (wheat)', '1.574 kg / 55.53 oz (or its value)', 40),
('sadaqat_fitr_dates', 'Sadaqat al-Fitr (dates/raisins)', '3.149 kg / 111.09 oz (or its value)', 50),
('fidya', 'Fidya (per missed fast/prayer)', 'Same as Sadaqat al-Fitr', 60),
('mahr_fatimi', 'Mahr Fātimī', '1,530.9 g / 54.00 oz silver', 70),
('distance_safar', 'Distance of Safar', '77.25 km (≈ 48 miles)', 80)
ON DUPLICATE KEY UPDATE
  label = VALUES(label),
  value = VALUES(value),
  sort_order = VALUES(sort_order);
