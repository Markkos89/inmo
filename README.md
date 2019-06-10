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
