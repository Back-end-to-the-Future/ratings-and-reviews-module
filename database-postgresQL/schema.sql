DROP TABLE IF EXISTS reviews,
photos,
characteristics,
characteristics_reviews CASCADE;

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating SMALLINT,
  summary VARCHAR,
  recommend BOOLEAN,
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
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES reviews,
  name VARCHAR
);

CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews,
  characteristics_id INTEGER REFERENCES characteristics,
  rating SMALLINT
);