CREATE OR REPLACE FUNCTION add_to_view_count() RETURNS TRIGGER AS $day_view_count$
    
    BEGIN
        INSERT INTO view_count (count, real_estate_id, view_type_id, count_date) 
            VALUES (1, NEW.real_estate_id, NEW.view_type_id, CURRENT_DATE)
        ON CONFLICT (real_estate_id, is_active, count_date, view_type_id) WHERE (is_active) 
            DO UPDATE SET count = view_count.count + 1;

    RETURN NULL;
    END;

$day_view_count$ LANGUAGE plpgsql;



CREATE TRIGGER day_view_count 
    AFTER INSERT ON view_address 
    FOR EACH ROW EXECUTE PROCEDURE add_to_view_count();

CREATE OR REPLACE FUNCTION add_to_view_count_advertisement() RETURNS TRIGGER AS $day_view_count_of_advertisement$

    BEGIN
        INSERT INTO advertisement_view_count (count, advertisement_id, view_type_id)
            VALUES (1, NEW.advertisement_id, NEW.view_type_id)
        ON CONFLICT (advertisement_id, count_date, is_active, view_type_id) WHERE (is_active)
            DO UPDATE SET count = advertisement_view_count.count +1;
    
        RETURN NULL;
    END;
$day_view_count_of_advertisement$ LANGUAGE plpgsql;

CREATE TRIGGER day_view_count_of_advertisement
    AFTER INSERT ON view_address_advertisements
    FOR EACH ROW EXECUTE PROCEDURE add_to_view_count_advertisement();

CREATE OR REPLACE FUNCTION change_status_id() RETURNS TRIGGER AS $update_real_estate$

    BEGIN
        IF (NEW.status_id = 2 OR NEW.status_id = 4) THEN
            WITH updated AS (
                    UPDATE real_estates SET realesed_at = clock_timestamp() WHERE id = NEW.id 
                ), update_price AS (
                    UPDATE real_estate_prices SET is_active = false WHERE real_estate_id = NEW.id
                ), select_wish_count AS (
                    SELECT COUNT(*) AS count FROM user_wish_list WHERE real_estate_id = NEW.id
                ), insert_wish_count AS (
                    INSERT INTO real_estate_wish_list_count (real_estate_id, count) 
                        VALUES (NEW.id, (SELECT count FROM select_wish_count))
                ), update_view_count AS (
                    UPDATE view_count SET is_active = false WHERE real_estate_id = NEW.id
                ) DELETE FROM view_address WHERE real_estate_id = NEW.id;

                DELETE FROM user_wish_list WHERE real_estate_id = NEW.id;
        END IF;
        RETURN NULL;
    END;

$update_real_estate$ LANGUAGE plpgsql;

CREATE TRIGGER update_real_estate
    AFTER UPDATE ON real_estates
    FOR EACH ROW 
    WHEN (pg_trigger_depth()<1)
    EXECUTE PROCEDURE change_status_id();