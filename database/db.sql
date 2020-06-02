CREATE DATABASE materias_db;

USE materias_db;

-- USERS TABLE --
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

-- MATERIAS TABLE --
CREATE TABLE materias(
    id INT(11) NOT NULL,
    materia VARCHAR(50) NOT NULL,
    creditos INT(2) NOT NULL,
    semestre INT(1) NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE materias
    ADD PRIMARY KEY (id);

ALTER TABLE materias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE materias;