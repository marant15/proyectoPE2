-- Creamos la tabla si esta no existe
CREATE DATABASE IF NOT EXISTS PE2;

-- Indicamos que trabajaremos sobre la tabla 
-- recien creada
USE PE2;

-- Declaramos las tablas de nuestra DB
CREATE TABLE profesor (
profesorID INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
fechaContratacion datetime,
nombre VARCHAR(100) NOT NULL,
apellidoP VARCHAR(100),
apellidoM VARCHAR (100)
);

CREATE TABLE grupo (
grupoID INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL
);

CREATE TABLE materia (
materiaID INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL
);

CREATE TABLE asignacion (
asignacionID INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
profesorID INTEGER UNSIGNED NOT NULL,
grupoID INTEGER UNSIGNED NOT NULL,
materiaID INTEGER UNSIGNED NOT NULL,
fechaInicio DATE NOT NULL,
fechaFin DATE NOT NULL,
horaInicio TIME NOT NULL,
horaFin TIME NOT NULL,
FOREIGN KEY (profesorID) REFERENCES profesor(profesorID),
FOREIGN KEY (grupoID) REFERENCES grupo(grupoID),
FOREIGN KEY (materiaID) REFERENCES materia(materiaID)
);

CREATE TABLE registro (
registroID INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
asignacionID INTEGER UNSIGNED NOT NULL,
fechaRegistro DATETIME NOT NULL,
FOREIGN KEY (asignacionID) REFERENCES asignacion(asignacionID)
);

CREATE TABLE excepcion (
excepcionID INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
asignacionID INTEGER UNSIGNED NOT NULL,
fechaExcepcion DATETIME NOT NULL,
profesorID INTEGER UNSIGNED NOT NULL,
tipo VARCHAR(2) NOT NULL,
FOREIGN KEY (asignacionID) REFERENCES asignacion(asignacionID)
);