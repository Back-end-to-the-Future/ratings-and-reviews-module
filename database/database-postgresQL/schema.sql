DROP TABLE IF EXISTS reviews,
photos,
characteristics CASCADE;

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating SMALLINT,
  summary VARCHAR,
  recommend SMALLINT,
  response VARCHAR,
  body VARCHAR,
  date TIMESTAMP WITH TIME ZONE,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  helpfulness INTEGER,
  reported BOOLEAN
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews,
  url VARCHAR
);

CREATE TABLE characteristics (
  characteristics_id BIGINT PRIMARY KEY,
  product_id INTEGER REFERENCES reviews,
  name VARCHAR,
  value VARCHAR
);