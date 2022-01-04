DROP DATABASE IF EXISTS sharafyabi;

CREATE DATABASE sharafyabi;

\c sharafyabi;

CREATE TABLE languages(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    "language" CHARACTER VARYING(30) NOT NULL,
    language_code VARCHAR (5) NOT NULL,
    UNIQUE("language")
);

CREATE TABLE roles(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    role_name VARCHAR (100)
);

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    role_id SMALLINT NOT NULL,
    full_name VARCHAR (150) NOT NULL,
    email VARCHAR (100),
    "password" VARCHAR (250) NOT NULL,
    phone VARCHAR(8) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    UNIQUE(phone),

    CONSTRAINT role_id_fk FOREIGN KEY (role_id) REFERENCES roles(id) 
);

CREATE TABLE categories(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR (150) NOT NULL,
    destination VARCHAR(200), 
    ---main_category_id SMALLINT, ----nawerno nado budet ubrat yego tak kak on ne nuzhen

    CONSTRAINT main_category_id_fk FOREIGN KEY (main_category_id) REFERENCES categories(id)
);

CREATE TABLE category_translations(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    language_id SMALLINT NOT NULL,
    category_id SMALLINT NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT language_id_fk FOREIGN KEY (language_id) REFERENCES languages(id),
    CONSTRAINT category_id_fk FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE producers(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR (150) NOT NULL,
    destination VARCHAR(150)
);

CREATE TABLE products(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    -- unique_code VARCHAR(150) NOT NULL,
    category_id SMALLINT NOT NULL,
    producer_id SMALLINT NOT NULL,
    stock BIGINT NOT NULL,
    price NUMERIC(8,2) NOT NULL,
    destination VARCHAR (350),
   
    CONSTRAINT producer_id_fk FOREIGN KEY (producer_id) REFERENCES producers(id),
    CONSTRAINT category_id_fk FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_translations(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    product_id BIGINT NOT NULL,
    language_id SMALLINT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT language_id_fk FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE orders(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id SMALLINT,
    owner_phone VARCHAR(8) NOT NULL,
    delivery_address VARCHAR (150) NOT NULL,
    position point,
    order_notice VARCHAR(500) NOT NULL,

    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_products(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    product_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    quantity SMALLINT NOT NULL,
    price NUMERIC(8, 2) NOT NULL,

    CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE main_page_images(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    destination VARCHAR(150) NOT NULL
);

CREATE TABLE news(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    deleted BOOLEAN DEFAULT FALSE,
    image_destination VARCHAR(150)

);

CREATE TABLE news_descriptions(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    news_id INTEGER NOT NULL,
    language_id SMALLINT NOT NULL,
    title VARCHAR(150),
    article TEXT NOT NULL,

    CONSTRAINT news_id_fk FOREIGN KEY (news_id) REFERENCES news(id),
    CONSTRAINT language_id_fk FOREIGN KEY (language_id) REFERENCES languages(id)  
);


CREATE TABLE discount_types(
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(150) NOT NULL
);

CREATE TABLE discounts(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    discount_type_id SMALLINT NOT NULL,
    min_value INTEGER,
    discount_value INTEGER NOT NULL,
    coupon VARCHAR (150),
    product_id BIGINT,
    created_at TIMESTAMP WITHOUT TIME ZONE  NOT NULL DEFAULT now(),
    validity tsrange NOT NULL,

    CONSTRAINT discount_type_id_fk FOREIGN KEY (discount_type_id) REFERENCES discount_types(id),
    CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
);