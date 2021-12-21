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
(2, 'агент', 2);



INSERT INTO view_type(id, absolute_name) VALUES
(1, 'impression_count'),
(2, 'view_count');

INSERT INTO vip_types(id, name) VALUES
(1, 'vip'),
(2, 'top');

INSERT INTO image_places(id, place) VALUES
(1, 'Main Page'),
(2, 'Готовый поиск купить квартиру'),
(3, 'Готовый поиск арендовать квартиру');

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
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Elite', 1) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Täze jaýlar', 1, (SELECT id FROM inserted)),('Элитка', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Uçastok', 1) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Mellek', 1, (SELECT id FROM inserted)),('Участок', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)))
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
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Магазин', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Dükan', 1, (SELECT id FROM inserted)),('Магазин', 2, (SELECT id FROM inserted))
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

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Общепит', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Obşepit', 1, (SELECT id FROM inserted)),('Общепит', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Помещение', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Pomesheniye', 1, (SELECT id FROM inserted)),('Помещение', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Здание', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Bina', 1, (SELECT id FROM inserted)),('Здание', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Быт.услуги', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Gündelik hyzmatlar üçin', 1, (SELECT id FROM inserted)),('Быт.услуги', 2, (SELECT id FROM inserted))
    ), insert_ctype AS 
        (INSERT INTO ctypes(category_id, type_id) 
        VALUES (1, (SELECT id FROM inserted)),(2, (SELECT id FROM inserted)))
        SELECT id FROM inserted;

WITH inserted AS ( 
        INSERT INTO types(absolute_name, main_type_id) VALUES ('Коммерч.земля', 2) RETURNING id
    ), inserte AS (
        INSERT INTO type_translations(name, language_id, type_id) 
        VALUES 
        ('Täjirçilik ýer', 1, (SELECT id FROM inserted)),('Коммерч.земля', 2, (SELECT id FROM inserted))
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
WITH inserted AS (
            INSERT INTO specifications(absolute_name, is_required, is_multiple)
            VALUES ('Количество комнат', true, false) RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES ('Количество комнат', 2, (SELECT id FROM inserted)),('Otaglaryň sany', 1, (SELECT id FROM inserted))
               ), inserted_val0 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '1') RETURNING id
        ), inseert_val_trans0 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('1', 2, (SELECT id FROM inserted_val0)),
                ('1', 1, (SELECT id FROM inserted_val0))
            ), inserted_val1 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '2') RETURNING id
        ), inseert_val_trans1 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('2', 2, (SELECT id FROM inserted_val1)),
                ('2', 1, (SELECT id FROM inserted_val1))
            ), inserted_val2 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '3') RETURNING id
        ), inseert_val_trans2 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('3', 2, (SELECT id FROM inserted_val2)),
                ('3', 1, (SELECT id FROM inserted_val2))
            ), inserted_val3 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '4') RETURNING id
        ), inseert_val_trans3 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('4', 2, (SELECT id FROM inserted_val3)),
                ('4', 1, (SELECT id FROM inserted_val3))
            ), inserted_val4 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '5') RETURNING id
        ), inseert_val_trans4 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('5', 2, (SELECT id FROM inserted_val4)),
                ('5', 1, (SELECT id FROM inserted_val4))
            ), inserted_val5 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '6') RETURNING id
        ), inseert_val_trans5 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('6', 2, (SELECT id FROM inserted_val5)),
                ('6', 1, (SELECT id FROM inserted_val5))
            )
                SELECT id FROM inserted;

WITH inserted AS (
            INSERT INTO specifications(absolute_name, is_required, is_multiple)
            VALUES ('Количество этажей здания', true, false) RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES ('Количество этажей здания', 2, (SELECT id FROM inserted)),('Binanyň gatynyň sany', 1, (SELECT id FROM inserted))
               ), inserted_val0 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '1') RETURNING id
        ), inseert_val_trans0 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('1', 2, (SELECT id FROM inserted_val0)),
                ('1', 1, (SELECT id FROM inserted_val0))
            ), inserted_val1 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '2') RETURNING id
        ), inseert_val_trans1 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('2', 2, (SELECT id FROM inserted_val1)),
                ('2', 1, (SELECT id FROM inserted_val1))
            ), inserted_val2 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '3') RETURNING id
        ), inseert_val_trans2 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('3', 2, (SELECT id FROM inserted_val2)),
                ('3', 1, (SELECT id FROM inserted_val2))
            ), inserted_val3 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '4') RETURNING id
        ), inseert_val_trans3 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('4', 2, (SELECT id FROM inserted_val3)),
                ('4', 1, (SELECT id FROM inserted_val3))
            ), inserted_val4 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '5') RETURNING id
        ), inseert_val_trans4 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('5', 2, (SELECT id FROM inserted_val4)),
                ('5', 1, (SELECT id FROM inserted_val4))
            ), inserted_val5 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '6') RETURNING id
        ), inseert_val_trans5 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('6', 2, (SELECT id FROM inserted_val5)),
                ('6', 1, (SELECT id FROM inserted_val5))
            ), inserted_val6 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '7') RETURNING id
        ), inseert_val_trans6 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('7', 2, (SELECT id FROM inserted_val6)),
                ('7', 1, (SELECT id FROM inserted_val6))
            ), inserted_val7 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '8') RETURNING id
        ), inseert_val_trans7 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('8', 2, (SELECT id FROM inserted_val7)),
                ('8', 1, (SELECT id FROM inserted_val7))
            ), inserted_val8 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '9') RETURNING id
        ), inseert_val_trans8 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('9', 2, (SELECT id FROM inserted_val8)),
                ('9', 1, (SELECT id FROM inserted_val8))
            ), inserted_val9 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '10') RETURNING id
        ), inseert_val_trans9 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('10', 2, (SELECT id FROM inserted_val9)),
                ('10', 1, (SELECT id FROM inserted_val9))
            ), inserted_val10 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '11') RETURNING id
        ), inseert_val_trans10 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('11', 2, (SELECT id FROM inserted_val10)),
                ('11', 1, (SELECT id FROM inserted_val10))
            ), inserted_val11 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '12') RETURNING id
        ), inseert_val_trans11 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('12', 2, (SELECT id FROM inserted_val11)),
                ('12', 1, (SELECT id FROM inserted_val11))
            ), inserted_val12 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '13') RETURNING id
        ), inseert_val_trans12 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('13', 2, (SELECT id FROM inserted_val12)),
                ('13', 1, (SELECT id FROM inserted_val12))
            ), inserted_val13 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '14') RETURNING id
        ), inseert_val_trans13 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('14', 2, (SELECT id FROM inserted_val13)),
                ('14', 1, (SELECT id FROM inserted_val13))
            ), inserted_val14 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '15') RETURNING id
        ), inseert_val_trans14 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('15', 2, (SELECT id FROM inserted_val14)),
                ('15', 1, (SELECT id FROM inserted_val14))
            )
                SELECT id FROM inserted;
WITH inserted AS (
            INSERT INTO specifications(absolute_name, is_required, is_multiple)
            VALUES ('Этаж кватиры', true, false) RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES ('Этаж кватиры', 2, (SELECT id FROM inserted)),('Ýerleşýän gaty', 1, (SELECT id FROM inserted))
               ), inserted_val0 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '1') RETURNING id
        ), inseert_val_trans0 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('1', 2, (SELECT id FROM inserted_val0)),
                ('1', 1, (SELECT id FROM inserted_val0))
            ), inserted_val1 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '2') RETURNING id
        ), inseert_val_trans1 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('2', 2, (SELECT id FROM inserted_val1)),
                ('2', 1, (SELECT id FROM inserted_val1))
            ), inserted_val2 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '3') RETURNING id
        ), inseert_val_trans2 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('3', 2, (SELECT id FROM inserted_val2)),
                ('3', 1, (SELECT id FROM inserted_val2))
            ), inserted_val3 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '4') RETURNING id
        ), inseert_val_trans3 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('4', 2, (SELECT id FROM inserted_val3)),
                ('4', 1, (SELECT id FROM inserted_val3))
            ), inserted_val4 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '5') RETURNING id
        ), inseert_val_trans4 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('5', 2, (SELECT id FROM inserted_val4)),
                ('5', 1, (SELECT id FROM inserted_val4))
            ), inserted_val5 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '6') RETURNING id
        ), inseert_val_trans5 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('6', 2, (SELECT id FROM inserted_val5)),
                ('6', 1, (SELECT id FROM inserted_val5))
            ), inserted_val6 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '7') RETURNING id
        ), inseert_val_trans6 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('7', 2, (SELECT id FROM inserted_val6)),
                ('7', 1, (SELECT id FROM inserted_val6))
            ), inserted_val7 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '8') RETURNING id
        ), inseert_val_trans7 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('8', 2, (SELECT id FROM inserted_val7)),
                ('8', 1, (SELECT id FROM inserted_val7))
            ), inserted_val8 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '9') RETURNING id
        ), inseert_val_trans8 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('9', 2, (SELECT id FROM inserted_val8)),
                ('9', 1, (SELECT id FROM inserted_val8))
            ), inserted_val9 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '10') RETURNING id
        ), inseert_val_trans9 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('10', 2, (SELECT id FROM inserted_val9)),
                ('10', 1, (SELECT id FROM inserted_val9))
            ), inserted_val10 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '11') RETURNING id
        ), inseert_val_trans10 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('11', 2, (SELECT id FROM inserted_val10)),
                ('11', 1, (SELECT id FROM inserted_val10))
            ), inserted_val11 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '12') RETURNING id
        ), inseert_val_trans11 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('12', 2, (SELECT id FROM inserted_val11)),
                ('12', 1, (SELECT id FROM inserted_val11))
            ), inserted_val12 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '13') RETURNING id
        ), inseert_val_trans12 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('13', 2, (SELECT id FROM inserted_val12)),
                ('13', 1, (SELECT id FROM inserted_val12))
            ), inserted_val13 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '14') RETURNING id
        ), inseert_val_trans13 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('14', 2, (SELECT id FROM inserted_val13)),
                ('14', 1, (SELECT id FROM inserted_val13))
            ), inserted_val14 AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '15') RETURNING id
        ), inseert_val_trans14 AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('15', 2, (SELECT id FROM inserted_val14)),
                ('15', 1, (SELECT id FROM inserted_val14))
            )
                SELECT id FROM inserted;



------------------
--INSERT INTO user_permissions (user_id, validity) VALUES (9, '[2021-12-01, 2021-12-15]');