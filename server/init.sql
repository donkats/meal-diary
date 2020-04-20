CREATE TABLE users (
ID SERIAL PRIMARY KEY, 
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password)
VALUES ('Don', 'secret');
