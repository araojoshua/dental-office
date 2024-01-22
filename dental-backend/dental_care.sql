-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2024 at 02:12 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dental_care`
--
CREATE DATABASE IF NOT EXISTS `dental_care` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dental_care`;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `serviceId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `appointmentDate` datetime DEFAULT NULL,
  `dentist_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `serviceId`, `firstName`, `lastName`, `phoneNumber`, `email`, `appointmentDate`, `dentist_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Joseph', 'King', '+639171080235', 'xaxac10360@ikuromi.com', '2024-01-21 08:55:00', NULL, 'Scheduled', '2024-01-21 11:54:56', '2024-01-21 11:54:56'),
(2, 2, 'Lui', 'Kang', 'wogexal420@tsderp.co', 'wogexal420@tsderp.com', '2024-01-21 10:06:00', NULL, 'Scheduled', '2024-01-21 12:05:39', '2024-01-21 12:05:39'),
(3, 1, 'Luigi', 'Nintendo', '092312312399', 'wogexal420@tsderp.com', '2024-01-21 00:15:00', NULL, 'Scheduled', '2024-01-21 12:14:24', '2024-01-21 12:14:24'),
(4, 1, 'Lui', 'sy', '+639171080235', 'dijeg15123@konican.com', '2024-01-21 12:32:00', NULL, 'Scheduled', '2024-01-21 13:33:19', '2024-01-21 13:33:19'),
(5, 1, 'Lui', 'Nintendo', '+639171080235', 'dijeg15123@konican.com', '2024-01-21 00:34:00', NULL, 'Scheduled', '2024-01-21 13:34:14', '2024-01-21 13:34:14');

-- --------------------------------------------------------

--
-- Table structure for table `dentists`
--

DROP TABLE IF EXISTS `dentists`;
CREATE TABLE `dentists` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` varchar(20) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dentists`
--

INSERT INTO `dentists` (`id`, `firstname`, `lastname`, `email`, `number`, `status`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '1234567890', 'Active'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '9876543210', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `description`, `price`) VALUES
(1, 'Teeth Cleaning', 'Many dentists recommend a cleaning every six months, and some recommend once a year. Either way, it’s a very important part of oral health. Your own toothbrush will never be as efficient as the tools a dentist uses to clean your teeth.', 500.00),
(2, 'Tooth Extraction', 'If your teeth are crooked or discoloured, your dentist might recommend veneers. These are very popular solutions to common tooth problems. It’s essentially a thin covering placed over the front section of a tooth or set of teeth. ', 500.00),
(3, 'Fillings', 'Cavities are all too common and all too easy to get. For most cavities, a filling is the recommended answer. Acids in food and inside your body can easily break down tooth enamel if overexposed.', 250.00),
(4, 'Root Canal', ' A root canal means the tissue inside or under your tooth is infected and inflamed. To get rid of the pain, the dentist needs to deaden the nerve and remove the tissue. Sometimes you may need to take an antibiotic before the procedure.', 1500.00),
(5, 'Braces', 'The goal is to straighten and correct crooked teeth, as straighter teeth are often healthier and easier to take care of. Classic braces use metal and other materials to slowly tighten teeth back into place. ', 3500.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `phone`, `password`, `registration_date`, `status`) VALUES
(1, 'Joseph', 'King', 'xaxac10360@ikuromi.com', '+639171080235', 'bnMlgEllhi', '2024-01-21 11:54:56', 'pending'),
(2, 'Lui', 'Kang', 'wogexal420@tsderp.com', 'wogexal420@tsderp.co', 'MCenBGfMTd', '2024-01-21 12:05:39', 'pending'),
(3, 'Lui', 'sy', 'dijeg15123@konican.com', '+639171080235', 'tnEW5RdKNH', '2024-01-21 13:33:19', 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dentists`
--
ALTER TABLE `dentists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dentists`
--
ALTER TABLE `dentists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
