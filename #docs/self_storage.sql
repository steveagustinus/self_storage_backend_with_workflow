-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 29, 2024 at 02:39 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `self_storage`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `uploaded_at` datetime NOT NULL,
  `last_access` datetime NOT NULL,
  `fieldname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `originalname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `encoding` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mimetype` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `destination` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `filename` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `size` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `availability`, `uploaded_at`, `last_access`, `fieldname`, `originalname`, `encoding`, `mimetype`, `destination`, `filename`, `path`, `size`) VALUES
(2, 1, '2024-02-29 20:15:12', '2024-02-29 20:39:02', 'file', 'Screenshot (2).png', '7bit', 'image/png', 'uploads/', '1709212512321-Screenshot (2).png', 'uploads\\1709212512321-Screenshot (2).png', '5000638'),
(3, 1, '2024-02-29 20:36:10', '2024-02-29 20:38:06', 'file', 'Weak (SWV) - ARCHIPELAGIO MUSIC.mp3', '7bit', 'audio/mpeg', 'uploads/', '1709213769871-Weak (SWV) - ARCHIPELAGIO MUSIC.mp3', 'uploads\\1709213769871-Weak (SWV) - ARCHIPELAGIO MUSIC.mp3', '10693732');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
