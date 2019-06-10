-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2019 a las 19:06:24
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inmovillage`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmobiliarias`
--

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

--
-- Volcado de datos para la tabla `inmobiliarias`
--

INSERT INTO `inmobiliarias` (`Id`, `Usuario`, `Contraseña`, `Nombre`, `Direccion`, `Telefono`, `Localidad`, `FechaAlta`, `FechaBaja`, `Activo`) VALUES
(1, 'jeremias', 'hola123', 'InmoJere', 'Pavon 428', '336-4664929', 'San Nicolás', NULL, NULL, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inmobiliarias`
--
ALTER TABLE `inmobiliarias`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inmobiliarias`
--
ALTER TABLE `inmobiliarias`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
