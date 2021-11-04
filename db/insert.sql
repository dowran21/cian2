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


INSERT INTO event_types VALUES 
(1, 'activation or deactivation real estate'),
(2, 'activation vip');

INSERT INTO tables VALUES 
(1, 'real estate'),
(2, 'vip confirmation');

--------------------This is the type of real_estates----------------
WITH inserted AS ( 
        INSERT INTO types(absolute_name) VALUES ('Live') RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Ýaşalýan', 1, (SELECT id FROM inserted)),('Жилая', 2, (SELECT id FROM inserted))
    ) SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name) VALUES ('Commerce') RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Täjirçilik', 1, (SELECT id FROM inserted)),('Комерческая', 2, (SELECT id FROM inserted))
    ) SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Flat', 1) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Kwartira', 1, (SELECT id FROM inserted)),('Квартира', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('House', 1) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Öý', 1, (SELECT id FROM inserted)),('Дом', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Daca', 1) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Daça', 1, (SELECT id FROM inserted)),('Дача', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Room', 1) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Otag', 1, (SELECT id FROM inserted)),('Комната', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Office', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Ofis', 1, (SELECT id FROM inserted)),('Офис', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Sklad', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Ammar', 1, (SELECT id FROM inserted)),('Склад', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Proizwodstwo', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Önümçilik', 1, (SELECT id FROM inserted)),('Производство', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

-----------------It is just for locations-----------
WITH inserted AS (
        INSERT INTO locations(absolute_name)
        VALUES ('Ashgabat city') RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('Aşgabat', 1, (SELECT id FROM inserted)),('Ашгабат', 2, (SELECT id FROM inserted));

WITH inserted AS (
        INSERT INTO locations(absolute_name)
        VALUES ('Mary welayaty') RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('Mary welayat', 1, (SELECT id FROM inserted)),('Марыйский велаят', 2, (SELECT id FROM inserted));

WITH inserted AS (
        INSERT INTO locations(absolute_name)
        VALUES ('Lebap welayaty') RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('Lebap welayat', 1, (SELECT id FROM inserted)),('Лебапский велаят', 2, (SELECT id FROM inserted));

------------------Add sublocations ---------------
WITH inserted AS (
        INSERT INTO locations(absolute_name, main_location_id)
            VALUES ('11mkr', 1) RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('11 mkr', 1, (SELECT id FROM inserted)),('11 mkr', 2, (SELECT id FROM inserted));

WITH inserted AS (
        INSERT INTO locations(absolute_name, main_location_id)
            VALUES ('10mkr', 1) RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('10 mkr', 1, (SELECT id FROM inserted)),('10 mkr', 2, (SELECT id FROM inserted));

WITH inserted AS (
        INSERT INTO locations(absolute_name, main_location_id)
            VALUES ('9mkr', 1) RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('9 mkr', 1, (SELECT id FROM inserted)),('9 mkr', 2, (SELECT id FROM inserted));

WITH inserted AS (
        INSERT INTO locations(absolute_name, main_location_id)
            VALUES ('8 mkr', 1) RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('8 mkr', 1, (SELECT id FROM inserted)),('8 mkr', 2, (SELECT id FROM inserted));

WITH inserted AS (
        INSERT INTO locations(absolute_name, main_location_id)
            VALUES ('7 mkr', 1) RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('7 mkr', 1, (SELECT id FROM inserted)),('7 mkr', 2, (SELECT id FROM inserted));

WITH inserted AS (
        INSERT INTO locations(absolute_name, main_location_id)
            VALUES ('6 mkr', 1) RETURNING id
    ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
        ('6 mkr', 1, (SELECT id FROM inserted)),('6 mkr', 2, (SELECT id FROM inserted));

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

    ------------it is just a for the test after the deploying it must be deleted---------- 
    WITH inserted AS (
            INSERT INTO specifications (absolute_name, is_required, is_multiple) 
                VALUES ('type of telephone line', false, false) RETURNING id
        ), insert_translations AS (
            INSERT INTO specification_translations(name, language_id, spec_id)
                VALUES 
                ('Telefon liniyanyn gornusi', 1, (SELECT id FROM inserted)),('Виды телефонной линии', 2, (SELECT id FROM inserted)) 
        ), insert_value0 AS (
            INSERT INTO specification_values (spec_id, absolute_value)
                VALUES ((SELECT id FROM inserted), 'ADSL') RETURNING id
    ), insert_val_trans0 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                VALUES 
                    ('ADSL', 1, (SELECT id FROM insert_value0)),('АДСЛ', 2, (SELECT id FROM insert_value0))
        ), insert_value1 AS (
            INSERT INTO specification_values (spec_id, absolute_value)
                VALUES ((SELECT id FROM inserted), 'FIBEROPTIC') RETURNING id
    ), insert_val_trans1 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                VALUES 
                    ('optiki Suyum', 1, (SELECT id FROM insert_value1)),('Оптоволокно', 2, (SELECT id FROM insert_value1))
        ), insert_value2 AS (
            INSERT INTO specification_values (spec_id, absolute_value)
                VALUES ((SELECT id FROM inserted), 'LAN') RETURNING id
    ), insert_val_trans2 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                VALUES 
                    ('LAN', 1, (SELECT id FROM insert_value2)),('LAN', 2, (SELECT id FROM insert_value2))
        ) 
            SELECT id FROM inserted;

    WITH inserted AS (
                INSERT INTO specifications (absolute_name, is_required, is_multiple) 
                    VALUES ('type of security', false, true) RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES 
                    ('Goragy[ gornusi', 1, (SELECT id FROM inserted)),('Виды охранной системы', 2, (SELECT id FROM inserted)) 
            ), insert_value0 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), 'Signalization') RETURNING id
        ), insert_val_trans0 AS (
                INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                    VALUES 
                        ('Signalizasiya', 1, (SELECT id FROM insert_value0)),('сигнализация', 2, (SELECT id FROM insert_value0))
            ), insert_value1 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), 'Dog') RETURNING id
        ), insert_val_trans1 AS (
                INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                    VALUES 
                        ('Gujuk', 1, (SELECT id FROM insert_value1)),('Собака', 2, (SELECT id FROM insert_value1))
            ), insert_value2 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), 'fire Signalization') RETURNING id
        ), insert_val_trans2 AS (
                INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                    VALUES 
                        ('Ot signalizasiyasy', 1, (SELECT id FROM insert_value2)),('пожарная сигнализация', 2, (SELECT id FROM insert_value2))
            ) 
                SELECT id FROM inserted;

    WITH inserted AS (
                INSERT INTO specifications (absolute_name, is_required, is_multiple) 
                    VALUES ('type of constructor', 'false', 'false') RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES 
                    ('Gurluşyň gornusi', 1, (SELECT id FROM inserted)),('Виды строения', 2, (SELECT id FROM inserted)) 
            ), insert_value0 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), 'Monolit') RETURNING id
        ), insert_val_trans0 AS (
                INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                    VALUES 
                        ('Monolit', 1, (SELECT id FROM insert_value0)),('Монолит', 2, (SELECT id FROM insert_value0))
            ), insert_value1 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), 'Betonoblok') RETURNING id
        ), insert_val_trans1 AS (
                INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                    VALUES 
                        ('Betonblok', 1, (SELECT id FROM insert_value1)),('Бетонный блок', 2, (SELECT id FROM insert_value1))
            ), insert_value2 AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), 'Kerpic') RETURNING id
        ), insert_val_trans2 AS (
                INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                    VALUES 
                        ('Kerpic', 1, (SELECT id FROM insert_value2)),('Керпич', 2, (SELECT id FROM insert_value2))
            ) 
                SELECT id FROM inserted;
