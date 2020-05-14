-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 14, 2020 at 01:56 PM
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
  `image_url` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `billo_event`
--

INSERT INTO `billo_event` (`id`, `event_name`, `image_url`, `status`) VALUES
(44, 'SDFS', '/Images/EventImages/GBWA-20180317184017.jpg', 'inactive'),
(45, 'EWFW', '/Images/EventImages/enoch.jpg', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `EWFW`
--

CREATE TABLE `EWFW` (
  `id` int(11) NOT NULL,
  `contestant_name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `votes` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `EWFW`
--

INSERT INTO `EWFW` (`id`, `contestant_name`, `image_path`, `votes`) VALUES
(1, 'ewwe', '/Images/GBWA-20180704204008.jpg', 3452),
(2, 'ewweewer ewef', '/Images/enoch.jpg', 123);

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
(6, 'lawrence', '2020-03-06 22:10:20'),
(7, 'law', '2020-03-17 02:47:37'),
(8, 'law', '2020-03-17 02:52:22'),
(9, 'law', '2020-03-17 02:54:09'),
(10, 'lawrence', '2020-03-17 03:07:24'),
(11, 'lawrence', '2020-03-17 04:26:30'),
(12, 'lawrence', '2020-04-28 19:19:29'),
(13, 'lawrence', '2020-04-28 19:38:33'),
(14, 'lawrence', '2020-04-28 19:39:40'),
(15, 'lawrence', '2020-04-28 19:44:36'),
(16, 'lawrence', '2020-04-28 19:46:37'),
(17, 'lawrence', '2020-04-28 19:54:07'),
(18, 'lawrence', '2020-04-28 20:05:22'),
(19, 'law', '2020-05-07 16:42:02'),
(20, 'law', '2020-05-07 16:43:16'),
(21, 'law', '2020-05-07 16:45:32'),
(22, 'law', '2020-05-07 16:48:59'),
(23, 'law', '2020-05-07 16:49:16'),
(24, 'law', '2020-05-07 17:30:52'),
(25, 'law', '2020-05-07 17:31:26'),
(26, 'law', '2020-05-08 05:16:40'),
(27, 'law', '2020-05-08 06:01:33'),
(28, 'law', '2020-05-08 06:13:53'),
(29, 'law', '2020-05-12 17:44:21'),
(30, 'law', '2020-05-13 00:40:40'),
(31, 'law', '2020-05-13 01:45:57');

-- --------------------------------------------------------

--
-- Table structure for table `SDFS`
--

CREATE TABLE `SDFS` (
  `id` int(11) NOT NULL,
  `contestant_name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `votes` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `SDFS`
--

INSERT INTO `SDFS` (`id`, `contestant_name`, `image_path`, `votes`) VALUES
(1, 'dsddsd', '/Images/GBWA-20180221185035.jpg', 323),
(2, 'dsddsddsdfs', '/Images/GBWA-20181215075141.jpg', 433);

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
(1, 'MBILO-1588902633', 'MEDIA BILLO VOTING', '0241585537', 'VOD', '887852', 'pending', 'GHANA MOST BEAUTIFUL EVENT NAME IN SOME EVENT', '2', 55, '2020-05-08 02:26:53');

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
-- Indexes for table `EWFW`
--
ALTER TABLE `EWFW`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SDFS`
--
ALTER TABLE `SDFS`
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
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `EWFW`
--
ALTER TABLE `EWFW`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `SDFS`
--
ALTER TABLE `SDFS`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
