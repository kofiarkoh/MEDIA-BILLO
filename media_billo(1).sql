-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 07, 2020 at 08:41 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `media_billo`
--

-- --------------------------------------------------------

--
-- Table structure for table `billo_event`
--

CREATE TABLE `billo_event` (
  `id` int(20) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `billo_event`
--

INSERT INTO `billo_event` (`id`, `event_name`, `status`) VALUES
(34, 'MISS_AGRIC_GHANA', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `id` int(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `login_time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_logs`
--

INSERT INTO `login_logs` (`id`, `name`, `login_time`) VALUES
(1, 'law', '2020-03-06 15:03:54'),
(2, 'law', '2020-03-06 15:04:09'),
(3, 'lawrence', '2020-03-06 15:05:28'),
(4, 'law', '2020-03-06 15:27:50'),
(5, 'law', '2020-03-06 16:33:38'),
(6, 'lawrence', '2020-03-06 22:10:20');

-- --------------------------------------------------------

--
-- Table structure for table `MISS_AGRIC_GHANA`
--

CREATE TABLE `MISS_AGRIC_GHANA` (
  `id` int(11) NOT NULL,
  `contestant_name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `votes` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_logs`
--

CREATE TABLE `transaction_logs` (
  `id` int(20) NOT NULL,
  `trans_id` varchar(255) NOT NULL,
  `trans_ref` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `networkType` varchar(20) NOT NULL,
  `voucher_code` varchar(200) NOT NULL,
  `status` varchar(100) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `selected_contestant` varchar(255) NOT NULL,
  `votes` int(100) NOT NULL,
  `trans_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_logs`
--

INSERT INTO `transaction_logs` (`id`, `trans_id`, `trans_ref`, `phone_number`, `networkType`, `voucher_code`, `status`, `event_name`, `selected_contestant`, `votes`, `trans_date`) VALUES
(1, 'MBILO-1582841919', 'MEDIA BILLO VOTING', '0', '', '2434433', 'pending', 'MOST_BEAUTIFUL', '5', 50, '2020-02-27 21:54:59'),
(2, 'MBILO-1582843233', 'MEDIA BILLO VOTING', '0', '', '2434433', 'pending', 'MOST_BEAUTIFUL', '6', 129, '2020-02-27 22:16:53'),
(3, 'MBILO-1582843341', 'MEDIA BILLO VOTING', '0', '', '2434433', 'pending', 'MISS_AGRIC_GHANA', '3', 429, '2020-02-27 22:18:41'),
(4, 'MBILO-1582938719', 'MEDIA BILLO VOTING', '234567895', '', '2434433', 'pending', 'MISS_AGRIC_GHANA', '3', 429, '2020-02-29 00:48:19'),
(5, 'MBILO-1582940014', 'MEDIA BILLO VOTING', '542882913', '', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 01:09:54'),
(6, 'MBILO-1582940087', 'MEDIA BILLO VOTING', '542882913', '', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 01:11:07'),
(7, 'MBILO-1582940151', 'MEDIA BILLO VOTING', '542882913', '', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 01:12:11'),
(8, 'MBILO-1582940230', 'MEDIA BILLO VOTING', '542882913', '', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 01:13:30'),
(9, 'MBILO-1582940254', 'MEDIA BILLO VOTING', '542882913', '', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 01:13:54'),
(10, 'MBILO-1582940439', 'MEDIA BILLO VOTING', '542882913', '', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 01:16:59'),
(11, 'MBILO-1582940530', 'MEDIA BILLO VOTING', '542882913', '', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 01:18:30'),
(12, 'MBILO-1582940978', 'MEDIA BILLO VOTING', '054432882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 01:25:58'),
(13, 'MBILO-1582941007', 'MEDIA BILLO VOTING', '0542882913', 'AIR', '', 'pending', 'MOST BEAUTIFUL', '5', 21, '2020-02-29 01:26:27'),
(14, 'MBILO-1583011637', 'MEDIA BILLO VOTING', '0542882913', 'AIR', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 21:03:37'),
(15, 'MBILO-1583012912', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-02-29 21:24:52'),
(16, 'MBILO-1583027183', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MOST BEAUTIFUL', '6', 21, '2020-03-01 01:22:43'),
(17, 'MBILO-1583027376', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MOST BEAUTIFUL', '6', 21, '2020-03-01 01:25:56'),
(18, 'MBILO-1583027762', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:32:22'),
(19, 'MBILO-1583027796', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:32:56'),
(20, 'MBILO-1583028133', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:38:33'),
(21, 'MBILO-1583028165', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:39:05'),
(22, 'MBILO-1583028192', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:39:32'),
(23, 'MBILO-1583028217', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:39:57'),
(24, 'MBILO-1583028372', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:42:32'),
(25, 'MBILO-1583028401', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:43:01'),
(26, 'MBILO-1583028450', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:43:50'),
(27, 'MBILO-1583028479', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 01:44:19'),
(28, 'MBILO-1583097440', 'MEDIA BILLO VOTING', '0542882913', 'TIG', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 20:53:40'),
(29, 'MBILO-1583097502', 'MEDIA BILLO VOTING', '0542882913', 'TIG', '', 'pending', 'MISS AGRIC GHANA', '3', 2158, '2020-03-01 20:54:42'),
(30, 'MBILO-1583097565', 'MEDIA BILLO VOTING', '0542882913', 'TIG', '', 'pending', 'MISS AGRIC GHANA', '3', 2158, '2020-03-01 20:55:45'),
(31, 'MBILO-1583097621', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 20:56:41'),
(32, 'MBILO-1583097705', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 20:58:05'),
(33, 'MBILO-1583098197', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 21:06:17'),
(34, 'MBILO-1583098217', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 21:06:37'),
(35, 'MBILO-1583098253', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 21:07:13'),
(36, 'MBILO-1583098277', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 21:07:37'),
(37, 'MBILO-1583098321', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 21:08:21'),
(38, 'MBILO-1583098375', 'MEDIA BILLO VOTING', '0542882913', 'TIG', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 21:09:15'),
(39, 'MBILO-1583098421', 'MEDIA BILLO VOTING', '0542882913', 'VOD', '5555555', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 21:10:01'),
(40, 'MBILO-1583098521', 'MEDIA BILLO VOTING', '0542882913', 'VOD', '123456', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 21:11:41'),
(41, 'MBILO-1583105485', 'MEDIA BILLO VOTING', '0542882913', 'AIR', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:07:45'),
(42, 'MBILO-1583107463', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:40:43'),
(43, 'MBILO-1583107659', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:43:59'),
(44, 'MBILO-1583107671', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:44:11'),
(45, 'MBILO-1583107675', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:44:15'),
(46, 'MBILO-1583107690', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:44:30'),
(47, 'MBILO-1583107700', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:44:40'),
(48, 'MBILO-1583107714', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:44:54'),
(49, 'MBILO-1583107736', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:45:16'),
(50, 'MBILO-1583107739', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:45:19'),
(51, 'MBILO-1583107753', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:45:33'),
(52, 'MBILO-1583107761', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:45:41'),
(53, 'MBILO-1583107788', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:46:08'),
(54, 'MBILO-1583107807', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:46:27'),
(55, 'MBILO-1583107854', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:47:14'),
(56, 'MBILO-1583107856', 'MEDIA BILLO VOTING', '0542882913', 'MTN', '', 'pending', 'MISS AGRIC GHANA', '3', 21, '2020-03-01 23:47:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `status`) VALUES
(1, 'lawrence', 'lawrence', '$2y$10$3XXaPA4081LswbFuPs810.1rW2vbGMRL2aApbL3Ed8YhYdMEAjIbi', 'admin'),
(3, 'law', 'law', '$2y$10$qDgCaD1snVnwFZ0TQuzPleJ42tOIS8kqqzhN3en7.ODt0GOvE1n5O', 'nonadmin'),
(4, 'ddd', 'dd', '$2y$10$RKdHALeqVCz.eempjdduFOSgzmcZ5iWQ82a7fboz2o2v5fZu6KVl.', 'nonadmin'),
(5, 'dd', 'dd', '$2y$10$SXDHZgJTR0gvqg1N/G7zJu9pI7r/wHBApANdsbwiqiE.HrzKPF8zO', 'nonadmin'),
(6, 'cdd', 'ddsd', '$2y$10$SX9GwMH4e.3RC64aetwk9eTILRu5i2Wt9YxG8bHxgyp8.FIYeOeqe', 'nonadmin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billo_event`
--
ALTER TABLE `billo_event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MISS_AGRIC_GHANA`
--
ALTER TABLE `MISS_AGRIC_GHANA`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billo_event`
--
ALTER TABLE `billo_event`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `MISS_AGRIC_GHANA`
--
ALTER TABLE `MISS_AGRIC_GHANA`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
