CREATE OR REPLACE FUNCTION update_denied_count() RETURNS TRIGGER AS $access_ip_update$

    BEGIN 
        IF (NEW.denied_count = 3) THEN
            UPDATE access_ip SET denied_count = 0,
            validity = 
            tsrange (
                        localtimestamp,
                        localtimestamp + INTERVAL '1 MINUTE'
                        '[]'
                    )
             WHERE id = NEW.id;
        END IF; 
        RETURN NULL;
    END;

$access_ip_update$ LANGUAGE plpgsql;

CREATE TRIGGER access_ip_update
    AFTER UPDATE ON access_ip
    FOR EACH ROW
    WHEN (pg_trigger_depth()<1)
    EXECUTE PROCEDURE update_denied_count();


CREATE OR REPLACE FUNCTION real_estate_name(re_id int, language_id smallint, t_name VARCHAR, area NUMERIC(8)) 
    RETURNS VARCHAR AS $real_name$
    DECLARE
        real_name VARCHAR (250);
    BEGIN
        SELECT 
            concat(
            CASE WHEN 
                    (SELECT sv.absolute_value
                    FROM specification_values sv
                        INNER JOIN specifications s 
                            ON s.id = sv.spec_id
                        INNER JOIN real_estate_specification_values resv 
                            ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
                    WHERE resv.spec_id = 1 AND resv.real_estate_id = re_id)  IS NOT NULL THEN 
                        (SELECT sv.absolute_value
                        FROM specification_values sv
                            INNER JOIN specifications s 
                                ON s.id = sv.spec_id
                            INNER JOIN real_estate_specification_values resv 
                                ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
                    WHERE resv.spec_id = 1 AND resv.real_estate_id = re_id) ||
                CASE 
                    WHEN language_id = 1 THEN ' otag.'
                    WHEN language_id = 2 THEN ' комн.'
                END
            END,
            t_name,' ', E'\u00B7' , ' ' ,area ||
                CASE 
                    WHEN language_id = 1 THEN ' m'
                    WHEN language_id = 2 THEN ' м'
                END, E'\u00B2', ' ', '' ||
            CASE WHEN            
            (SELECT sv.absolute_value
                FROM specification_values sv
                    INNER JOIN specifications s 
                        ON s.id = sv.spec_id
                    INNER JOIN real_estate_specification_values resv 
                        ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
            WHERE resv.spec_id = 3 AND resv.real_estate_id = re_id) IS NOT NULL THEN  E'\u00B7' || ' ' ||
            (SELECT sv.absolute_value
                FROM specification_values sv
                    INNER JOIN specifications s ON s.id = sv.spec_id
                    INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
            WHERE resv.spec_id = 3 AND resv.real_estate_id = re_id) ||
            '/' ||
            (SELECT sv.absolute_value
                FROM specification_values sv
                    INNER JOIN specifications s ON s.id = sv.spec_id
                    INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
            WHERE resv.spec_id = 2 AND resv.real_estate_id = re_id)
            END          
        )
        INTO real_name;
    RETURN real_name;
    END;

$real_name$ LANGUAGE plpgsql;


-- CREATE OR REPLACE FUNCTION add_to_view_count() RETURNS TRIGGER AS $day_view_count$
    
--     BEGIN
--         INSERT INTO view_count (count, real_estate_id, view_type_id, count_date) 
--             VALUES (1, NEW.real_estate_id, NEW.view_type_id, CURRENT_DATE)
--         ON CONFLICT (real_estate_id, is_active, count_date, view_type_id) WHERE (is_active) 
--             DO UPDATE SET count = view_count.count + 1;

--     RETURN NULL;
--     END;

-- $day_view_count$ LANGUAGE plpgsql;



-- CREATE TRIGGER day_view_count 
--     AFTER INSERT ON view_address 
--     FOR EACH ROW EXECUTE PROCEDURE add_to_view_count();

-- CREATE OR REPLACE FUNCTION add_to_view_count_advertisement() RETURNS TRIGGER AS $day_view_count_of_advertisement$

--     BEGIN
--         INSERT INTO advertisement_view_count (count, advertisement_id, view_type_id)
--             VALUES (1, NEW.advertisement_id, NEW.view_type_id)
--         ON CONFLICT (advertisement_id, count_date, is_active, view_type_id) WHERE (is_active)
--             DO UPDATE SET count = advertisement_view_count.count +1;
    
--         RETURN NULL;
--     END;
-- $day_view_count_of_advertisement$ LANGUAGE plpgsql;

-- CREATE TRIGGER day_view_count_of_advertisement
--     AFTER INSERT ON view_address_advertisements
--     FOR EACH ROW EXECUTE PROCEDURE add_to_view_count_advertisement();

-- CREATE OR REPLACE FUNCTION change_status_id() RETURNS TRIGGER AS $update_real_estate$

--     BEGIN
--         IF (NEW.status_id = 2 OR NEW.status_id = 4) THEN
--             WITH updated AS (
--                     UPDATE real_estates SET realesed_at = clock_timestamp() WHERE id = NEW.id 
--                 ), update_price AS (
--                     UPDATE real_estate_prices SET is_active = false WHERE real_estate_id = NEW.id
--                 ), select_wish_count AS (
--                     SELECT COUNT(*) AS count FROM user_wish_list WHERE real_estate_id = NEW.id
--                 ), insert_wish_count AS (
--                     INSERT INTO real_estate_wish_list_count (real_estate_id, count) 
--                         VALUES (NEW.id, (SELECT count FROM select_wish_count))
--                 ), update_view_count AS (
--                     UPDATE view_count SET is_active = false WHERE real_estate_id = NEW.id
--                 ) DELETE FROM view_address WHERE real_estate_id = NEW.id;

--                 DELETE FROM user_wish_list WHERE real_estate_id = NEW.id;
--         END IF;
--         RETURN NULL;
--     END;

-- $update_real_estate$ LANGUAGE plpgsql;

-- CREATE TRIGGER update_real_estate
--     AFTER UPDATE ON real_estates
--     FOR EACH ROW 
--     WHEN (pg_trigger_depth()<1)
--     EXECUTE PROCEDURE change_status_id();
WITH selected AS 
        (SELECT DISTINCT ON (re.id) re.id, rep.price::text, u.phone::text, to_char(re.created_at, 'YYYY-MM-DD') AS created_at, u.full_name, u.owner_id,
        concat(lt.translation || ', ' || CASE WHEN ltt.translation IS NOT NULL THEN ltt.translation  END ) AS location,
        (SELECT real_estate_name(re.id, l.id, tt.name, area)), vre.vip_type_id,  vre.id AS vip_id,
        
        (SELECT json_agg(dest) FROM (
            SELECT rei.destination FROM real_estate_images rei
            WHERE rei.real_estate_id = re.id AND rei.is_active = true
        )dest) AS images, 
        ret.description

        FROM real_estates re 
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            LEFT JOIN real_estate_prices rep 
                ON rep.real_estate_id = re.id AND rep.is_active = 'true'
            LEFT JOIN languages l 
                ON l.language_code = 'ru'
            INNER JOIN real_estate_translations ret
                ON ret.real_estate_id = re.id AND ret.language_id = l.id
            LEFT JOIN type_translations tt 
                ON tt.type_id = cp.type_id AND tt.language_id = l.id
            LEFT JOIN location_translations lt
                ON lt.location_id = re.location_id AND lt.language_id = l.id
            LEFT JOIN locations lc 
                ON lc.id = re.location_id
            LEFT JOIN location_translations ltt
                ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
            LEFT JOIN vip_real_estates vre
                ON vre.real_estate_id = re.id AND vre.vip_dates::tsrange @> localtimestamp
            INNER JOIN users u
                ON u.id = re.user_id
            LEFT JOIN types t
                ON t.id = cp.type_id
            LEFT JOIN categories c 
                ON c.id = cp.category_id
        WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 
        ORDER BY  re.id DESC),

                    
    inserted AS (INSERT INTO view_address 
        SELECT 'sahdgbaksjdnkasdkas',  id, 1 FROM selected 
        ON CONFLICT (ip_address, real_estate_id, view_type_id) DO NOTHING)
    
    SELECT
         (SELECT COUNT (count.id) FROM (SELECT  DISTINCT ON (re.id) re.id FROM real_estates re  
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            LEFT JOIN real_estate_prices rep 
                ON rep.real_estate_id = re.id AND rep.is_active = 'true'
            LEFT JOIN languages l 
                ON l.language_code = 'ru'
            INNER JOIN real_estate_translations ret
                ON ret.real_estate_id = re.id AND ret.language_id = l.id
            LEFT JOIN type_translations tt 
                ON tt.type_id = cp.type_id AND tt.language_id = l.id
            LEFT JOIN vip_real_estates vre 
                ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
            LEFT JOIN location_translations lt
                ON lt.location_id = re.location_id AND lt.language_id = l.id
            LEFT JOIN locations lc 
                ON lc.id = re.location_id
            LEFT JOIN location_translations ltt
                ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
            INNER JOIN types t
                ON t.id = cp.type_id
            INNER JOIN users u
                ON u.id = re.user_id
            INNER JOIN categories c 
                ON c.id = cp.category_id
            WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4  
        ) AS count),

        (SELECT json_agg(res) FROM 
            (SELECT * FROM selected 
                ORDER BY vip_type_id ASC NULLS LAST, vip_id ASC NULLS LAST, id DESC
                
            )res) AS real_estates_all