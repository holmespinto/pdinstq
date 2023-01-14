-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 13-01-2023 a las 21:26:32
-- Versión del servidor: 10.5.18-MariaDB-cll-lve
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `compucel_api`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrum_calendario`
--

CREATE TABLE `instrum_calendario` (
  `id` int(11) NOT NULL,
  `IdCategorias` varchar(2) NOT NULL DEFAULT '',
  `idCategoria` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `start` text NOT NULL,
  `end` text NOT NULL,
  `className` text NOT NULL,
  `asignar` varchar(3) NOT NULL DEFAULT '',
  `estado` varchar(3) NOT NULL DEFAULT '',
  `idUser` varchar(5) NOT NULL DEFAULT '',
  `status` varchar(15) NOT NULL,
  `maj` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `instrum_calendario`
--

INSERT INTO `instrum_calendario` (`id`, `IdCategorias`, `idCategoria`, `title`, `start`, `end`, `className`, `asignar`, `estado`, `idUser`, `status`, `maj`) VALUES
(1, '2', '3,5,4,', 'Bandeja,Cubeta,Coca,', 'Thu Jan 12 2023 14:00:00 GMT-0500 (hora estándar de Colombia)', 'Thu Jan 12 2023 16:00:00 GMT-0500 (hora estándar de Colombia)', 'bg-success', '1', '1', '1', 'Active', '2023-01-12 21:58:13'),
(2, '1', '4,', 'CANASTA DE LAPAROTOMIA INFANTIL REFERENCIA 004,', 'Thu Jan 12 2023 07:00:00 GMT-0500 (hora estándar de Colombia)', 'Thu Jan 12 2023 09:00:00 GMT-0500 (hora estándar de Colombia)', 'bg-success', '2', '1', '1', 'Active', '2023-01-12 22:24:09'),
(3, '2', '3,5,4,', 'Bandeja,Cubeta,Coca,', 'Thu Jan 12 2023 09:30:00 GMT-0500 (hora estándar de Colombia)', 'Thu Jan 12 2023 11:30:00 GMT-0500 (hora estándar de Colombia)', 'bg-info', '2', '2', '1', 'Active', '2023-01-13 00:58:21'),
(4, '3', '896,2,', 'Tela,Desechables,', 'Thu Jan 12 2023 18:00:00 GMT-0500 (hora estándar de Colombia)', 'Thu Jan 12 2023 20:00:00 GMT-0500 (hora estándar de Colombia)', 'bg-success', '2', '1', '2', 'Active', '2023-01-13 01:25:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrum_categorias`
--

CREATE TABLE `instrum_categorias` (
  `IdCategorias` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `inventario` int(11) NOT NULL,
  `reservado` int(11) NOT NULL,
  `status` varchar(15) NOT NULL,
  `maj` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `instrum_categorias`
--

INSERT INTO `instrum_categorias` (`IdCategorias`, `title`, `description`, `inventario`, `reservado`, `status`, `maj`) VALUES
(1, 'CANASTAS', 'Canastas', 0, 1, 'Active', '2023-01-06 23:39:05'),
(2, 'ELEMENTOS METALICOS', 'Elementos Metalicos', 0, 0, 'Active', '2023-01-06 23:41:07'),
(3, 'PAQUETES DE ROPA', 'Paquetes de ropa', 0, 0, 'Active', '2023-01-06 23:41:39'),
(4, 'ROPA QUIRURGICA ACCESORIA', 'ROPA QUIRURGICA ACCESORIA', 0, 0, 'Active', '2023-01-06 23:42:25'),
(5, 'ELEMENTOS DE CURACION', 'ROPA QUIRURGICA ACCESORIA2', 0, 1, 'Active', '2023-01-07 00:28:39'),
(6, 'INSUMOS', 'ELEMENTOS DE CURACION', 0, 0, 'Active', '2023-01-07 00:36:46'),
(7, 'HOJA DE BISTURI', 'INSUMOS', 0, 2, 'Active', '2023-01-07 00:58:40'),
(8, 'SUTURA ABSORBIBLE', 'HOJA DE BISTURI', 1, 0, 'Active', '2023-01-07 00:59:05'),
(9, 'CALIBRE SUTURA ABS   AGUJA', 'CALIBRE SUTURA ABS   AGUJA', 0, 0, 'Active', '2023-01-07 01:09:39'),
(10, 'SUTURA NO ABSORBIBLE', 'SUTURA NO ABSORBIBLE', 0, 0, 'Active', '2023-01-07 01:10:05'),
(11, 'CALIBRE SUTURA NO ABS   AGUJA', 'CALIBRE SUTURA NO ABS   AGUJA', 0, 0, 'Active', '2023-01-07 01:10:24'),
(12, 'LIQUIDOS', 'LIQUIDOS', 0, 0, 'Active', '2023-01-07 01:10:44'),
(13, 'MEDICAMENTOS', 'MEDICAMENTOS', 0, 0, 'Active', '2023-01-07 01:10:59'),
(14, 'JERINGA', 'JERINGA', 0, 0, 'Active', '2023-01-07 01:11:17'),
(15, 'AGUJA  HIPODERMICA', 'AGUJA  HIPODERMICA', 0, 0, 'Active', '2023-01-07 01:11:37'),
(16, 'CATETER VENOSO PERIFERICO Ó YELCO', 'CATETER VENOSO PERIFERICO Ó YELCO', 0, 0, 'Active', '2023-01-07 01:11:53'),
(17, 'GUANTE', 'GUANTE', 0, 0, 'Active', '2023-01-07 01:12:19'),
(18, 'EQUIPO BIOMEDICO', 'EQUIPO BIOMEDICO', 0, 0, 'Active', '2023-01-07 01:12:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrum_instrumentos`
--

CREATE TABLE `instrum_instrumentos` (
  `id` int(11) NOT NULL,
  `idReferencia` int(11) NOT NULL,
  `idCategorias` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `inventario` int(11) NOT NULL,
  `reservado` int(11) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `status` varchar(15) NOT NULL,
  `maj` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `instrum_instrumentos`
--

INSERT INTO `instrum_instrumentos` (`id`, `idReferencia`, `idCategorias`, `title`, `description`, `inventario`, `reservado`, `tipo`, `status`, `maj`) VALUES
(2, 3, 1, 'Desechables ', 'Desechables ', 1, 0, '1', 'Active', '2023-01-09 14:58:44'),
(3, 2, 1, 'Bandeja', 'Bandeja', 1, 1, '1', 'Active', '2023-01-09 14:59:42'),
(4, 2, 1, 'Coca', 'Coca', 1, 0, '1', 'Active', '2023-01-09 15:00:02'),
(5, 2, 1, 'Cubeta', 'Cubeta', 1, 1, '1', 'Active', '2023-01-09 15:00:18'),
(7, 2, 1, 'Riñonera', 'Riñonera', 1, 0, '1', 'Active', '2023-01-09 15:00:37'),
(8, 4, 1, 'Bata cirujano ', 'Bata cirujano ', 1, 0, '1', 'Active', '2023-01-09 15:02:14'),
(9, 4, 1, 'Campo abierto ', 'Campo abierto ', 1, 0, '1', 'Active', '2023-01-09 15:02:38'),
(10, 4, 1, 'Campo cerrado ', 'Campo cerrado ', 1, 0, '1', 'Active', '2023-01-09 15:02:57'),
(11, 4, 1, 'Campo de ojo', 'Campo de ojo', 1, 0, '1', 'Active', '2023-01-09 15:03:14'),
(12, 4, 1, 'Campo fenestrado ', 'Campo fenestrado ', 1, 0, '1', 'Active', '2023-01-09 15:03:37'),
(14, 4, 1, 'Funda de Mayo', 'Funda de Mayo ', 1, 0, '1', 'Active', '2023-01-09 15:04:29'),
(15, 4, 1, 'Sábana', 'Sábana', 1, 0, '1', 'Active', '2023-01-09 15:05:22'),
(16, 1, 2, 'Bandeja metálica 39,5 x 30 cm', 'Bandeja metálica 39,5 x 30 cm', 1, 0, '2', '', '2023-01-12 17:17:01'),
(17, 1, 2, 'Riñonera en acero inoxidable', 'Riñonera en acero inoxidable', 1, 0, '2', 'Active', '2023-01-09 15:14:03'),
(19, 1, 2, 'Separadores de Deaver', 'Separadores de Deaver', 2, 0, '2', 'Active', '2023-01-09 15:14:59'),
(20, 1, 2, 'Separadores de Farabeauf', 'Separadores de Farabeauf', 2, 0, '2', 'Active', '2023-01-12 17:51:13'),
(21, 1, 2, 'Separadores de Balfour con valvas x 180 mm', 'Separadores de Balfour con valvas x 180 mm', 1, 0, '2', 'Active', '2023-01-09 15:15:56'),
(25, 5, 1, 'Aposito ', 'Aposito', 1, 0, '1', 'Active', '2023-01-09 15:25:11'),
(27, 5, 1, 'Cotonoides', 'Cotonoides', 1, 0, '1', 'Active', '2023-01-09 15:25:54'),
(28, 5, 1, 'Gasas', 'Gasas', 1, 0, '1', 'Active', '2023-01-09 15:26:08'),
(29, 5, 1, 'Maní ', 'Maní', 1, 0, '1', 'Active', '2023-01-09 15:26:34'),
(30, 2, 2, 'Bandeja metálica ', 'Bandeja metálica ', 1, 0, '2', 'Active', '2023-01-09 15:26:43'),
(31, 5, 1, 'Mecha de columna ', 'Mecha de columna ', 1, 0, '1', 'Active', '2023-01-09 15:26:57'),
(32, 2, 2, 'Riñonera en acero inoxidable', 'Riñonera en acero inoxidable', 1, 0, '2', 'Active', '2023-01-09 15:27:14'),
(34, 5, 1, 'Mecha vaginal', 'Mecha vaginal', 1, 0, '1', 'Active', '2023-01-09 15:27:22'),
(35, 2, 2, 'Separadores de Deaver', 'Separadores de Deaver', 2, 0, '2', 'Active', '2023-01-09 15:27:46'),
(37, 5, 1, 'Venda de algodón 4x5', 'Venda de algodón 4x5', 1, 0, '1', 'Active', '2023-01-09 15:27:52'),
(38, 2, 2, 'Separadores de Farabeauf', 'Separadores de Farabeauf', 2, 0, '2', 'Active', '2023-01-09 15:28:16'),
(39, 5, 1, 'Venda de algodón 5x5', 'Venda de algodón 5x5', 1, 0, '1', 'Active', '2023-01-09 15:28:18'),
(40, 5, 1, 'Venda de algodón 6x5', 'Venda de algodón 6x5', 1, 0, '1', 'Active', '2023-01-09 15:28:45'),
(42, 2, 2, 'Separadores de Balfour con valvas x 180 mm', 'Separadores de Balfour con valvas x 180 mm', 1, 0, '2', 'Active', '2023-01-09 15:29:15'),
(43, 5, 1, 'Venda elástica 4x5 ', 'Venda elástica 4x5 ', 1, 0, '1', 'Active', '2023-01-09 15:29:18'),
(45, 5, 1, 'Venda elástica 5x5 ', 'Venda elástica 5x5 ', 1, 0, '1', 'Active', '2023-01-09 15:29:43'),
(48, 5, 1, 'Venda elástica 6x5', 'Venda elástica 6x5', 1, 0, '1', 'Active', '2023-01-09 15:30:12'),
(52, 3, 2, 'Bandeja metálica 30 x 19,5 cm', 'Bandeja metálica 30 x 19,5 cm', 1, 0, '2', 'Active', '2023-01-09 15:39:48'),
(54, 3, 2, 'Separadores de Farabeauf', 'Separadores de Farabeauf', 2, 0, '2', 'Active', '2023-01-09 15:40:10'),
(56, 3, 2, 'Separadores de sen miller', 'Separadores de sen miller', 2, 0, '2', 'Active', '2023-01-09 15:40:35'),
(58, 3, 2, 'Pinzas de campo x 11 cm ( 4 backhaus y 1 de Jones)', 'Pinzas de campo x 11 cm ( 4 backhaus y 1 de Jones)', 4, 0, '2', 'Active', '2023-01-09 15:41:02'),
(63, 3, 2, 'Mango de bisturí N° 3', 'Mango de bisturí N° 3', 1, 0, '2', 'Active', '2023-01-09 15:42:36'),
(67, 3, 2, 'Mango de bisturí N° 4', 'Mango de bisturí N° 4', 1, 0, '2', 'Active', '2023-01-09 15:43:12'),
(69, 3, 2, 'Sonda acanalada', 'Sonda acanalada', 1, 0, '2', 'Active', '2023-01-09 15:44:08'),
(71, 3, 2, 'Tijera de metzembaut curva fina', 'Tijera de metzembaut curva fina', 1, 0, '2', 'Active', '2023-01-09 15:44:31'),
(73, 3, 2, 'Tijera de mayo curva x 14 cm', 'Tijera de mayo curva x 14 cm', 1, 0, '2', 'Active', '2023-01-09 15:44:56'),
(75, 3, 2, 'Pinza disección rusa', 'Pinza disección rusa', 1, 0, '2', 'Active', '2023-01-09 15:45:23'),
(77, 3, 2, 'Pinza disección con garra', 'Pinza disección con garra', 1, 0, '2', 'Active', '2023-01-09 15:45:56'),
(79, 3, 2, 'Pinza disección sin garra', 'Pinza disección sin garra', 1, 0, '2', 'Active', '2023-01-09 15:46:19'),
(81, 3, 2, 'Pinza disección adson con garra', 'Pinza disección adson con garra', 1, 0, '2', 'Active', '2023-01-09 15:46:51'),
(83, 3, 2, 'Pinza disección adson sin garra', 'Pinza disección adson sin garra', 1, 0, '2', 'Active', '2023-01-09 15:47:12'),
(85, 3, 2, 'Cánula de Frazier N° 8 con mandril', 'Cánula de Frazier N° 8 con mandril', 1, 0, '2', 'Active', '2023-01-09 15:48:04'),
(87, 3, 2, 'Cánula de Yankauer', 'Cánula de Yankauer', 1, 0, '2', 'Active', '2023-01-09 15:48:21'),
(89, 3, 2, 'Pinza mosquito curva ', 'Pinza mosquito curva ', 3, 0, '2', 'Active', '2023-01-09 15:48:42'),
(91, 3, 2, 'Pinza mosquito recta', 'Pinza mosquito recta', 3, 0, '2', 'Active', '2023-01-09 15:49:01'),
(93, 3, 2, 'Pinza Kelly curva', 'Pinza Kelly curva', 3, 0, '2', 'Active', '2023-01-09 15:50:43'),
(95, 3, 2, 'Pinza Kocher curva', 'Pinza Kocher curva', 2, 0, '2', 'Active', '2023-01-09 15:51:06'),
(97, 3, 2, 'Pinza Kocher recta', 'Pinza Kocher recta', 2, 0, '2', 'Active', '2023-01-09 15:51:29'),
(99, 3, 2, 'Pinza allix ', 'Pinza allix ', 1, 0, '2', 'Active', '2023-01-09 15:52:09'),
(101, 3, 2, 'Pinza babcock x 18  cm', 'Pinza babcock x 18  cm', 1, 0, '2', 'Active', '2023-01-09 15:52:36'),
(103, 3, 2, 'Pinza Foaster (1 curva x 18 cm y 1 recya x 24 cm)', 'Pinza Foaster (1 curva x 18 cm y 1 recya x 24 cm)', 1, 0, '2', 'Active', '2023-01-09 15:53:04'),
(105, 3, 2, 'Porta agujas aro dorado Bakey x 16 cm', 'Porta agujas aro dorado Bakey x 16 cm', 1, 0, '2', 'Active', '2023-01-09 15:53:38'),
(107, 3, 2, 'Porta agujas x 18 cm', 'Porta agujas x 18 cm', 1, 0, '2', 'Active', '2023-01-09 15:54:03'),
(109, 2, 2, 'Mango de bisturí N° 4', 'Mango de bisturí N° 4', 1, 0, '2', 'Active', '2023-01-09 15:55:09'),
(111, 2, 2, 'Mango de bisturí N° 7', 'Mango de bisturí N° 7', 1, 0, '2', 'Active', '2023-01-09 15:55:45'),
(113, 2, 2, 'Tijera de metzembaut curva x 18 mm', 'Tijera de metzembaut curva x 18 mm', 1, 0, '2', 'Active', '2023-01-09 15:56:06'),
(115, 2, 2, 'Tijera de mayo recta x 15 cm', 'Tijera de mayo recta x 15 cm', 1, 0, '2', 'Active', '2023-01-09 15:56:24'),
(117, 2, 2, 'Pinza disección rusa', 'Pinza disección rusa', 1, 0, '2', 'Active', '2023-01-09 15:58:00'),
(123, 2, 2, 'Pinza disección con garra', 'Pinza disección con garra', 1, 0, '2', 'Active', '2023-01-09 15:58:33'),
(127, 2, 2, 'Pinza disección sin garra', 'Pinza disección sin garra', 1, 0, '2', 'Active', '2023-01-09 15:59:11'),
(129, 2, 2, 'Cánula de Frazier N° 8 con mandril', 'Cánula de Frazier N° 8 con mandril', 1, 0, '2', 'Active', '2023-01-09 15:59:47'),
(131, 2, 2, 'Cánula de Yankauer', 'Cánula de Yankauer', 1, 0, '2', 'Active', '2023-01-09 16:00:08'),
(135, 2, 2, 'Pinzas de campo x 11 cm ( 4 backhaus y 1 de Jones)', 'Pinzas de campo x 11 cm ( 4 backhaus y 1 de Jones)', 5, 0, '2', 'Active', '2023-01-09 16:00:35'),
(137, 2, 2, 'Pinza mosquito curva x 12.5 cm', 'Pinza mosquito curva x 12.5 cm', 3, 0, '2', 'Active', '2023-01-09 16:00:57'),
(139, 2, 2, 'Pinza Kelly curva', 'Pinza Kelly curva', 4, 0, '2', 'Active', '2023-01-09 16:01:16'),
(141, 2, 2, 'Pinza Kelly recta', 'Pinza Kelly recta', 2, 0, '2', 'Active', '2023-01-09 16:01:41'),
(144, 2, 2, 'Pinza Kelly adson curva (cístico)', 'Pinza Kelly adson curva (cístico)', 2, 0, '2', 'Active', '2023-01-09 16:03:24'),
(147, 2, 2, 'Pinza Kelly adson recta', 'Pinza Kelly adson recta', 2, 0, '2', 'Active', '2023-01-09 16:03:46'),
(148, 6, 1, 'CAUCHO DE SUCCIÓN ', 'CAUCHO DE SUCCIÓN ', 1, 0, '1', 'Active', '2023-01-09 16:03:49'),
(149, 2, 2, 'Pinza rochester curva', 'Pinza rochester curva', 2, 0, '2', 'Active', '2023-01-09 16:04:07'),
(151, 6, 1, 'Caucho de succión ', 'Caucho de succión ', 0, 0, '1', 'Active', '2023-01-09 16:04:54'),
(152, 2, 2, 'Pinza rochester recta', 'Pinza rochester recta', 2, 0, '2', 'Active', '2023-01-09 16:05:23'),
(154, 6, 1, 'Compresas ', 'Compresas ', 1, 0, '1', 'Active', '2023-01-09 16:05:24'),
(155, 2, 2, 'Pinza kocher recta', 'Pinza kocher recta', 2, 0, '2', 'Active', '2023-01-09 16:05:41'),
(158, 2, 2, 'Pinza allix jud x 19 cm', 'Pinza allix jud x 19 cm', 1, 0, '2', 'Active', '2023-01-09 16:06:11'),
(160, 6, 1, 'Dren de blake ', 'Dren de blake ', 1, 0, '1', 'Active', '2023-01-09 16:06:21'),
(162, 2, 2, 'Pinza babcock 16  cm', 'Pinza babcock 16  cm', 2, 0, '2', 'Active', '2023-01-09 16:06:33'),
(164, 6, 1, 'Dren de pen rose ', 'Dren de pen rose ', 1, 0, '1', 'Active', '2023-01-09 16:06:54'),
(165, 2, 2, 'Pinza Cístico (Mixter) Largas', 'Pinza Cístico (Mixter) Largas', 1, 0, '2', 'Active', '2023-01-09 16:06:58'),
(167, 2, 2, 'Pinza Penintong x 15.5 cm', 'Pinza Penintong x 15.5 cm', 2, 0, '2', 'Active', '2023-01-09 16:07:21'),
(169, 6, 1, 'Hemovac', 'Hemovac', 1, 0, '1', 'Active', '2023-01-09 16:07:27'),
(171, 2, 2, 'Pinza Duval  x 20 cm', 'Pinza Duval  x 20 cm', 2, 0, '2', 'Active', '2023-01-09 16:07:45'),
(173, 6, 1, 'Jackson pratt ', 'Jackson pratt ', 1, 0, '1', 'Active', '2023-01-09 16:08:09'),
(175, 2, 2, 'Pinza Foaster (1 curva x 18 cm y 1 recya x 24 cm)', 'Pinza Foaster (1 curva x 18 cm y 1 recya x 24 cm)', 2, 0, '2', 'Active', '2023-01-09 16:08:13'),
(177, 2, 2, 'Porta agujas aro dorado Bakey x 16 cm', 'Porta agujas aro dorado Bakey x 16 cm', 1, 0, '2', 'Active', '2023-01-09 16:08:40'),
(179, 6, 1, 'Kit de colostomia ', 'Kit de colostomia ', 1, 0, '1', 'Active', '2023-01-09 16:08:57'),
(180, 2, 2, 'Porta agujas x 21 cm curvo', 'Porta agujas x 21 cm curvo', 1, 0, '2', 'Active', '2023-01-09 16:09:03'),
(183, 2, 2, 'Porta agujas x 18 cm', 'Porta agujas x 18 cm', 1, 0, '2', 'Active', '2023-01-09 16:09:24'),
(185, 6, 1, 'Lápiz de electrocauterio', 'Lápiz de electrocauterio', 1, 0, '1', 'Active', '2023-01-09 16:09:39'),
(186, 2, 2, 'Porta agujas  x 13 cm', 'Porta agujas  x 13 cm', 1, 0, '2', 'Active', '2023-01-09 16:09:57'),
(188, 6, 1, 'Pleurovac', 'Pleurovac', 1, 0, '1', 'Active', '2023-01-09 16:10:12'),
(189, 6, 1, 'Sistema de drenaje ', 'Sistema de drenaje ', 1, 0, '1', 'Active', '2023-01-09 16:10:36'),
(190, 6, 1, 'Tema de presión negativa ', 'Tema de presión negativa ', 1, 0, '1', 'Active', '2023-01-09 16:11:03'),
(191, 1, 2, 'Mango de bisturí N° 4', 'Mango de bisturí N° 4', 1, 0, '2', 'Active', '2023-01-09 16:11:08'),
(193, 6, 1, 'Sonda de foley', 'Sonda de foley', 1, 0, '1', 'Active', '2023-01-09 16:11:29'),
(194, 1, 2, 'Mango de bisturí N° 7', 'Mango de bisturí N° 7', 1, 0, '2', 'Active', '2023-01-09 16:11:46'),
(196, 6, 1, 'Sonda de levin ', 'Sonda de levin ', 1, 0, '1', 'Active', '2023-01-09 16:11:56'),
(197, 1, 2, 'Tijera de metzembaut curva x 18 mm', 'Tijera de metzembaut curva x 18 mm', 1, 0, '2', 'Active', '2023-01-09 16:12:03'),
(199, 1, 2, 'Tijera de mayo recta x 15 cm', 'Tijera de mayo recta x 15 cm', 1, 0, '2', 'Active', '2023-01-09 16:12:18'),
(201, 6, 1, 'Sonda de nelaton ', 'Sonda de nelaton ', 1, 0, '1', 'Active', '2023-01-09 16:12:26'),
(202, 1, 2, 'Pinza disección rusa', 'Pinza disección rusa', 1, 0, '2', 'Active', '2023-01-09 16:12:37'),
(204, 1, 2, 'Pinza disección con garra', 'Pinza disección con garra', 1, 0, '2', 'Active', '2023-01-09 16:12:58'),
(206, 6, 1, 'Sonda salem ', 'Sonda salem ', 1, 0, '1', 'Active', '2023-01-09 16:13:01'),
(207, 6, 1, 'T de kehr ', 'T de kehr ', 1, 0, '1', 'Active', '2023-01-09 16:13:52'),
(208, 1, 2, 'Pinza disección sin garra', 'Pinza disección sin garra', 1, 0, '2', 'Active', '2023-01-09 16:14:01'),
(210, 6, 1, 'Traqueostomo ', 'Traqueostomo', 1, 0, '1', 'Active', '2023-01-09 16:14:23'),
(211, 6, 1, 'Tubo a tórax ', 'Tubo a tórax ', 1, 0, '1', 'Active', '2023-01-09 16:14:54'),
(212, 6, 1, 'Viscoelastico', 'Viscoelastico ', 1, 0, '1', 'Active', '2023-01-09 16:16:08'),
(213, 1, 2, 'Cánula de Frazier n° 8 con mandril', 'Cánula de Frazier n° 8 con mandril', 1, 0, '2', 'Active', '2023-01-09 16:16:12'),
(215, 7, 1, 'N* 10 ', 'N* 10 ', 1, 0, '1', 'Active', '2023-01-09 16:17:08'),
(216, 7, 1, 'N*11', 'N*11', 1, 0, '1', 'Active', '2023-01-09 16:17:34'),
(217, 7, 1, 'N*12', 'N*12', 1, 0, '1', 'Active', '2023-01-09 16:17:56'),
(218, 1, 2, 'Cánula de Yankauer', 'Cánula de Yankauer', 1, 0, '2', 'Active', '2023-01-09 16:18:06'),
(220, 7, 1, 'N*15', 'N*15', 1, 0, '1', 'Active', '2023-01-09 16:18:43'),
(221, 7, 1, 'N*20', 'N*20', 1, 0, '1', 'Active', '2023-01-09 16:19:07'),
(222, 7, 1, 'N*22', 'N*22', 1, 0, '1', 'Active', '2023-01-09 16:19:35'),
(223, 1, 2, 'Pinzas de campo x 11 cm ( 4 backhaus y 1 de Jones)', 'Pinzas de campo x 11 cm ( 4 backhaus y 1 de Jones)', 5, 0, '2', 'Active', '2023-01-09 16:19:38'),
(225, 1, 2, 'Pinza Kelly curva', 'Pinza Kelly curva', 2, 0, '2', 'Active', '2023-01-09 16:20:19'),
(227, 8, 1, 'Polidioxanona (triclosan) ', 'Polidioxanona (triclosan) ', 1, 0, '1', 'Active', '2023-01-09 16:20:59'),
(228, 8, 1, 'Poliglactin 910', 'Poliglactin 910', 1, 0, '1', 'Active', '2023-01-09 16:21:38'),
(229, 8, 1, 'Poliglactin 910 recubierta ', 'Poliglactin 910 recubierta ', 1, 1, '1', 'Active', '2023-01-09 16:22:12'),
(230, 1, 2, 'Pinza Kelly recta', 'Pinza Kelly recta', 2, 0, '2', 'Active', '2023-01-09 16:22:33'),
(234, 8, 1, 'Poliglecaprone 25 ', 'Poliglecaprone 25 ', 1, 0, '1', 'Active', '2023-01-09 16:22:40'),
(235, 1, 2, 'Pinza Kelly adson curva (cístico)', 'Pinza Kelly adson curva (cístico)', 2, 0, '2', 'Active', '2023-01-09 16:23:10'),
(237, 1, 2, 'Pinza Kelly adson recta', 'Pinza Kelly adson recta', 2, 0, '2', 'Active', '2023-01-09 16:23:37'),
(239, 1, 2, 'Pinza rochester curva', 'Pinza rochester curva', 2, 0, '2', 'Active', '2023-01-09 16:23:56'),
(241, 1, 2, 'Pinza rochester recta', 'Pinza rochester recta', 1, 0, '2', 'Active', '2023-01-09 16:24:23'),
(243, 8, 1, 'Poliglecaprone 25- copolimero glicòlico y e- caprolactona triclosan ', 'Poliglecaprone 25- copolimero glicòlico y e- caprolactona triclosan ', 1, 0, '1', 'Active', '2023-01-09 16:24:41'),
(244, 1, 2, 'Pinza kocher recta', 'Pinza kocher recta', 2, 0, '2', 'Active', '2023-01-09 16:24:44'),
(247, 1, 2, 'Pinza allix', 'Pinza allix', 2, 0, '2', 'Active', '2023-01-09 16:25:03'),
(249, 1, 2, 'Pinza babcock 16 y 17 cm', 'Pinza babcock 16 y 17 cm', 2, 0, '2', 'Active', '2023-01-09 16:25:23'),
(251, 8, 1, 'Submucosa intestinal de bovino ', 'Submucosa intestinal de bovino ', 1, 0, '1', 'Active', '2023-01-09 16:25:32'),
(252, 1, 2, 'Pinza Cístico (Mixter) Largas', 'Pinza Cístico (Mixter) Largas', 1, 0, '2', 'Active', '2023-01-09 16:25:40'),
(254, 1, 2, 'Pinza Penintong x 15.5 cm', 'Pinza Penintong x 15.5 cm', 2, 0, '2', 'Active', '2023-01-09 16:25:59'),
(256, 1, 2, 'Pinza Duval  x 20 cm', 'Pinza Duval  x 20 cm', 2, 0, '2', 'Active', '2023-01-09 16:26:16'),
(258, 1, 2, 'Pinza Foaster x 18 cm', 'Pinza Foaster x 18 cm', 2, 0, '2', 'Active', '2023-01-09 16:26:38'),
(260, 8, 1, 'Submucosa intestinal de oveja ', 'Submucosa intestinal de oveja ', 1, 0, '1', 'Active', '2023-01-09 16:26:41'),
(261, 1, 2, 'Porta agujas x 27 cm curvo', 'Porta agujas x 27 cm curvo', 1, 0, '2', 'Active', '2023-01-09 16:29:32'),
(263, 10, 1, 'Polímero de poliamida ', 'Polímero de poliamida ', 1, 0, '1', 'Active', '2023-01-09 16:29:47'),
(264, 10, 1, 'Acero inoxidable Quirúrgico ', 'Acero inoxidable Quirúrgico ', 1, 0, '1', 'Active', '2023-01-09 16:30:09'),
(265, 10, 1, 'Algodón   poliéster ', 'Algodón   poliéster ', 1, 0, '1', 'Active', '2023-01-09 16:30:41'),
(266, 1, 2, 'Porta agujas x 13 cm', 'Porta agujas x 13 cm', 1, 0, '2', 'Active', '2023-01-09 16:30:52'),
(268, 10, 1, 'Fibra de poliéster ', 'Fibra de poliéster ', 1, 0, '1', 'Active', '2023-01-09 16:31:03'),
(269, 1, 2, 'Porta agujas aro dorado de 18 cm', 'Porta agujas aro dorado de 18 cm', 1, 0, '2', 'Active', '2023-01-09 16:31:09'),
(271, 1, 2, 'Porta agujas Hegar x 18 cm', 'Porta agujas Hegar x 18 cm', 1, 0, '2', 'Active', '2023-01-09 16:31:28'),
(273, 10, 1, 'Fibra liberiana de la plata linácea ', 'Fibra liberiana de la plata linácea ', 1, 0, '1', 'Active', '2023-01-09 16:31:41'),
(274, 10, 1, 'Gusano de seda', 'Gusano de seda', 1, 0, '1', 'Active', '2023-01-09 16:32:06'),
(276, 10, 1, 'Poli (tereftalato de etileno): poliéster trenzado ', 'Poli (tereftalato de etileno): poliéster trenzado ', 1, 0, '1', 'Active', '2023-01-09 16:34:05'),
(277, 10, 1, 'Poliamida 66', 'Poliamida 66', 1, 0, '1', 'Active', '2023-01-09 16:34:32'),
(278, 10, 1, 'Polipropileno', 'Polipropileno', 1, 0, '1', 'Active', '2023-01-09 16:35:06'),
(280, 4, 2, 'Separadores de Balfour Baby con valva ', 'Separadores de Balfour Baby con valva ', 1, 0, '2', 'Active', '2023-01-09 16:36:11'),
(282, 4, 2, 'Separadores de Richardson', 'Separadores de Richardson', 2, 0, '2', 'Active', '2023-01-09 16:36:37'),
(284, 4, 2, 'Separadores de Farabeauf', 'Separadores de Farabeauf', 2, 0, '2', 'Active', '2023-01-09 16:36:54'),
(286, 4, 2, 'Mango de bisturí N° 3', 'Mango de bisturí N° 3', 1, 0, '2', 'Active', '2023-01-09 16:37:20'),
(288, 4, 2, 'Mango de bisturí N° 7', 'Mango de bisturí N° 7', 1, 0, '2', 'Active', '2023-01-09 16:38:04'),
(290, 12, 1, 'Agua destilada ', 'Agua destilada ', 1, 0, '1', 'Active', '2023-01-09 16:40:56'),
(291, 12, 1, 'DAD 10% ', 'DAD 10% ', 1, 0, '1', 'Active', '2023-01-09 16:41:23'),
(292, 12, 1, 'DAD 5% ', 'DAD 5% ', 1, 0, '1', 'Active', '2023-01-09 16:42:10'),
(293, 12, 1, 'DAD 50% ', 'DAD 50% ', 1, 0, '1', 'Active', '2023-01-09 16:42:33'),
(294, 12, 1, 'Fisiologica 100cc', 'Fisiologica 100cc', 1, 0, '1', 'Active', '2023-01-09 16:43:17'),
(295, 12, 1, 'Fisiologica 250cc', 'Fisiologica 250cc', 1, 0, '1', 'Active', '2023-01-09 16:43:37'),
(296, 12, 1, 'Fisiologica 3mil cc', 'Fisiologica 3mil cc', 1, 0, '1', 'Active', '2023-01-09 16:44:05'),
(297, 12, 1, 'Fisiologica 500cc', 'Fisiologica 500cc', 1, 0, '1', 'Active', '2023-01-09 16:44:33'),
(298, 12, 1, 'Fisiologica 50cc', 'Fisiologica 50cc', 1, 0, '1', 'Active', '2023-01-09 16:44:54'),
(299, 12, 1, 'Fisiologica mil cc', 'Fisiologica mil cc', 1, 0, '1', 'Active', '2023-01-09 16:45:19'),
(300, 12, 1, 'Glicina 3mil cc', 'Glicina 3mil cc', 1, 0, '1', 'Active', '2023-01-09 16:45:46'),
(301, 12, 1, 'Hemacell', 'Hemacell', 1, 0, '1', 'Active', '2023-01-09 16:46:12'),
(302, 12, 1, 'Lactato Ringer 500cc', 'Lactato Ringer 500cc', 1, 0, '1', 'Active', '2023-01-09 16:46:43'),
(303, 4, 2, 'Tijera de metzembaut curva x 14 mm', 'Tijera de metzembaut curva x 14 mm', 1, 0, '2', 'Active', '2023-01-09 16:47:46'),
(305, 4, 2, 'Tijera de mayo recta x 14 cm', 'Tijera de mayo recta x 14 cm', 1, 0, '2', 'Active', '2023-01-09 16:48:01'),
(307, 4, 2, 'Pinza disección rusa', 'Pinza disección rusa', 1, 0, '2', 'Active', '2023-01-09 16:48:21'),
(309, 4, 2, 'Pinza disección sin garra', 'Pinza disección sin garra', 1, 0, '2', 'Active', '2023-01-09 16:48:44'),
(311, 4, 2, 'Pinza disección  adson con garra', 'Pinza disección  adson con garra', 1, 0, '2', 'Active', '2023-01-09 16:49:01'),
(313, 4, 2, 'Pinza disección  adson sin garra', 'Pinza disección  adson sin garra', 1, 0, '2', 'Active', '2023-01-09 16:49:16'),
(315, 4, 2, 'Cánula de Frazier N° 8 con mandril', 'Cánula de Frazier N° 8 con mandril', 1, 0, '2', 'Active', '2023-01-09 16:49:46'),
(317, 4, 2, 'Cánula de Yankauer', 'Cánula de Yankauer', 1, 0, '2', 'Active', '2023-01-09 16:50:05'),
(319, 4, 2, 'Pinzas de campo x 11 cm ( 5 backhaus )', 'Pinzas de campo x 11 cm ( 5 backhaus )', 5, 0, '2', 'Active', '2023-01-09 16:50:23'),
(321, 4, 2, 'Pinza mosquito curva ', 'Pinza mosquito curva ', 5, 0, '2', 'Active', '2023-01-09 16:50:40'),
(323, 4, 2, 'Pinza mosquito recta', 'Pinza mosquito recta', 5, 0, '2', 'Active', '2023-01-09 16:50:57'),
(325, 4, 2, 'Pinza Kelly curva', 'Pinza Kelly curva', 2, 0, '2', 'Active', '2023-01-09 16:51:16'),
(327, 4, 2, 'Pinza Kelly recta', 'Pinza Kelly recta', 2, 0, '2', 'Active', '2023-01-09 16:51:34'),
(329, 4, 2, 'Pinza allix Jud', 'Pinza allix Jud', 1, 0, '2', 'Active', '2023-01-09 16:51:51'),
(331, 4, 2, 'Pinza kocher curva x 14 cm', 'Pinza kocher curva x 14 cm', 2, 0, '2', 'Active', '2023-01-09 16:52:08'),
(333, 4, 2, 'Pinza kocher recta', 'Pinza kocher recta', 1, 0, '2', 'Active', '2023-01-09 16:52:27'),
(336, 4, 2, 'Pinza babcock 16  cm', 'Pinza babcock 16  cm', 2, 0, '2', 'Active', '2023-01-09 16:53:12'),
(338, 4, 2, 'Pinza Penintong x 15.5 cm', 'Pinza Penintong x 15.5 cm', 1, 0, '2', 'Active', '2023-01-09 16:53:46'),
(340, 4, 2, 'Pinza Foaster x 18 cm', 'Pinza Foaster x 18 cm', 2, 0, '2', 'Active', '2023-01-09 16:54:05'),
(342, 4, 2, 'Porta agujas x 18 cm', 'Porta agujas x 18 cm', 1, 0, '2', 'Active', '2023-01-09 16:54:25'),
(344, 4, 2, 'Porta agujas x 16 cm', 'Porta agujas x 16 cm', 1, 0, '2', 'Active', '2023-01-09 16:54:43'),
(346, 4, 2, 'Porta agujas  14 cm', 'Porta agujas  14 cm', 1, 0, '2', 'Active', '2023-01-09 16:55:00'),
(348, 5, 2, 'Bandeja metálica', 'Bandeja metálica', 1, 0, '2', 'Active', '2023-01-09 16:56:02'),
(350, 5, 2, 'Cincel acanalado', 'Cincel acanalado', 1, 0, '2', 'Active', '2023-01-09 16:56:19'),
(352, 5, 2, 'Cincel recto de hibbs', 'Cincel recto de hibbs', 1, 0, '2', 'Active', '2023-01-09 16:56:37'),
(354, 5, 2, 'Separador de Hohman', 'Separador de Hohman', 2, 0, '2', 'Active', '2023-01-09 16:56:53'),
(356, 5, 2, 'Separador de Volkman', 'Separador de Volkman', 3, 0, '2', 'Active', '2023-01-09 16:57:09'),
(358, 5, 2, 'Separador de Benett', 'Separador de Benett', 1, 0, '2', 'Active', '2023-01-09 16:57:27'),
(360, 5, 2, 'Separador Mathieu', 'Separador Mathieu', 1, 0, '2', 'Active', '2023-01-09 16:57:48'),
(362, 5, 2, 'Curetas Volkman(cucharilla ósea)', 'Curetas Volkman(cucharilla ósea)', 2, 0, '2', 'Active', '2023-01-09 16:58:09'),
(365, 5, 2, 'Clamps Lane', 'Clamps Lane', 1, 0, '2', 'Active', '2023-01-09 16:58:33'),
(367, 5, 2, 'Cizalla Ruskin', 'Cizalla Ruskin', 1, 0, '2', 'Active', '2023-01-09 16:58:52'),
(369, 5, 2, 'Costotomo', 'Costotomo', 2, 0, '2', 'Active', '2023-01-09 16:59:09'),
(371, 5, 2, 'Disector y desperiotizador Alexander Matson', 'Disector y desperiotizador Alexander Matson', 1, 0, '2', 'Active', '2023-01-09 16:59:32'),
(373, 5, 2, 'Disector de Alexander Matson', 'Disector de Alexander Matson', 1, 0, '2', 'Active', '2023-01-09 16:59:48'),
(375, 5, 2, 'Martillo de mead', 'Martillo de mead', 1, 0, '2', 'Active', '2023-01-09 17:00:04'),
(377, 5, 2, 'Gubia de Stille luer', 'Gubia de Stille luer', 1, 0, '2', 'Active', '2023-01-09 17:00:20'),
(379, 5, 2, 'Osteotomo de Lambotte', 'Osteotomo de Lambotte', 1, 0, '2', 'Active', '2023-01-09 17:00:37'),
(381, 5, 2, 'Desperiostizadores de lambotte', 'Desperiostizadores de lambotte', 4, 0, '2', 'Active', '2023-01-09 17:00:52'),
(383, 6, 2, 'Aproximadorr costal de Bailey', 'Aproximadorr costal de Bailey', 2, 0, '2', 'Active', '2023-01-09 17:03:45'),
(385, 6, 2, 'Costotommos x 22 cm Gluck', 'Costotommos x 22 cm Gluck', 3, 0, '2', 'Active', '2023-01-09 17:04:04'),
(387, 6, 2, 'Clamps vascular vena cava cooley', 'Clamps vascular vena cava cooley', 1, 0, '2', 'Active', '2023-01-09 17:04:21'),
(389, 6, 2, 'Clamps vascular de Bakey pean', 'Clamps vascular de Bakey pean', 1, 0, '2', 'Active', '2023-01-09 17:04:38'),
(391, 6, 2, 'Clamps vascular Baby Doyen x 16,5 cm (pinza)', 'Clamps vascular Baby Doyen x 16,5 cm (pinza)', 5, 0, '2', 'Active', '2023-01-09 17:04:53'),
(393, 6, 2, 'Clamps vascular de Satinsky', 'Clamps vascular de Satinsky', 4, 0, '2', 'Active', '2023-01-09 17:05:27'),
(395, 6, 2, 'Clamps vascular de Buldog x 7 1/2 cm', 'Clamps vascular de Buldog x 7 1/2 cm', 2, 0, '2', 'Active', '2023-01-09 17:05:43'),
(397, 6, 2, 'Desperiotizadores de Lambotte', 'Desperiotizadores de Lambotte', 3, 0, '2', 'Active', '2023-01-09 17:05:59'),
(399, 6, 2, 'Espátulas o separador pulmonar', 'Espátulas o separador pulmonar', 5, 0, '2', 'Active', '2023-01-09 17:06:16'),
(401, 6, 2, 'Separador costal de Doyen', 'Separador costal de Doyen', 2, 0, '2', 'Active', '2023-01-09 17:06:32'),
(403, 6, 2, 'Separador de Richardson', 'Separador de Richardson', 2, 0, '2', 'Active', '2023-01-09 17:06:50'),
(405, 6, 2, 'Separador de Deavers delgados', 'Separador de Deavers delgados', 2, 0, '2', 'Active', '2023-01-09 17:07:11'),
(407, 6, 2, 'Separador de Finochieto ( 1 de rama larga y 1 de rama corta)', 'Separador de Finochieto ( 1 de rama larga y 1 de rama corta)', 2, 0, '2', 'Active', '2023-01-09 17:07:31'),
(409, 6, 2, 'Separador de Allinson', 'Separador de Allinson', 1, 0, '2', 'Active', '2023-01-09 17:07:46'),
(411, 6, 2, 'Separador Harrintong', 'Separador Harrintong', 1, 0, '2', 'Active', '2023-01-09 17:08:03'),
(413, 6, 2, 'Separador de Davinson', 'Separador de Davinson', 1, 0, '2', 'Active', '2023-01-09 17:08:19'),
(415, 6, 2, 'Porta aguja de aro dorado 30 cm', 'Porta aguja de aro dorado 30 cm', 1, 0, '2', 'Active', '2023-01-09 17:08:35'),
(417, 6, 2, 'Porta aguja de aro dorado 16 cm', 'Porta aguja de aro dorado 16 cm', 1, 0, '2', 'Active', '2023-01-09 17:08:51'),
(419, 6, 2, 'Pinza de disección de Baker', 'Pinza de disección de Baker', 1, 0, '2', 'Active', '2023-01-09 17:09:07'),
(421, 6, 2, 'Pinza Duval', 'Pinza Duval', 3, 0, '2', 'Active', '2023-01-09 17:09:28'),
(423, 7, 2, 'Clamps vascular de buldog recto ( 1 x5 cm,3x7 cm,2 x 7 1/2 cm)', 'Clamps vascular de buldog recto ( 1 x5 cm,3x7 cm,2 x 7 1/2 cm)', 6, 0, '2', 'Active', '2023-01-09 17:12:21'),
(425, 7, 2, 'Clamps vascular  satinsky x 27 cm', 'Clamps vascular  satinsky x 27 cm', 4, 0, '2', 'Active', '2023-01-09 17:12:38'),
(427, 7, 2, 'Clamps vascular pinza satinsky x 24 cm', 'Clamps vascular pinza satinsky x 24 cm', 2, 0, '2', 'Active', '2023-01-09 17:13:04'),
(429, 7, 2, 'Pinza baby Doyen recto o clamps vascular x 16,5 cm', 'Pinza baby Doyen recto o clamps vascular x 16,5 cm', 5, 0, '2', 'Active', '2023-01-09 17:15:17'),
(431, 7, 2, 'Cánula de Frazier N° 8 con mandril', 'Cánula de Frazier N° 8 con mandril', 2, 0, '2', 'Active', '2023-01-09 17:15:43'),
(433, 7, 2, 'Cánula de yankauer', 'Cánula de yankauer', 1, 0, '2', 'Active', '2023-01-09 17:18:57'),
(435, 7, 2, 'Ganchos sencillos largos', 'Ganchos sencillos largos', 2, 0, '2', 'Active', '2023-01-09 17:19:13'),
(437, 7, 2, 'Pinza disección de Baker x 16 cm', 'Pinza disección de Baker x 16 cm', 1, 0, '2', 'Active', '2023-01-09 17:19:46'),
(439, 7, 2, 'Pinza mosquiro recta', 'Pinza mosquiro recta', 5, 0, '2', 'Active', '2023-01-09 17:20:23'),
(442, 7, 2, 'Porta aguja de micro-cirugía x 18 cm', 'Porta aguja de micro-cirugía x 18 cm', 1, 0, '2', 'Active', '2023-01-09 17:21:15'),
(443, 7, 2, 'Porta aguja de aro dorado 18 cm', 'Porta aguja de aro dorado 18 cm', 1, 0, '2', 'Active', '2023-01-09 17:22:29'),
(445, 7, 2, 'Porta aguja de aro dorado 16 cm', 'Porta aguja de aro dorado 16 cm', 1, 0, '2', 'Active', '2023-01-09 17:22:48'),
(447, 7, 2, 'Tijera de metzembaut curva x 14 mm', 'Tijera de metzembaut curva x 14 mm', 1, 0, '2', 'Active', '2023-01-09 17:24:26'),
(449, 7, 2, 'Tijera de mayo recta  y fina  x 14 cm', 'Tijera de mayo recta  y fina  x 14 cm', 1, 0, '2', 'Active', '2023-01-09 17:24:43'),
(451, 7, 2, 'Tijera de pott x 19 cm', 'Tijera de pott x 19 cm', 1, 0, '2', 'Active', '2023-01-09 17:24:59'),
(453, 7, 2, 'Separador Weit laner', 'Separador Weit laner', 1, 0, '2', 'Active', '2023-01-09 17:25:18'),
(455, 7, 2, 'Separador de venas de desmarres', 'Separador de venas de desmarres', 2, 0, '2', 'Active', '2023-01-09 17:25:36'),
(457, 8, 2, 'Pinza Baby mixter', 'Pinza Baby mixter', 3, 0, '2', 'Active', '2023-01-09 17:27:17'),
(459, 8, 2, 'Pinza disección de Baker', 'Pinza disección de Baker', 2, 0, '2', 'Active', '2023-01-09 17:27:32'),
(461, 8, 2, 'Porta aguja de aro dorado 18 cm', 'Porta aguja de aro dorado 18 cm', 1, 0, '2', 'Active', '2023-01-09 17:27:49'),
(463, 8, 2, 'Porta aguja x 14 cm mayo hegar', 'Porta aguja x 14 cm mayo hegar', 1, 0, '2', 'Active', '2023-01-09 17:28:10'),
(465, 8, 2, 'Tijera de metzembaut curva x 14 mm', 'Tijera de metzembaut curva x 14 mm', 1, 0, '2', 'Active', '2023-01-09 17:28:29'),
(467, 8, 2, 'Tijera de mayo recta  x 14 cm', 'Tijera de mayo recta  x 14 cm', 1, 0, '2', 'Active', '2023-01-09 17:29:01'),
(469, 8, 2, 'Cánula de Frazier N° 8 con mandril', 'Cánula de Frazier N° 8 con mandril', 1, 0, '2', 'Active', '2023-01-09 17:29:40'),
(471, 8, 2, 'Mango de bisturí N° 7', 'Mango de bisturí  N° 7', 1, 0, '2', 'Active', '2023-01-09 17:30:10'),
(473, 8, 2, 'Mango de bisturí N° 3', 'Mango de bisturí N° 3', 1, 0, '2', 'Active', '2023-01-09 17:30:40'),
(475, 8, 2, 'Gancho sencillo', 'Gancho sencillo', 2, 0, '2', 'Active', '2023-01-09 17:30:57'),
(477, 8, 2, 'Separador de seem miller', 'Separador de seem miller', 2, 0, '2', 'Active', '2023-01-09 17:31:13'),
(479, 8, 2, 'Flebo extractor; consta de 9 piezas y una caja metálica', 'Flebo extractor; consta de 9 piezas y una caja metálica', 1, 0, '2', 'Active', '2023-01-09 17:31:32'),
(481, 8, 2, 'Clamps vascular de Buldog', 'Clamps vascular de Buldog', 2, 0, '2', 'Active', '2023-01-09 17:31:48'),
(483, 8, 2, 'Separador de vans de desmarres', 'Separador de vans de desmarres', 1, 0, '2', 'Active', '2023-01-09 17:32:07'),
(485, 9, 2, 'Abreboca de Mac Ivor con 3 valvas', 'Abreboca de Mac Ivor con 3 valvas', 1, 0, '2', 'Active', '2023-01-09 17:32:57'),
(487, 9, 2, 'Especulos Nasales: Viena, Killian, cotle', 'Especulos Nasales: Viena, Killian, cotle', 3, 0, '2', 'Active', '2023-01-09 17:33:20'),
(489, 9, 2, 'Pinza septal Middleton-Jasen', 'Pinza septal Middleton-Jasen', 1, 0, '2', 'Active', '2023-01-09 17:33:36'),
(491, 9, 2, 'Tijeras de Fomon', 'Tijeras de Fomon', 2, 0, '2', 'Active', '2023-01-09 17:33:52'),
(493, 9, 2, 'Tijera de Heymann', 'Tijera de Heymann', 1, 0, '2', 'Active', '2023-01-09 17:34:23'),
(495, 9, 2, 'Amigdalotomos de  Eves', 'Amigdalotomos de  Eves', 2, 0, '2', 'Active', '2023-01-09 17:34:38'),
(497, 9, 2, 'Pinza de hartman', 'Pinza de hartman', 1, 0, '2', 'Active', '2023-01-09 17:35:35'),
(499, 9, 2, 'Adenotomo de beckman', 'Adenotomo de beckman', 4, 0, '2', 'Active', '2023-01-09 17:35:53'),
(500, 9, 2, 'Pinza en bayoneta de Lucae', 'Pinza en bayoneta de Lucae', 1, 0, '2', 'Active', '2023-01-09 17:36:26'),
(502, 9, 2, 'Cuchillete  de Balleger', 'Cuchillete  de Balleger', 1, 0, '2', 'Active', '2023-01-09 17:36:54'),
(504, 9, 2, 'Disector de  Hurd', 'Disector de  Hurd', 2, 0, '2', 'Active', '2023-01-09 17:37:17'),
(506, 9, 2, 'Cincel de Cottle', 'Cincel de Cottle', 1, 0, '2', 'Active', '2023-01-09 17:38:59'),
(508, 9, 2, 'Raspa doble fomon', 'Raspa doble fomon', 1, 0, '2', 'Active', '2023-01-09 17:39:22'),
(510, 9, 2, 'Disector de Freer', 'Disector de Freer', 1, 0, '2', 'Active', '2023-01-09 17:39:44'),
(512, 9, 2, 'Raspa de Aufrich', 'Raspa de Aufrich', 1, 0, '2', 'Active', '2023-01-09 17:40:20'),
(514, 9, 2, 'Gancho  doble abotonador de Fomon', 'Gancho  doble abotonador de Fomon', 2, 0, '2', 'Active', '2023-01-09 17:40:38'),
(516, 9, 2, 'Gancho sencillo y/o de Gillies', 'Gancho sencillo y/o de Gillies', 2, 0, '2', 'Active', '2023-01-09 17:40:57'),
(518, 9, 2, 'Raspa de Joseph', 'Raspa de Joseph', 1, 0, '2', 'Active', '2023-01-09 17:41:17'),
(520, 9, 2, 'Sierra de Joseph', 'Sierra de Joseph', 1, 0, '2', 'Active', '2023-01-09 17:41:36'),
(523, 9, 2, 'Periostotomo de Joseph', 'Periostotomo de Joseph', 1, 0, '2', 'Active', '2023-01-09 17:41:54'),
(525, 9, 2, 'Retractor lingual de Anndrew', 'Retractor lingual de Anndrew', 1, 0, '2', 'Active', '2023-01-09 17:42:09'),
(527, 9, 2, 'Bandeja metálica', 'Bandeja metálica', 1, 0, '2', 'Active', '2023-01-09 17:42:27'),
(530, 9, 2, 'Cánula de Frazier N° 8', 'Cánula de Frazier N° 8', 2, 0, '2', 'Active', '2023-01-09 17:43:06'),
(532, 9, 2, 'Cánula de Yankawer', 'Cánula de Yankawer', 1, 0, '2', 'Active', '2023-01-09 17:43:34'),
(534, 9, 2, 'Porta aguja mango aro  dorado x 18 cm', 'Porta aguja mango aro  dorado x 18 cm', 2, 0, '2', 'Active', '2023-01-09 17:43:56'),
(536, 9, 2, 'Mango de Bisturí N° 7', 'Mango de Bisturí N° 7', 1, 0, '2', 'Active', '2023-01-09 17:44:27'),
(538, 10, 2, 'Ganchos dobles cortantes  de Joseph', 'Ganchos dobles cortantes  de Joseph', 2, 0, '2', 'Active', '2023-01-09 17:46:48'),
(540, 10, 2, 'Ganchos de duramadre de Cushing', 'Ganchos de duramadre de Cushing', 1, 0, '2', 'Active', '2023-01-09 17:47:03'),
(542, 10, 2, 'Gancho sencillo', 'Gancho sencillo', 1, 0, '2', 'Active', '2023-01-09 17:47:21'),
(544, 10, 2, 'Decolador  de Duramadre', 'Decolador  de Duramadre', 1, 0, '2', 'Active', '2023-01-09 17:47:40'),
(546, 10, 2, 'Disectoor de Sachs', 'Disectoor de Sachs', 1, 0, '2', 'Active', '2023-01-09 17:48:01'),
(548, 10, 2, 'Espátulas cerebrales', 'Espátulas cerebrales', 2, 0, '2', 'Active', '2023-01-09 17:48:17'),
(550, 10, 2, 'Porta aguja en Bayoneta de Yasargil x 22 cm', 'Porta aguja en Bayoneta de Yasargil x 22 cm', 1, 0, '2', 'Active', '2023-01-09 17:48:32'),
(552, 10, 2, 'Tijeras de taylor para Duramadre(2 x 17 1/2 cm,1 x 16 cm, y 15 1/2 cm)', 'Tijeras de taylor para Duramadre(2 x 17 1/2 cm,1 x 16 cm, y 15 1/2 cm)', 4, 0, '2', 'Active', '2023-01-09 17:48:51'),
(554, 10, 2, 'Cánulas de Frazier  N° 8 con mandril', 'Cánulas de Frazier  N° 8 con mandril', 1, 0, '2', 'Active', '2023-01-09 17:49:19'),
(556, 11, 2, 'Pinza de disección adson con garra', 'Pinza de disección adson con garra', 1, 0, '2', 'Active', '2023-01-09 17:49:51'),
(558, 11, 2, 'Pinza de disección adson sin garra', 'Pinza de disección adson sin garra', 1, 0, '2', 'Active', '2023-01-09 17:50:17'),
(560, 11, 2, 'Pinza kelly recta', 'Pinza kelly recta', 1, 0, '2', 'Active', '2023-01-09 17:50:30'),
(562, 11, 2, 'Tijera de mayo recta x 17 cm', 'Tijera de mayo recta x 17 cm', 1, 0, '2', 'Active', '2023-01-09 17:50:54'),
(564, 11, 2, 'Tijera de metzembaut pequeña x 14 cm', 'Tijera de metzembaut pequeña x 14 cm', 1, 0, '2', 'Active', '2023-01-09 17:51:08'),
(566, 11, 2, 'Porta aguja x 14 cm', 'Porta aguja x 14 cm', 1, 0, '2', 'Active', '2023-01-09 17:51:22'),
(568, 11, 2, 'Mango de bisturí N° 4', 'Mango de bisturí N° 4', 1, 0, '2', 'Active', '2023-01-09 17:51:52'),
(570, 11, 2, 'Mango de bisturí N° 3', 'Mango de bisturí N° 3', 1, 0, '2', 'Active', '2023-01-09 17:52:19'),
(572, 12, 2, 'Pinza de disección adson con garra', 'Pinza de disección adson con garra', 1, 0, '2', 'Active', '2023-01-09 17:54:08'),
(574, 12, 2, 'Pinza de disección adson sin garra', 'Pinza de disección adson sin garra', 1, 0, '2', 'Active', '2023-01-09 17:54:22'),
(576, 12, 2, 'Pinza kelly recta', 'Pinza kelly recta', 1, 0, '2', 'Active', '2023-01-09 17:54:37'),
(578, 12, 2, 'Tijera de mayo recta x 17 cm', 'Tijera de mayo recta x 17 cm', 1, 0, '2', 'Active', '2023-01-09 17:54:54'),
(580, 12, 2, 'Tijera de metzembaut pequeña x 14 cm', 'Tijera de metzembaut pequeña x 14 cm', 1, 0, '2', 'Active', '2023-01-09 17:55:10'),
(582, 12, 2, 'Porta aguja x 14 cm', 'Porta aguja x 14 cm', 1, 0, '2', 'Active', '2023-01-09 17:55:25'),
(584, 0, 2, 'Mango de bisturí N° 4', 'Mango de bisturí ', 0, 0, '2', 'Active', '2023-01-09 17:55:56'),
(586, 12, 2, 'Mango de bisturí N° 3', 'Mango de bisturí N° 3', 1, 0, '2', 'Active', '2023-01-09 17:56:45'),
(588, 13, 2, 'Bandeja metálica', 'Bandeja metálica', 1, 0, '2', 'Active', '2023-01-09 17:57:39'),
(590, 13, 2, 'Pinza rochester recta', 'Pinza rochester recta', 1, 0, '2', 'Active', '2023-01-09 17:57:54'),
(592, 13, 2, 'Pinza Rochester Curva', 'Pinza Rochester Curva', 2, 0, '2', 'Active', '2023-01-09 17:58:08'),
(594, 13, 2, 'Pinza uterina de Heaney x 22cm', 'Pinza uterina de Heaney x 22cm', 3, 0, '2', 'Active', '2023-01-09 17:58:27'),
(596, 13, 2, 'Histerolabo de Sommer', 'Histerolabo de Sommer', 1, 0, '2', 'Active', '2023-01-09 17:59:00'),
(598, 13, 2, 'Porta aguja aro dorado x 30  cm', 'Porta aguja aro dorado x 30  cm', 1, 0, '2', 'Active', '2023-01-09 17:59:33'),
(601, 13, 2, 'Separador O Sullivan con 3 valvas', 'Separador O Sullivan con 3 valvas', 1, 0, '2', 'Active', '2023-01-09 18:01:04'),
(603, 14, 2, 'Separador Gelpy', 'Separador Gelpy', 2, 0, '2', 'Active', '2023-01-09 18:04:54'),
(605, 14, 2, 'Separador de Beckman adson', 'Separador de Beckman adson', 2, 0, '2', 'Active', '2023-01-09 18:05:09'),
(607, 14, 2, 'Separador Weit Laner', 'Separador Weit Laner', 2, 0, '2', 'Active', '2023-01-09 18:06:15'),
(609, 14, 2, 'Pinza de disco Olligator', 'Pinza de disco Olligator', 3, 0, '2', 'Active', '2023-01-09 18:06:32'),
(611, 14, 2, 'Pinza de Ferris Smith Kerrinson', 'Pinza de Ferris Smith Kerrinson', 1, 0, '2', 'Active', '2023-01-09 18:06:53'),
(613, 14, 2, 'Gubia doble acción Echilin', 'Gubia doble acción Echilin', 1, 0, '2', 'Active', '2023-01-09 18:08:43'),
(615, 14, 2, 'Curetas de Volkman', 'Curetas de Volkman', 2, 0, '2', 'Active', '2023-01-09 18:09:00'),
(617, 14, 2, 'Decolador de duramadre', 'Decolador de duramadre', 1, 0, '2', 'Active', '2023-01-09 18:09:19'),
(619, 14, 2, 'Cánula de Frazzier  N° 8', 'Cánula de Frazzier  N° 8', 2, 0, '2', 'Active', '2023-01-09 18:09:51'),
(621, 14, 2, 'Pinza Mosquito curva', 'Pinza Mosquito curva', 3, 0, '2', 'Active', '2023-01-09 18:10:08'),
(623, 14, 2, 'Pinza Mosquito recta', 'Pinza Mosquito recta', 5, 0, '2', 'Active', '2023-01-09 18:10:25'),
(626, 15, 2, 'Pinza de cuello  Skene', 'Pinza de cuello  Skene', 1, 0, '2', 'Active', '2023-01-09 18:11:45'),
(628, 15, 2, 'Pinza uterinas de Heany', 'Pinza uterinas de Heany', 3, 0, '2', 'Active', '2023-01-09 18:12:01'),
(630, 15, 2, 'Pinza Rochester', 'Pinza Rochester', 3, 0, '2', 'Active', '2023-01-09 18:12:16'),
(632, 15, 2, 'Pinza clamps Vascular Bozeman', 'Pinza clamps Vascular Bozeman', 2, 0, '2', 'Active', '2023-01-09 18:12:37'),
(634, 15, 2, 'Especulo vaginal ', 'Especulo vaginal ', 1, 0, '2', 'Active', '2023-01-09 18:12:55'),
(636, 15, 2, 'Histerolabo de Sommer', 'Histerolabo de Sommer', 1, 0, '2', 'Active', '2023-01-09 18:13:15'),
(638, 15, 2, 'Histerometro', 'Histerometro', 1, 0, '2', 'Active', '2023-01-09 18:13:36'),
(640, 15, 2, 'Curetas o legras Uterinas (2 N°2 y 2 N° 3)', 'Curetas o legras Uterinas (2 N°2 y 2 N° 3)', 4, 0, '2', 'Active', '2023-01-09 18:14:14'),
(642, 15, 2, 'Dilatadores uterinos Hegar (Juego x 8)', 'Dilatadores uterinos Hegar (Juego x 8)', 8, 0, '2', 'Active', '2023-01-09 18:14:35'),
(644, 15, 2, 'Bandeja', 'Bandeja', 1, 0, '2', 'Active', '2023-01-09 18:14:51'),
(648, 16, 2, 'Dilatadores o sondas uretral de Mayo Guyon ( con bandeja metálica del N° 10 al 30, 5 bujias desechable y 1 tubo metálico)', 'Dilatadores o sondas uretral de Mayo Guyon ( con bandeja metálica del N° 10 al 30, 5 bujias desechable y 1 tubo metálico)', 21, 0, '2', 'Active', '2023-01-09 18:16:24'),
(650, 16, 2, 'Clamp renal de Herrick', 'Clamp renal de Herrick', 1, 0, '2', 'Active', '2023-01-09 18:16:41'),
(652, 16, 2, 'Pinza de mayo Guyon', 'Pinza de mayo Guyon', 1, 0, '2', 'Active', '2023-01-09 18:16:58'),
(654, 16, 2, 'Separador de Finochetto', 'Separador de Finochetto', 1, 0, '2', 'Active', '2023-01-09 18:17:13'),
(657, 16, 2, 'Separador de Jud Masson', 'Separador de Jud Masson', 1, 0, '2', 'Active', '2023-01-09 18:17:36'),
(659, 17, 2, 'Bandeja metálica', 'Bandeja metálica', 1, 0, '2', 'Active', '2023-01-09 18:18:15'),
(661, 17, 2, 'Separadores de Farabeauf pequeños', 'Separadores de Farabeauf pequeños', 2, 0, '2', 'Active', '2023-01-09 18:18:34'),
(663, 17, 2, 'Separador de Seem Miller', 'Separador de Seem Miller', 2, 0, '2', 'Active', '2023-01-09 18:20:49'),
(666, 17, 2, 'Cánula de Frazier N° 8 con mandril', 'Cánula de Frazier N° 8 con mandril', 1, 0, '2', 'Active', '2023-01-09 18:22:08'),
(668, 17, 2, 'Mango de bisturí N° 3', 'Mango de bisturí N° 3', 1, 0, '2', 'Active', '2023-01-09 18:22:37'),
(670, 17, 2, 'Mango de bisturí N° 4', 'Mango de bisturí N° 4', 1, 0, '2', 'Active', '2023-01-09 18:23:10'),
(672, 17, 2, 'Tijera de metzembaut curva x 12 mm', 'Tijera de metzembaut curva x 12 mm', 1, 0, '2', 'Active', '2023-01-09 18:25:52'),
(674, 17, 2, 'Tijera de mayo curva x 14 cm', 'Tijera de mayo curva x 14 cm', 1, 0, '2', 'Active', '2023-01-09 18:26:09'),
(676, 17, 2, 'Sonda acanalada', 'Sonda acanalada', 1, 0, '2', 'Active', '2023-01-09 18:26:30'),
(678, 17, 2, 'Pinza disección rusa', 'Pinza disección rusa', 1, 0, '2', 'Active', '2023-01-09 18:27:32'),
(680, 17, 2, 'Pinza disección sin garra', 'Pinza disección sin garra', 1, 0, '2', 'Active', '2023-01-09 18:29:40'),
(683, 17, 2, 'Pinza disección con garra', 'Pinza disección con garra', 1, 0, '2', 'Active', '2023-01-09 18:29:58'),
(686, 17, 2, 'Pinza disección  adson con garra', 'Pinza disección  adson con garra', 1, 0, '2', 'Active', '2023-01-09 18:31:39'),
(688, 17, 2, 'Pinzas de campo x 11 cm ( 4 backhaus y 1 de Jones )', 'Pinzas de campo x 11 cm ( 4 backhaus y 1 de Jones )', 5, 0, '2', 'Active', '2023-01-09 18:32:00'),
(690, 17, 2, 'Pinza Baby mosquito curva ', 'Pinza Baby mosquito curva ', 1, 0, '2', 'Active', '2023-01-09 18:32:47'),
(692, 17, 2, 'Pinza Baby mosquito recta', 'Pinza Baby mosquito recta', 2, 0, '2', 'Active', '2023-01-09 18:33:23'),
(694, 17, 2, 'Pinza mosquito curva ', 'Pinza mosquito curva ', 4, 0, '2', 'Active', '2023-01-09 18:35:32'),
(696, 17, 2, 'Pinza mosquito recta', 'Pinza mosquito recta', 4, 0, '2', 'Active', '2023-01-09 18:36:31'),
(698, 17, 2, 'Pinza Kelly curva', 'Pinza Kelly curva', 2, 0, '2', 'Active', '2023-01-09 18:36:47'),
(700, 17, 2, 'Pinza Allix ', 'Pinza Allix ', 1, 0, '2', 'Active', '2023-01-09 18:37:41'),
(702, 17, 2, 'Pinza Babcock ', 'Pinza Babcock ', 1, 0, '2', 'Active', '2023-01-09 18:49:23'),
(704, 17, 2, 'Porta agujas x 14 cm', 'Porta agujas x 14 cm', 2, 0, '2', 'Active', '2023-01-09 18:50:30'),
(706, 17, 2, 'Porta agujas x 13 cm', 'Porta agujas x 13 cm', 1, 0, '2', 'Active', '2023-01-09 18:50:50'),
(708, 18, 2, 'Blefarostato de Castro viejo', 'Blefarostato de Castro viejo', 1, 0, '2', 'Active', '2023-01-09 19:26:20'),
(710, 18, 2, 'Blefarostato de Stevenson', 'Blefarostato de Stevenson', 2, 0, '2', 'Active', '2023-01-09 19:26:37'),
(712, 18, 2, 'Blefarostato  Lanncaster', 'Blefarostato  Lanncaster', 1, 0, '2', 'Active', '2023-01-09 19:26:54'),
(715, 18, 2, 'Compas de castro viejo', 'Compas de castro viejo', 1, 0, '2', 'Active', '2023-01-09 19:27:38'),
(718, 18, 2, 'Cucharilla de Chalazión', 'Cucharilla de Chalazión', 1, 0, '2', 'Active', '2023-01-09 19:27:57'),
(719, 18, 2, 'Cucharilla de enuclación de Wells', 'Cucharilla de enuclación de Wells', 1, 0, '2', 'Active', '2023-01-09 19:28:19'),
(721, 18, 2, 'Dilatadores  lacrimales de Bowman', 'Dilatadores  lacrimales de Bowman', 3, 0, '2', 'Active', '2023-01-09 19:28:36'),
(723, 18, 2, 'Espátulas de Iris  de Wecker', 'Espátulas de Iris  de Wecker', 1, 0, '2', 'Active', '2023-01-09 19:28:52'),
(725, 18, 2, 'Espátula doble de ciclodiálisis', 'Espátula doble de ciclodiálisis', 1, 0, '2', 'Active', '2023-01-09 19:29:09'),
(727, 18, 2, 'Gancho de múculo de Jamenson', 'Gancho de múculo de Jamenson', 1, 0, '2', 'Active', '2023-01-09 19:29:48'),
(729, 18, 2, 'pinza Baby mosquiro curva', 'pinza Baby mosquiro curva', 1, 0, '2', 'Active', '2023-01-09 19:30:04'),
(731, 18, 2, 'Pinza mosquito recta', 'Pinza mosquito recta', 1, 0, '2', 'Active', '2023-01-09 19:30:26'),
(733, 18, 2, 'Pinza Punto tres (.3)', 'Pinza Punto tres (.3)', 2, 0, '2', 'Active', '2023-01-09 19:31:29'),
(735, 18, 2, 'Pinza punto doce (.12)', 'Pinza punto doce (.12)', 2, 0, '2', 'Active', '2023-01-09 19:31:51'),
(737, 18, 2, 'Pinza anudadora o Relojero', 'Pinza anudadora o Relojero', 1, 0, '2', 'Active', '2023-01-09 19:32:12'),
(739, 18, 2, 'Pinza de sutura de castroviejo', 'Pinza de sutura de castroviejo', 1, 0, '2', 'Active', '2023-01-09 19:32:34'),
(741, 18, 2, 'Pinza Mc Pherson', 'Pinza Mc Pherson', 1, 0, '2', 'Active', '2023-01-09 19:33:10'),
(743, 18, 2, 'Pinza de músculo de Jamenson', 'Pinza de músculo de Jamenson', 1, 0, '2', 'Active', '2023-01-09 19:33:46'),
(745, 18, 2, 'Tijera  de Iris (Wecker)', 'Tijera  de Iris (Wecker)', 1, 0, '2', 'Active', '2023-01-09 19:34:02'),
(747, 18, 2, 'Tijera central de cornea', 'Tijera central de cornea', 1, 0, '2', 'Active', '2023-01-09 19:34:18'),
(749, 18, 2, 'mango de bisturi N° 7', 'mango de bisturi N° 7', 1, 0, '2', 'Active', '2023-01-09 19:35:00'),
(751, 19, 2, 'Pinza Cístico', 'Pinza Cístico', 6, 0, '2', 'Active', '2023-01-09 19:37:28'),
(753, 19, 2, 'Pinza Mixter', 'Pinza Mixter', 1, 0, '2', 'Active', '2023-01-09 19:37:53'),
(755, 19, 2, 'Dilatadores o Sondas Biliares N° 8', 'Dilatadores o Sondas Biliares N° 8', 2, 0, '2', 'Active', '2023-01-09 19:38:31'),
(757, 19, 2, 'Pinzas Randall', 'Pinzas Randall', 4, 0, '2', 'Active', '2023-01-09 19:38:55'),
(759, 19, 2, 'Trocares de Ochsner', 'Trocares de Ochsner', 2, 0, '2', 'Active', '2023-01-09 19:39:15'),
(761, 19, 2, 'Tijera de Pott x 18 cm', 'Tijera de Pott x 18 cm', 1, 0, '2', 'Active', '2023-01-09 19:39:41'),
(763, 20, 2, 'Clamps de Brunner', 'Clamps de Brunner', 1, 0, '2', 'Active', '2023-01-09 19:42:40'),
(765, 20, 2, 'Clamps de Doyen', 'Clamps de Doyen', 1, 0, '2', 'Active', '2023-01-09 19:43:08'),
(767, 20, 2, 'Clamps de Payr', 'Clamps de Payr', 2, 0, '2', 'Active', '2023-01-09 19:43:42'),
(769, 21, 2, 'Especulo Anal de Seem', 'Especulo Anal de Seem', 2, 0, '2', 'Active', '2023-01-09 19:44:19'),
(771, 21, 2, 'Anoscopio de Hirschmann', 'Anoscopio de Hirschmann', 1, 0, '2', 'Active', '2023-01-09 19:44:41'),
(773, 22, 2, 'Atornillador Hegagonal de 2,5 mm', 'Atornillador Hegagonal de 2,5 mm', 2, 0, '2', 'Active', '2023-01-09 19:45:47'),
(775, 22, 2, 'Medidor de profundidad de 60 mm', 'Medidor de profundidad de 60 mm', 1, 0, '2', 'Active', '2023-01-09 19:46:05'),
(777, 22, 2, 'Guia roscada de 3,0 mm larga', 'Guia roscada de 3,0 mm larga', 4, 0, '2', 'Active', '2023-01-09 19:46:32'),
(779, 22, 2, 'Guia de broca de 2,2 mm', 'Guia de broca de 2,2 mm', 2, 0, '2', 'Active', '2023-01-09 19:47:05'),
(781, 22, 2, 'Guia de broca de 3,0 mm corta', 'Guia de broca de 3,0 mm corta', 2, 0, '2', 'Active', '2023-01-09 19:47:30'),
(783, 22, 2, 'Guia de broca de 3,0 mm larga', 'Guia de broca de 3,0 mm larga', 2, 0, '2', 'Active', '2023-01-09 19:47:45'),
(785, 22, 2, 'Camisa para guía de broca de 2,5', 'Camisa para guía de broca de 2,5', 1, 0, '2', 'Active', '2023-01-09 19:48:16'),
(787, 22, 2, 'Broca de 2,0 mm', 'Broca de 2,0 mm', 2, 0, '2', 'Active', '2023-01-09 19:48:34'),
(789, 22, 2, 'Broca de 2,5 mm', 'Broca de 2,5 mm', 2, 0, '2', 'Active', '2023-01-09 19:48:54'),
(791, 22, 2, 'Broca de 3,5 mm', 'Broca de 3,5 mm', 1, 0, '2', 'Active', '2023-01-09 19:49:21'),
(793, 22, 2, 'Broca de 2,8  mm milimetrada corta', 'Broca de 2,8  mm milimetrada corta', 2, 0, '2', 'Active', '2023-01-09 19:49:41'),
(796, 22, 2, 'Broca de 2,8  mm milimetrada larga', 'Broca de 2,8  mm milimetrada larga', 2, 0, '2', 'Active', '2023-01-09 19:50:43'),
(798, 22, 2, 'Sujetador de tornillo', 'Sujetador de tornillo', 1, 0, '2', 'Active', '2023-01-09 19:51:02'),
(801, 22, 2, 'Mango en T de acople rápido', 'Mango en T de acople rápido', 1, 0, '2', 'Active', '2023-01-09 19:51:34'),
(802, 22, 2, 'Avellanador  de 6,5 mm', 'Avellanador  de 6,5 mm', 1, 0, '2', 'Active', '2023-01-09 19:52:03'),
(804, 22, 2, 'Tarraja de 3,5 mm', 'Tarraja de 3,5 mm', 1, 0, '2', 'Active', '2023-01-09 19:52:29'),
(806, 22, 2, 'Tarraja para cortical de 3,5 mm', 'Tarraja para cortical de 3,5 mm', 1, 0, '2', 'Active', '2023-01-09 19:52:55'),
(808, 22, 2, 'Tarraja para esponjoso de 4,0 mm', 'Tarraja para esponjoso de 4,0 mm', 1, 0, '2', 'Active', '2023-01-09 19:53:18'),
(810, 22, 2, 'Tornillo de extracción cónoco de 2,5 mm', 'Tornillo de extracción cónoco de 2,5 mm', 1, 0, '2', 'Active', '2023-01-09 19:53:38'),
(812, 22, 2, 'Barra dobladora E', 'Barra dobladora E', 1, 0, '2', 'Active', '2023-01-09 19:53:58'),
(815, 22, 2, 'Barra dobladora F', 'Barra dobladora F', 1, 0, '2', 'Active', '2023-01-09 19:54:16'),
(817, 22, 2, 'Guia doble de broca Lc-Dcp de 2,5 mm', 'Guia doble de broca Lc-Dcp de 2,5 mm', 1, 0, '2', 'Active', '2023-01-09 19:54:34'),
(820, 22, 2, 'Guia doble de broca de 2,5/3,5 mm', 'Guia doble de broca de 2,5/3,5 mm', 1, 0, '2', 'Active', '2023-01-09 19:54:55'),
(823, 22, 2, 'Guia doble de broca 2,0/4,0 mm', 'Guia doble de broca 2,0/4,0 mm', 1, 0, '2', 'Active', '2023-01-09 19:55:32'),
(825, 22, 2, 'Punta atornillador hexagonal con acople rápido 2,5', 'Punta atornillador hexagonal con acople rápido 2,5', 1, 0, '2', 'Active', '2023-01-09 19:56:30'),
(828, 22, 2, 'Llave de 4,5 mm', 'Llave de 4,5 mm', 1, 0, '2', 'Active', '2023-01-09 19:58:10'),
(830, 22, 2, 'Punta atornillador hexagonal para motor 2,5', 'Punta atornillador hexagonal para motor 2,5', 1, 0, '2', 'Active', '2023-01-09 19:58:43'),
(832, 22, 2, 'Mango atornillador con limitador  de torque de 1,5 N', 'Mango atornillador con limitador  de torque de 1,5 N', 1, 0, '2', 'Active', '2023-01-09 19:59:06'),
(834, 22, 2, 'Pinza de reducción autocentrante', 'Pinza de reducción autocentrante', 3, 0, '2', 'Active', '2023-01-09 19:59:49'),
(836, 22, 2, 'Pinza de reducción española', 'Pinza de reducción española', 1, 0, '2', 'Active', '2023-01-09 20:00:31'),
(838, 22, 2, 'Medidor de profundidad de 100 mm', 'Medidor de profundidad de 100 mm', 1, 0, '2', 'Active', '2023-01-09 20:01:08'),
(840, 23, 2, 'PERFORADOR CANULADO', 'PERFORADOR CANULADO', 1, 0, '2', 'Active', '2023-01-09 20:02:14'),
(842, 23, 2, 'BATERIAS RECARGABLE', 'BATERIAS RECARGABLE', 2, 0, '2', 'Active', '2023-01-09 20:02:35'),
(844, 23, 2, 'CARGADOR DE BATERIAS', 'CARGADOR DE BATERIAS', 1, 0, '2', 'Active', '2023-01-09 20:02:55'),
(846, 23, 2, 'INTERCAMBIADOR', 'INTERCAMBIADOR', 2, 0, '2', 'Active', '2023-01-09 20:03:15'),
(848, 23, 2, 'JACOBS   LLAVE', 'JACOBS   LLAVE', 1, 0, '2', 'Active', '2023-01-09 20:03:38'),
(850, 23, 2, 'ACOPLE ANCLAJE RAPIDO', 'ACOPLE ANCLAJE RAPIDO', 1, 0, '2', 'Active', '2023-01-09 20:03:57'),
(852, 24, 2, 'TELEVISOR INTERACTIVO   BASE ROTATORIA', 'TELEVISOR INTERACTIVO   BASE ROTATORIA', 1, 0, '2', 'Active', '2023-01-09 20:04:29'),
(854, 24, 2, 'CONTROL REMOTO', 'CONTROL REMOTO', 1, 0, '2', 'Active', '2023-01-09 20:04:48'),
(856, 24, 2, 'INDICADOR DE TELEVISOR ROJO', 'INDICADOR DE TELEVISOR ROJO', 1, 0, '2', 'Active', '2023-01-09 20:05:06'),
(858, 25, 2, 'SIMULADOR DE LAPAROSCOPIA', 'SIMULADOR DE LAPAROSCOPIA', 1, 0, '2', 'Active', '2023-01-09 20:05:41'),
(860, 25, 2, 'TELEVISOR EXCLUSIVA', 'TELEVISOR EXCLUSIVA', 1, 0, '2', 'Active', '2023-01-09 20:06:02'),
(862, 25, 2, 'CONTROL REMOTO', 'CONTROL REMOTO', 1, 0, '2', 'Active', '2023-01-09 20:06:18'),
(864, 25, 2, 'PINZAS DE LAPAROSCOPIA', 'PINZAS DE LAPAROSCOPIA', 3, 0, '2', 'Active', '2023-01-09 20:06:36'),
(866, 25, 2, 'BAJA NUDO', 'BAJA NUDO', 1, 0, '2', 'Active', '2023-01-09 20:06:51');
INSERT INTO `instrum_instrumentos` (`id`, `idReferencia`, `idCategorias`, `title`, `description`, `inventario`, `reservado`, `tipo`, `status`, `maj`) VALUES
(868, 14, 1, '1 CC ', '1 CC', 1, 0, '1', 'Active', '2023-01-10 17:06:28'),
(869, 14, 1, '3 CC', '3 CC ', 1, 0, '1', 'Active', '2023-01-10 17:06:50'),
(870, 14, 1, '5 CC ', '5 CC ', 1, 0, '1', 'Active', '2023-01-10 17:07:07'),
(871, 14, 1, '10 CC ', '10 CC ', 1, 0, '1', 'Active', '2023-01-10 17:07:25'),
(872, 14, 1, '20 CC ', '20  CC ', 1, 0, '1', 'Active', '2023-01-10 17:07:45'),
(873, 14, 1, '50 CC', '50 CC ', 2, 0, '1', 'Active', '2023-01-10 17:08:06'),
(874, 14, 1, '60 CC punta catéter ', '60 CC punta catéter ', 1, 0, '1', 'Active', '2023-01-10 17:08:34'),
(875, 15, 1, 'N* 18 ', 'N* 18 ', 1, 0, '1', 'Active', '2023-01-10 17:09:12'),
(876, 15, 1, 'N* 20', 'N* 20', 1, 0, '1', 'Active', '2023-01-10 17:09:33'),
(877, 15, 1, 'N* 21', 'N* 21', 1, 0, '1', 'Active', '2023-01-10 17:09:53'),
(878, 15, 1, 'N* 22', 'N* 22', 1, 0, '1', 'Active', '2023-01-10 17:10:12'),
(879, 15, 1, 'N* 23', 'N* 23', 1, 0, '1', 'Active', '2023-01-10 17:10:30'),
(880, 15, 1, 'N* 25', 'N* 25', 1, 0, '1', 'Active', '2023-01-10 17:10:45'),
(881, 15, 1, 'N* 27', 'N* 27', 1, 0, '1', 'Active', '2023-01-10 17:11:02'),
(882, 15, 1, 'N* 30', 'N* 30', 1, 0, '1', 'Active', '2023-01-10 17:11:25'),
(883, 16, 1, '14 G ', '14 G ', 1, 0, '1', 'Active', '2023-01-10 17:12:10'),
(884, 16, 1, '16 G ', '16 G ', 1, 0, '1', 'Active', '2023-01-10 17:12:24'),
(885, 16, 1, '18 G ', '18 G ', 1, 0, '1', 'Active', '2023-01-10 17:12:44'),
(886, 16, 1, '20 G ', '20 G ', 1, 0, '1', 'Active', '2023-01-10 17:12:56'),
(887, 16, 1, '22 G ', '22 G ', 1, 0, '1', 'Active', '2023-01-10 17:13:12'),
(888, 16, 1, '24 G ', '24 G ', 1, 0, '1', 'Active', '2023-01-10 17:13:26'),
(889, 16, 1, 'CVC ', 'CVC', 1, 0, '1', 'Active', '2023-01-10 17:13:45'),
(890, 17, 1, 'N* 6 ', 'N* 6 ', 1, 0, '1', 'Active', '2023-01-10 17:14:23'),
(891, 17, 1, 'N* 6 1/2 ', 'N* 6 1/2 ', 1, 0, '1', 'Active', '2023-01-10 17:15:00'),
(892, 17, 1, 'N* 7 ', 'N* 7 ', 1, 0, '1', 'Active', '2023-01-10 17:15:19'),
(893, 17, 1, 'N* 7 1/2 ', 'N* 7 1/2 ', 1, 0, '1', 'Active', '2023-01-10 17:15:38'),
(894, 17, 1, 'N* 8', 'N* 8 ', 1, 0, '1', 'Active', '2023-01-10 17:15:55'),
(895, 17, 1, 'N* 8 1/2 ', 'N* 8 1/2 ', 1, 0, '1', 'Active', '2023-01-10 17:16:13'),
(896, 3, 1, 'Tela ', 'Tela ', 1, 0, '1', 'Active', '2023-01-10 17:19:19'),
(897, 18, 1, 'Perforador canulado ', 'Perforador canulado ', 1, 0, '1', 'Active', '2023-01-10 17:20:44'),
(898, 18, 1, 'Simulador de anatomía ', 'Simulador de anatomía ', 1, 0, '1', 'Active', '2023-01-10 17:21:05'),
(899, 18, 1, 'Simulador de laparoscopia ', 'Simulador de laparoscopia ', 1, 0, '1', 'Active', '2023-01-10 17:21:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrum_referencia`
--

CREATE TABLE `instrum_referencia` (
  `id` int(11) NOT NULL,
  `IdCategorias` varchar(2) NOT NULL DEFAULT '1',
  `idReferencia` char(1) NOT NULL DEFAULT '1',
  `title` text NOT NULL,
  `description` text NOT NULL,
  `inventario` int(11) NOT NULL,
  `reservado` int(11) NOT NULL,
  `status` varchar(15) NOT NULL,
  `maj` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `instrum_referencia`
--

INSERT INTO `instrum_referencia` (`id`, `IdCategorias`, `idReferencia`, `title`, `description`, `inventario`, `reservado`, `status`, `maj`) VALUES
(1, '1', '1', 'CANASTA DE LAPAROTOMIA ADULTO ', 'CANASTA DE LAPAROTOMIA ADULTO ', 1, 6, 'Active', '2023-01-07 02:11:23'),
(2, '1', '1', 'CANASTA DE LAPAROTOMIA ADULTO No. 2 REFERENCIA 002', 'CANASTA DE LAPAROTOMIA ADULTO ', 1, 0, 'Active', '2023-01-07 02:11:36'),
(3, '1', '1', 'CANASTA DE MEDIANA REFERENCIA 003', 'CANASTA DE LAPAROTOMIA ADULTO No. 2 REFERENCIA 002', 1, 0, 'Active', '2023-01-07 02:12:19'),
(4, '1', '1', 'CANASTA DE LAPAROTOMIA INFANTIL REFERENCIA 004', 'CANASTA DE LAPAROTOMIA INFANTIL REFERENCIA 004', 1, 0, 'Active', '2023-01-07 02:13:20'),
(5, '1', '1', 'CANASTA DE ORTOPEDIA REFENCIA 005', 'CANASTA DE ORTOPEDIA REFENCIA 005', 1, 0, 'Active', '2023-01-07 02:13:34'),
(6, '1', '1', 'CANASTA DE TORAX REFERENCIA 006', 'CANASTA DE TORAX REFERENCIA 006', 1, 1, 'Active', '2023-01-07 02:13:45'),
(7, '1', '1', 'CANASTA VASCULAR GENERAL REFERENCIA 007', 'CANASTA VASCULAR GENERAL REFERENCIA 007', 1, 2, 'Active', '2023-01-07 02:13:56'),
(8, '1', '1', 'CANASTA VASCULAR PERIFERICO REFERENCIA 008', 'CANASTA VASCULAR PERIFERICO REFERENCIA 008', 1, 0, 'Active', '2023-01-07 02:14:06'),
(9, '1', '1', 'CANASTA DE OTORRINOLARINGOLOGIA REFERENCIA 009', 'CANASTA DE OTORRINOLARINGOLOGIA REFERENCIA 009', 1, 0, 'Active', '2023-01-07 02:14:18'),
(10, '1', '1', 'CANASTA DE MICROCIRUGIA (NEUROCIRUGIA) REFERNCIA 010', 'CANASTA DE MICROCIRUGIA (NEUROCIRUGIA) REFERNCIA 010', 1, 0, 'Active', '2023-01-07 02:14:31'),
(11, '1', '1', 'CANASTA DE CIERRE DE HERIDAS No. 1 REFERENCIA 011', 'CANASTA DE CIERRE DE HERIDAS No. 1 REFERENCIA 011', 1, 0, 'Active', '2023-01-07 02:14:49'),
(12, '1', '1', 'CANASTA DE CIERRE DE HERIDAS No. 2 REFERENCIA 012', 'CANASTA DE CIERRE DE HERIDAS No. 2 REFERENCIA 012', 1, 0, 'Active', '2023-01-07 02:15:07'),
(13, '1', '1', 'CANASTA GINECOLOGICA ABDOMINAL REFERENCIA 013', 'CANASTA GINECOLOGICA ABDOMINAL REFERENCIA 013', 1, 0, 'Active', '2023-01-07 02:15:19'),
(14, '1', '1', 'CANASTA NEUROCIRUGIA REFERENCIA 014', 'CANASTA NEUROCIRUGIA REFERENCIA 014', 1, 0, 'Active', '2023-01-07 02:15:31'),
(15, '1', '1', 'CANASTA GINECOLOGIA VAGINAL REFERENCIA 015', 'CANASTA GINECOLOGIA VAGINAL REFERENCIA 015', 1, 0, 'Active', '2023-01-07 02:15:44'),
(16, '1', '1', 'CANASTA UROLOGIA REFERENCIA 016', 'CANASTA UROLOGIA REFERENCIA 016', 1, 0, 'Active', '2023-01-07 02:15:56'),
(17, '1', '1', 'CANASTA DE PEQUEÑA CIRUGIA REFERENCIA 017', 'CANASTA DE PEQUEÑA CIRUGIA REFERENCIA 017', 1, 0, 'Active', '2023-01-07 02:16:06'),
(18, '1', '1', 'CANASTA OFTALMOLOGIA REFERENCIA 018', 'CANASTA OFTALMOLOGIA REFERENCIA 018', 1, 0, 'Active', '2023-01-07 02:16:15'),
(19, '1', '1', 'CANASTA DE VIAS BILIARES REFERENCIA 019', 'CANASTA DE VIAS BILIARES REFERENCIA 019', 1, 0, 'Active', '2023-01-07 02:16:24'),
(20, '1', '1', 'CANASTA DE CLANES INTESTINALES REFERENCIA 020', 'CANASTA DE CLANES INTESTINALES REFERENCIA 020', 1, 0, 'Active', '2023-01-07 02:16:34'),
(21, '1', '1', 'CANASTA DE PROCTOLOGIA REFERENCIA 021', 'CANASTA DE PROCTOLOGIA REFERENCIA 021', 1, 0, 'Active', '2023-01-07 02:16:43'),
(22, '1', '1', 'SISTEMA  DE 3,5 MM REFERENCIA 022', 'SISTEMA  DE 3,5 MM REFERENCIA 022', 1, 0, 'Active', '2023-01-07 02:16:52'),
(23, '1', '1', 'PERFORADOR CANULADO REFERENCIA 023', 'PERFORADOR CANULADO REFERENCIA 023', 1, 0, 'Active', '2023-01-07 02:17:06'),
(24, '1', '1', 'TELEVISOR INTERACTIVO REFERENCIA 024', 'TELEVISOR INTERACTIVO REFERENCIA 024', 1, 0, 'Active', '2023-01-07 02:17:15'),
(25, '1', '1', 'SIMULADOR DE LAPAROSCOPIA REFERENCIA 025', 'SIMULADOR DE LAPAROSCOPIA REFERENCIA 025', 1, 0, 'Active', '2023-01-07 02:17:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrum_usuarios`
--

CREATE TABLE `instrum_usuarios` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `role` varchar(15) NOT NULL,
  `token` text NOT NULL,
  `clave` varchar(255) NOT NULL,
  `status` varchar(15) NOT NULL,
  `maj` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `instrum_usuarios`
--

INSERT INTO `instrum_usuarios` (`id`, `username`, `password`, `nombres`, `apellidos`, `role`, `token`, `clave`, `status`, `maj`) VALUES
(1, 'carolaraujo', 'U2FsdGVkX18PBfvFbeJ7Lp0bzfXsoqBOIw t92X2lJU=', 'MARIA CAROLINA', 'ARAUJO ARZUAGA ', 'Docente', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI', 'mariac2023', 'Active', '2023-01-14 02:11:18'),
(3, 'Admin', 'U2FsdGVkX1 syGvGbsVJGHnEumw oJk7t1k7GHsPAVQ=', 'Administrador ', 'Principal', 'Admin', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI', 'admin2023', 'Active', '2023-01-14 02:09:43');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `instrum_calendario`
--
ALTER TABLE `instrum_calendario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IdCategorias` (`IdCategorias`);

--
-- Indices de la tabla `instrum_categorias`
--
ALTER TABLE `instrum_categorias`
  ADD PRIMARY KEY (`IdCategorias`);

--
-- Indices de la tabla `instrum_instrumentos`
--
ALTER TABLE `instrum_instrumentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IdReferencia` (`idReferencia`);

--
-- Indices de la tabla `instrum_referencia`
--
ALTER TABLE `instrum_referencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `instrum_usuarios`
--
ALTER TABLE `instrum_usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `instrum_calendario`
--
ALTER TABLE `instrum_calendario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `instrum_categorias`
--
ALTER TABLE `instrum_categorias`
  MODIFY `IdCategorias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `instrum_instrumentos`
--
ALTER TABLE `instrum_instrumentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=900;

--
-- AUTO_INCREMENT de la tabla `instrum_referencia`
--
ALTER TABLE `instrum_referencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `instrum_usuarios`
--
ALTER TABLE `instrum_usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
