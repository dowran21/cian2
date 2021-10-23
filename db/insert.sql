INSERT INTO languages(language, language_code) VALUES
('turkmen', 'tm'), 
('russian', 'ru');

INSERT INTO categories(absolute_name) VALUES ('sale'), ('rent');

INSERT INTO category_translations(name, language_id, category_id) VALUES
('Satlyk', 1, 1),
('Продается', 2, 1),
('Kärende', 1, 2),
('Сдается в аренду', 2, 2);


INSERT INTO statuses(category_id, absolute_name) VALUES 
(1, 'On sale'), 
(1, 'Saled'), 
(2, 'On rent'), 
(2, 'Rented');

INSERT INTO roles (role_name) VALUES
('admin'),
('moderator-admin'),
('user');

INSERT INTO event_types VALUES (1, 'Activation of real estate');

INSERT INTO tables VALUES (1, 'недвижимость');

INSERT INTO owners(name) VALUES ('owner'), ('agent');

INSERT INTO owner_type_translations (language_id, translation, owner_id) VALUES 
(1, 'eýesi', 1),
(2, 'собственник', 1),
(1, 'agent', 2),
(1, 'агент', 1);

INSERT INTO view_type(id, absolute_name) VALUES
(1, 'impression_count'),
(2, 'view_count');

INSERT INTO vip_types(id, name, days) VALUES
(1, '3-gunluk', 3),
(2, '5-gunluk', 5),
(3, '7-gunluk', 7);



--------This inserts for specifications----------------------
WITH inserted AS (INSERT INTO specifications (id, absolute_name, is_required, is_multiple) 
                    VALUES (1, 'quantity_of_rooms', 'true', 'false') RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES 
                    ('Otaglaryň sany', 1, (SELECT id FROM inserted)),('Количество комнат', 2, (SELECT id FROM inserted)) 
            ), insert_value0 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '1') RETURNING id
        ), insert_value1 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '2') RETURNING id
        ), insert_value2 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '3') RETURNING id
        ), insert_value3 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '4') RETURNING id
        ), insert_value4 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '5') RETURNING id
        ), insert_value5 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '6') RETURNING id
        ), insert_value6 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '7') RETURNING id
        ), insert_value7 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '8') RETURNING id
        ), insert_value8 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '9') RETURNING id
        ), insert_value9 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '10') RETURNING id
        ) SELECT id FROM inserted;

WITH inserted AS (INSERT INTO specifications (id, absolute_name, is_required, is_multiple) 
        VALUES (2, 'quantity of floors of tower', 'true', 'false') RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES 
                    ('Binanyň gatynyň sany', 1, (SELECT id FROM inserted)),('Количество этажей здания', 2, (SELECT id FROM inserted)) 
            ), insert_value0 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '1') RETURNING id
        ), insert_value1 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '2') RETURNING id
        ), insert_value2 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '3') RETURNING id
        ), insert_value3 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '4') RETURNING id
        ), insert_value4 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '5') RETURNING id
        ), insert_value5 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '6') RETURNING id
        ), insert_value6 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '7') RETURNING id
        ), insert_value7 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '8') RETURNING id
        ), insert_value8 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '9') RETURNING id
        ), insert_value9 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '10') RETURNING id
        ), insert_value10 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '11') RETURNING id
        ), insert_value11 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '12') RETURNING id
        ), insert_value12 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '13') RETURNING id
        ), insert_value13 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '14') RETURNING id
        ), insert_value14 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '15') RETURNING id
        ) SELECT id FROM inserted;

WITH inserted AS (INSERT INTO specifications (id, absolute_name, is_required, is_multiple) 
                VALUES (3, 'floor of the flat', 'true', 'false') RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES 
                    ('Ýerleşýän gaty', 1, (SELECT id FROM inserted)),('Этаж квартиры', 2, (SELECT id FROM inserted)) 
            ), insert_value0 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '1') RETURNING id
        ), insert_value1 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '2') RETURNING id
        ), insert_value2 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '3') RETURNING id
        ), insert_value3 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '4') RETURNING id
        ), insert_value4 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '5') RETURNING id
        ), insert_value5 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '6') RETURNING id
        ), insert_value6 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '7') RETURNING id
        ), insert_value7 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '8') RETURNING id
        ), insert_value8 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '9') RETURNING id
        ), insert_value9 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '10') RETURNING id
        ), insert_value10 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '11') RETURNING id
        ), insert_value11 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '12') RETURNING id
        ), insert_value12 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '13') RETURNING id
        ), insert_value13 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '14') RETURNING id
        ), insert_value14 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '15') RETURNING id
        ) SELECT id FROM inserted;

----just continue----
SELECT nextval('specifications_id_seq'::regclass);
SELECT nextval('specifications_id_seq'::regclass);
SELECT nextval('specifications_id_seq'::regclass);




