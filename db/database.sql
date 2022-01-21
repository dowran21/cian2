DROP DATABASE IF EXISTS cian;

CREATE DATABASE cian;
 
\c cian;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

CREATE TABLE languages(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    "language" CHARACTER VARYING(30) NOT NULL,
    language_code VARCHAR (5) NOT NULL,
    UNIQUE("language")
);
-----------owner types-----------------

CREATE TABLE owners(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR (100) NOT NULL 
);

CREATE TABLE owner_type_translations(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    language_id SMALLINT NOT NULL,
    translation VARCHAR (100) NOT NULL,
    owner_id SMALLINT NOT NULL,

    CONSTRAINT owner_id_fk FOREIGN KEY (owner_id) REFERENCES owners(id) ON UPDATE CASCADE
);

------------users-----------

CREATE TABLE roles(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    role_name VARCHAR (100)
);

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    role_id SMALLINT NOT NULL,
    full_name VARCHAR (150) NOT NULL,
    email VARCHAR (100),
    phone VARCHAR(8) NOT NULL,
    max_count INTEGER,
    permission BOOLEAN DEFAULT FALSE,-------this one wasn't added to anywhere
    owner_id SMALLINT,
    "password" VARCHAR (300) NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    active BOOLEAN NOT NULL DEFAULT true, ---need to be added
    last_logged TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(phone) WHERE (deleted = false),

    CONSTRAINT owner_id_fk FOREIGN KEY (owner_id) REFERENCES owners(id),
    CONSTRAINT role_id_fk FOREIGN KEY (role_id) REFERENCES roles(id) 
); 
-- CREATE UNIQUE INDEX users_idfx ON users (phone) WHERE (deleted = false);

CREATE TABLE user_permissions(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    validity tsrange NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    user_id BIGINT NOT NULL,

    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE 
);

---------------locations----------------
CREATE TABLE locations(
    id SERIAL PRIMARY KEY NOT NULL,
    absolute_name VARCHAR(100) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    comment VARCHAR(150),
    main_location_id SMALLINT,
    UNIQUE(main_location_id, absolute_name),

    CONSTRAINT main_location_id_fk 
        FOREIGN KEY (main_location_id) REFERENCES locations(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE location_translations(
    id SERIAL PRIMARY KEY NOT NULL,
    translation VARCHAR (100) NOT NULL,
    language_id SMALLINT NOT NULL,
    location_id SMALLINT NOT NULL,
    UNIQUE(translation, language_id),

    CONSTRAINT location_id_fk 
        FOREIGN KEY (location_id) REFERENCES locations(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT language_id_fk 
        FOREIGN KEY (language_id) REFERENCES languages(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE operator_locations(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    location_id BIGINT NOT NULL,
    UNIQUE(user_id, location_id),

    CONSTRAINT location_id_fk FOREIGN KEY (location_id) REFERENCES locations(id) ON UPDATE CASCADE,
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
);

-----------ACCESS IP ADDRESS----------------
CREATE TABLE access_ip(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    ip_address VARCHAR(150) NOT NULL,
    user_id BIGINT NOT NULL,
    denied_count SMALLINT NOT NULL DEFAULT 0,
    validity tsrange,
    code NUMERIC(6),
    activated BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, ip_address),

    CONSTRAINT user_id_fk FOREIGN KEY (user_id)  REFERENCES users(id)
);

CREATE TABLE categories(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    absolute_name CHARACTER VARYING(30) NOT NULL
);

CREATE TABLE category_translations(
    "name"  CHARACTER VARYING(30) NOT NULL,
    language_id SMALLINT NOT NULL,
    category_id SMALLINT NOT NULL,
    UNIQUE(language_id, category_id),

    CONSTRAINT category_translations_language_id_fk 
        FOREIGN KEY(language_id) REFERENCES  languages(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT category_translations_category_id_fk 
        FOREIGN KEY(category_id) REFERENCES  categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE types(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    absolute_name CHARACTER VARYING(30) NOT NULL,
    main_type_id SMALLINT,
    CONSTRAINT main_type_id_fk 
        FOREIGN KEY (main_type_id) REFERENCES types(id)
);

CREATE TABLE type_translations(
    "name"  CHARACTER VARYING(30) NOT NULL,
    language_id SMALLINT NOT NULL,
    "type_id" SMALLINT NOT NULL,
    UNIQUE(language_id, "type_id"),
    
    CONSTRAINT type_translations_language_id_fk 
        FOREIGN KEY(language_id) REFERENCES  languages(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT type_translations_type_id_fk 
        FOREIGN KEY("type_id") REFERENCES  types(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE statuses(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    category_id SMALLINT NOT NULL,
    absolute_name CHARACTER VARYING(30) NOT NULL,
    CONSTRAINT status_category_id_fk 
        FOREIGN KEY(category_id) REFERENCES  categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ctypes(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    category_id SMALLINT NOT NULL,
    "type_id" SMALLINT NOT NULL,
    UNIQUE(category_id, "type_id"),
    CONSTRAINT ctype_category_id_fk 
        FOREIGN KEY(category_id) REFERENCES  categories(id) ON UPDATE CASCADE,
    CONSTRAINT ctype_type_id_fk 
        FOREIGN KEY("type_id") REFERENCES  types(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE specifications(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    absolute_name CHARACTER VARYING(100) NOT NULL,
    is_required BOOLEAN NOT NULL DEFAULT FALSE,
    is_multiple BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);
-- POTOLOK ULULYGY, ETAZY, UCHASTOK MEYDANY

CREATE TABLE specification_translations(
    "name"  CHARACTER VARYING(100) NOT NULL,
    language_id SMALLINT NOT NULL,
    spec_id SMALLINT NOT NULL,
    UNIQUE(language_id, spec_id),
    CONSTRAINT specification_translations_language_id_fk 
        FOREIGN KEY(language_id) REFERENCES  languages(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT specification_translations_spec_id_fk 
        FOREIGN KEY(spec_id) REFERENCES  specifications(id) ON UPDATE CASCADE ON DELETE CASCADE
);
--

CREATE TABLE type_specifications(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    "ctype_id" SMALLINT NOT NULL,
    spec_id SMALLINT NOT NULL,
    queue_position SMALLINT,
    deleted BOOLEAN DEFAULT FALSE,
    
    UNIQUE(spec_id, "ctype_id"),
    CONSTRAINT ctype_specification_spec_id_fk 
        FOREIGN KEY(spec_id) REFERENCES  specifications(id) ON UPDATE CASCADE,
    CONSTRAINT ctype_specification_type_id_fk 
        FOREIGN KEY("ctype_id") REFERENCES  ctypes(id) ON UPDATE CASCADE
);

CREATE TABLE specification_values(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    spec_id SMALLINT NOT NULL,
    "enable" BOOLEAN DEFAULT TRUE,
    absolute_value CHARACTER VARYING(100) NOT NULL,

    CONSTRAINT spec_id_fk 
        FOREIGN KEY (spec_id) REFERENCES specifications(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX specification_value_idx ON specification_values (spec_id);

CREATE TABLE specification_value_translations(
    "name"  CHARACTER VARYING(100) NOT NULL,
    language_id SMALLINT NOT NULL,
    spec_value_id SMALLINT NOT NULL,
    UNIQUE(language_id, spec_value_id),
    CONSTRAINT specification_value_translations_language_id_fk 
        FOREIGN KEY(language_id) REFERENCES  languages(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT specification_value_translations_spec_value_id_fk 
        FOREIGN KEY(spec_value_id) REFERENCES  specification_values(id) ON UPDATE CASCADE ON DELETE CASCADE
);



-------------Real Estates-------------
CREATE TABLE real_estates(
    id SERIAL PRIMARY KEY NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp(),
    realesed_at TIMESTAMP WITH TIME ZONE,
    user_id BIGINT NOT NULL,
    ctype_id SMALLINT NOT NULL,
    area NUMERIC(8,1) NOT NULL,
    position point,
    is_active BOOLEAN,
    selected BOOLEAN DEFAULT FALSE,
    selected_time tsrange,
    status_id SMALLINT NOT NULL,
    location_id SMALLINT NOT NULL,
    selected_vip BOOLEAN DEFAULT FALSE,

    CONSTRAINT location_id_fk 
        FOREIGN KEY(location_id) REFERENCES locations(id) ON UPDATE CASCADE,
    CONSTRAINT real_estate_ctype_id_fk 
        FOREIGN KEY(ctype_id) REFERENCES ctypes(id) ON UPDATE CASCADE,
    CONSTRAINT status_id_fk 
        FOREIGN KEY (status_id) REFERENCES statuses(id)
);
CREATE INDEX real_estate_ctype_idx ON real_estates (ctype_id);

CREATE TABLE real_estate_comments(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    real_estate_id BIGINT NOT NULL,
    comment VARCHAR(500),

    CONSTRAINT real_estate_id_fk FOREIGN KEY (real_estate_id) REFERENCES real_estates(id)
);

CREATE TABLE real_estate_prices(
    id SERIAL PRIMARY KEY NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp(),
    real_estate_id INTEGER NOT NULL,
    price INTEGER NOT NUll,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT real_estate_price_real_estate_id_fk 
        FOREIGN KEY(real_estate_id) REFERENCES  real_estates(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX real_estate_price_real_estate_idx ON real_estate_prices (real_estate_id);

CREATE TABLE real_estate_translations(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    "description"  CHARACTER VARYING(300) NOT NULL,
    language_id SMALLINT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    real_estate_id INTEGER NOT NULL,
    UNIQUE(language_id, real_estate_id),
    CONSTRAINT real_estate_translations_language_id_fk 
        FOREIGN KEY(language_id) REFERENCES  languages(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT real_estate_translations_real_estate_id_fk 
        FOREIGN KEY(real_estate_id) REFERENCES  real_estates(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE real_estate_images(
    id SERIAL PRIMARY KEY NOT NULL,
    real_estate_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    destination CHARACTER VARYING(300) NOT NULL,

    CONSTRAINT real_estate_image_real_estate_id_fk 
        FOREIGN KEY(real_estate_id) REFERENCES  real_estates(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX real_estate_image_idx ON real_estate_images (real_estate_id);

CREATE TABLE real_estate_specification_values(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    real_estate_id INTEGER NOT NULL,
    spec_value_id SMALLINT NOT NULL,
    spec_id  SMALLINT NOT NULL,
    UNIQUE(real_estate_id, spec_value_id),
    CONSTRAINT real_estate_specification_value_real_estate_id_fk 
        FOREIGN KEY(real_estate_id) REFERENCES  real_estates(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT value_spec_id_fk 
        FOREIGN KEY(spec_id) REFERENCES  specifications(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT real_estate_specification_value_spec_value_id_fk 
        FOREIGN KEY(spec_value_id) REFERENCES  specification_values(id) ON UPDATE CASCADE ON DELETE CASCADE
);

----------------VIP dates------------------
CREATE TABLE vip_types(
    id SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR (100) NOT NULL
);

CREATE TABLE vip_real_estates(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    vip_dates tsrange NOT NULL,
    real_estate_id SMALLINT NOT NULL,
    vip_type_id SMALLINT NOT NULL,
    EXCLUDE USING gist(vip_dates WITH &&, real_estate_id WITH =),

    CONSTRAINT real_estate_id_fk 
        FOREIGN KEY (real_estate_id) REFERENCES real_estates(id) ON UPDATE CASCADE,
    CONSTRAINT vip_type_id_fk 
        FOREIGN KEY (vip_type_id) REFERENCES vip_types(id) ON UPDATE CASCADE
);
----------VIEW COUNT-------------
CREATE TABLE view_type(
    id SMALLINT PRIMARY KEY NOT NULL,
    absolute_name VARCHAR (30) NOT NULL 
);

CREATE TABLE view_address(
    ip_address VARCHAR (50) NOT NULL,
    real_estate_id SMALLINT NOT NULL,
    view_type_id SMALLINT NOT NULL,
    UNIQUE(ip_address, real_estate_id, view_type_id),

    CONSTRAINT view_type_id_fk FOREIGN KEY (view_type_id) REFERENCES view_type(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT real_estate_id_fk FOREIGN KEY (real_estate_id) REFERENCES real_estates(id) ON DELETE CASCADE ON UPDATE CASCADE  
);


CREATE TABLE view_count(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    count_date DATE NOT NULL DEFAULT CURRENT_DATE, 
    count SMALLINT NOT NULL,
    real_estate_id SMALLINT NOT NULL,
    view_type_id SMALLINT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    CONSTRAINT view_type_id_fk FOREIGN KEY (view_type_id) REFERENCES view_type(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT real_estate_id_fk FOREIGN KEY (real_estate_id) REFERENCES real_estates(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX ON view_count(real_estate_id, count_date, is_active, view_type_id) WHERE (is_active);

-----------------images for websites-------
CREATE TABLE image_places(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    place VARCHAR(50)
);

CREATE TABLE place_images(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    image_place_id SMALLINT NOT NULL,
    destination VARCHAR(150) NOT NULL,

    CONSTRAINT image_place_id_fk FOREIGN KEY (image_place_id) REFERENCES image_places(id) 
);

------------------image for type -------------
CREATE TABLE ctype_image(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    ctype_id SMALLINT NOT NULL,
    destination VARCHAR(150) NOT NULL,
    UNIQUE(ctype_id),

    CONSTRAINT type_id_fk FOREIGN KEY (ctype_id) REFERENCES ctypes(id)
);

CREATE TABLE user_wish_list(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    real_estate_id BIGINT NOT NULL,
    UNIQUE (user_id, real_estate_id),

    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    CONSTRAINT real_estate_id_fk FOREIGN KEY (real_estate_id) REFERENCES real_estates(id) ON UPDATE CASCADE
);

------------push notifications------------
CREATE TABLE pushes(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    type_id SMALLINT,
    category_id SMALLINT,
    min_price BIGINT,
    max_price BIGINT,
    min_area BIGINT,
    max_area BIGINT,
    message_tm VARCHAR (300),
    message_ru VARCHAR (300),   
    
    CONSTRAINT type_id_fk FOREIGN KEY (type_id) REFERENCES types(id),
    CONSTRAINT category_id_fk FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE push_messages(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    is_sent BOOLEAN NOT NULL DEFAULT FALSE,
    push_id BIGINT NOT NULL,

    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    CONSTRAINT push_id_fk FOREIGN KEY (push_id) REFERENCES pushes(id) ON UPDATE CASCADE
);

CREATE TABLE real_estate_notifies(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    real_estate_id BIGINT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),

    CONSTRAINT real_estate_id_fk FOREIGN KEY (real_estate_id) REFERENCES real_estates(id)
);

-------------------logs-------------------
CREATE TABLE event_types(
    id SMALLINT NOT NULL PRIMARY KEY,
    event_type CHARACTER VARYING(50) NOT NULL
);


CREATE TABLE tables(
    id SMALLINT NOT NULL PRIMARY KEY,
    "name" CHARACTER VARYING(30) NOT NULL
);


CREATE TABLE logs(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    log_time TIMESTAMP WITH TIME ZONE DEFAULT clock_timestamp(),
    "user_id" INTEGER,
    event_type_id SMALLINT,
    table_id SMALLINT,
    "data" jsonb,
    
    CONSTRAINT event_type_id_fk 
        FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON UPDATE CASCADE ON DELETE SET null,
    CONSTRAINT table_id_fk 
        FOREIGN KEY (table_id) REFERENCES tables(id) ON UPDATE CASCADE ON DELETE SET null
);


CREATE TABLE front_translations (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    language_id SMALLINT NOT NULL,
    translations VARCHAR (500) NOT NULL,

    CONSTRAINT language_id_fk FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE complaints (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    "message" VARCHAR (250) NOT NULL,
    real_estate_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    accepted BOOLEAN DEFAULT FALSE,

    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
    CONSTRAINT real_estate_id_fk FOREIGN KEY (real_estate_id) REFERENCES real_estates(id) ON UPDATE CASCADE
);

CREATE TABLE sql_injections (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    ip_address VARCHAR(150) NOT NULL,
    "text" VARCHAR(150) NOT NULL,
    phone VARCHAR (8) NOT NULL,
    "password" VARCHAR (250) NOT NULL,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE activation_comment(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id BIGINT NOT NULL,
    comment VARCHAR (300) NOT NULL,
    
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE 
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dowran;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dowran;