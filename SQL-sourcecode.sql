CREATE TABLE easters (
date_id SERIAL PRIMARY KEY,
week_day VARCHAR(15) NOT NULL,
date_of_easter INTEGER NOT NULL,
easter_month VARCHAR(15) NOT NULL,
this_year INTEGER NOT NULL);

INSERT INTO easters (week_day, date_of_easter, easter_month, this_year)
VALUES 
('Sun', 04, 'Apr', 2021), 
('Sun', 17, 'Apr', 2022), 
('Sun', 09, 'Apr', 2023)
