-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: rental_system
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking_table`
--

DROP TABLE IF EXISTS `booking_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_table` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `picup` date NOT NULL,
  `dropoff` date NOT NULL,
  `c_id` int DEFAULT NULL,
  `u_id` int NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `b_status` varchar(20) NOT NULL DEFAULT 'Pending',
  `b_amount` int NOT NULL,
  `days` int NOT NULL,
  `d_id` int DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `car_id_idx` (`c_id`),
  KEY `user_id_idx` (`u_id`),
  KEY `driver_id_idx` (`d_id`),
  CONSTRAINT `carid` FOREIGN KEY (`c_id`) REFERENCES `car_table` (`car_id`) ON DELETE SET NULL,
  CONSTRAINT `driverid` FOREIGN KEY (`d_id`) REFERENCES `driver_table` (`driver_id`),
  CONSTRAINT `userid` FOREIGN KEY (`u_id`) REFERENCES `registration` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_table`
--

LOCK TABLES `booking_table` WRITE;
/*!40000 ALTER TABLE `booking_table` DISABLE KEYS */;
INSERT INTO `booking_table` VALUES (16,'2022-11-07','2022-11-12',31,57,'2022-11-06 14:52:16','Completed',6000,5,NULL),(18,'2022-11-10','2022-11-14',29,57,'2022-11-06 14:59:02','Completed',15600,4,NULL),(20,'2022-11-18','2022-11-19',24,61,'2022-11-17 16:58:53','Completed',1900,1,NULL),(21,'2022-11-21','2022-11-24',24,61,'2022-11-19 10:18:00','rejected',7800,3,9),(22,'2022-11-21','2022-11-23',24,61,'2022-11-19 15:30:36','Completed',5200,2,9),(24,'2022-11-23','2022-11-29',20,61,'2022-11-19 17:24:26','Completed',7380,6,NULL),(25,'2022-11-22','2022-11-25',25,57,'2022-11-19 17:38:51','Completed',7800,3,9),(26,'2022-11-21','2022-11-23',20,61,'2022-11-20 13:57:11','Completed',3860,2,9),(27,'2022-11-23','2022-11-26',23,61,'2022-11-20 13:57:54','Completed',5100,3,9),(28,'2022-11-24','2022-11-30',31,61,'2022-11-20 13:58:50','Completed',7200,6,9),(29,'2022-11-30','2022-12-02',20,61,'2022-11-20 15:04:32','cancelled',3860,2,10),(30,'2023-02-08','2023-02-15',36,61,'2023-02-06 14:40:20','Processing',18900,7,11);
/*!40000 ALTER TABLE `booking_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-15 22:54:20
