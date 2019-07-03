CREATE TABLE `inmobiliarias` (
  `Id` int(11) NOT NULL,
  `Usuario` varchar(20) NOT NULL,
  `Contraseña` varchar(20) NOT NULL,
  `Nombre` varchar(60) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Telefono` varchar(50) NOT NULL,
  `Localidad` varchar(100) NOT NULL,
  `FechaAlta` datetime DEFAULT NULL,
  `FechaBaja` datetime DEFAULT NULL,
  `Activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `inmobiliarias` (`Id`, `Usuario`, `Contraseña`, `Nombre`, `Direccion`, `Telefono`, `Localidad`, `FechaAlta`, `FechaBaja`, `Activo`) VALUES
(1, 'jeremias', 'hola123', 'InmoJere', 'Pavon 428', '336-4664929', 'San Nicolás', NULL, NULL, 1);

ALTER TABLE `inmobiliarias`
  ADD PRIMARY KEY (`Id`);
  
ALTER TABLE `inmobiliarias`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

RENAME TABLE inmo.inmobiliarias TO inmo.usuarios;

-- tablas

- post
. titulo
. descripcion_corta
. descripcion_larga
. precio
. fecha_creacion

CREATE TABLE inmo.posts (
	id INT NOT NULL auto_increment primary key,
	titulo varchar(100) NULL,
	descripcion varchar(500) NULL,
	descripcion_corta varchar(100) NULL,
	precio INT NOT NULL,
	fecha_creacion DATETIME NOT NULL	
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

- fotos_x_post
. id_post_fk
. path

CREATE TABLE inmo.fotos_x_posts (
	id INT NOT NULL auto_increment primary key,
	id_post_fk  INT null ,
	path varchar(500) null,
	foreign key(id_post_fk) references posts(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


- inmobiliarias
. nombre
. contacto
. celular
. mail

CREATE TABLE inmo.inmobiliarias (
	id INT NOT NULL auto_increment primary key,
	nombre  VARCHAR(100) null ,
	contacto varchar(100) null,
	celular char(15),
	mail char(50)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


- usuarios
. nombre
. clave
. mail
. celular
