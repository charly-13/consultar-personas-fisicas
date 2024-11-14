-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 28-10-2024 a las 16:57:54
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `buroscan_personasfisicas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas_fisicas`
--

CREATE TABLE `personas_fisicas` (
  `idpersona` bigint(20) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `secondname` varchar(255) NOT NULL,
  `firstsurname` varchar(255) NOT NULL,
  `secondsurname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phonenumber` varchar(20) NOT NULL,
  `code` varchar(100) DEFAULT NULL,
  `datesending` datetime NOT NULL,
  `rolid` bigint(20) NOT NULL,
  `curp` varchar(250) NOT NULL,
  `rfc` varchar(100) NOT NULL,
  `street` varchar(255) NOT NULL,
  `outsidenumber` varchar(100) NOT NULL,
  `insidenumber` varchar(100) NOT NULL,
  `zipcode` varchar(255) NOT NULL,
  `cologne` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `delegation` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `datecreated` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Volcado de datos para la tabla `personas_fisicas`
--

INSERT INTO `personas_fisicas` (`idpersona`, `firstname`, `secondname`, `firstsurname`, `secondsurname`, `email`, `phonenumber`, `code`, `datesending`, `rolid`, `curp`, `rfc`, `street`, `outsidenumber`, `insidenumber`, `zipcode`, `cologne`, `state`, `delegation`, `city`, `datecreated`, `status`) VALUES
(198, 'Carlos', '', 'Cruz', 'Castañeda', 'ccruz@exitus.com', '5572227706', '38875', '2024-10-28 09:55:35', 1, 'CUCC970811HMCRSR09', 'CUCC970811269', 'Guerrero', 'S/N', 'S/N', '52444', 'San Simón el Alto', 'México', 'Malinalco', 'CDMX', '2024-10-28 09:55:07', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolburo`
--

CREATE TABLE `rolburo` (
  `idrol` bigint(20) NOT NULL,
  `nombrerol` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

--
-- Volcado de datos para la tabla `rolburo`
--

INSERT INTO `rolburo` (`idrol`, `nombrerol`, `descripcion`, `status`) VALUES
(1, 'Cliente Buro', 'Registros de Cliente Buro', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `personas_fisicas`
--
ALTER TABLE `personas_fisicas`
  ADD PRIMARY KEY (`idpersona`),
  ADD KEY `rolid` (`rolid`);

--
-- Indices de la tabla `rolburo`
--
ALTER TABLE `rolburo`
  ADD PRIMARY KEY (`idrol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `personas_fisicas`
--
ALTER TABLE `personas_fisicas`
  MODIFY `idpersona` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT de la tabla `rolburo`
--
ALTER TABLE `rolburo`
  MODIFY `idrol` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `personas_fisicas`
--
ALTER TABLE `personas_fisicas`
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`rolid`) REFERENCES `rolburo` (`idrol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
