

INSERT INTO sales_person (id, name, "contactNumber", email, "additionalInfo")
VALUES
    (1, 'zeyad amer', '01018764627', 'zeyadamer285@gmail.com', 'Male'),
    (2, 'adham amer', '01553420285', 'ahmed.hesham@yahoo.com', 'Male');

INSERT INTO project (id, name, area, address)
VALUES
    (1, 'Project 1', 'zahraa maadi', '6A street 100'),
    (2, 'Project 2', 'fifth settlement', 'sodic east'),
    (3, 'Project 3', '6th of October', 'sodic west'),
    (4, 'Project 4', 'abbas akkad', 'abbas akkad');

-- Insert data into apartment table using a loop
DO $$ 
DECLARE
    i INT;
    project_ids INT[] := ARRAY[1, 2, 3, 4]; -- Projects with IDs 1 to 4
    sales_person_ids INT[] := ARRAY[1, 2]; -- Sales persons with IDs 1 and 2
BEGIN
    FOR i IN 1..30 LOOP
        INSERT INTO apartment (name, price, currency, floor, rooms, toilets, "hasParking", "projectId", "salesPersonId")
        VALUES (
            'Apartment ' || i, -- Name: 'Apartment 1', 'Apartment 2', ..., 'Apartment 30'
            ROUND(100000 + (RANDOM() * 500000)), -- Random price between 100000 and 600000
            CASE 
                WHEN i % 2 = 0 THEN 'EGP'::apartment_currency_enum 
                ELSE 'USD'::apartment_currency_enum 
            END, -- Alternate between EGP and USD (with enum casting)
            FLOOR(RANDOM() * 10) + 1, -- Random floor between 1 and 10
            FLOOR(RANDOM() * 5) + 1, -- Random number of rooms between 1 and 5
            FLOOR(RANDOM() * 3) + 1, -- Random number of toilets between 1 and 3
            CASE WHEN i % 2 = 0 THEN TRUE ELSE FALSE END, -- Alternate between "hasParking" true/false
            project_ids[ROUND(RANDOM() * 3) + 1], -- Random project ID (1 to 4)
            sales_person_ids[ROUND(RANDOM() * 1) + 1] -- Random sales person ID (1 or 2)
        );
    END LOOP;
END $$;
