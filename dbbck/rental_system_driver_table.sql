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
-- Table structure for table `driver_table`
--

DROP TABLE IF EXISTS `driver_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver_table` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `address` varchar(100) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `exp` varchar(10) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'Not available',
  `charge` int NOT NULL DEFAULT '700',
  `l_id` int DEFAULT NULL,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  KEY `l_id_idx` (`l_id`),
  CONSTRAINT `l_id` FOREIGN KEY (`l_id`) REFERENCES `login` (`l_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver_table`
--

LOCK TABLES `driver_table` WRITE;
/*!40000 ALTER TABLE `driver_table` DISABLE KEYS */;
INSERT INTO `driver_table` VALUES (9,'JHON','Callicut','Male','3 years','7559935761','2000-12-11','Not available',700,106),(10,'JHONY','Kunnamangalam post ,kozhikode ,kerala , pin-673471','Male','4 years','8845712563','2000-11-29','Available',700,107),(11,'TONY STARK','KODUVALLY ,KOZHIKODE ,KERALA   PIN- 673572\r\n   ','Male','8 years','8546231970','1989-12-31','Available',700,108),(12,'JANGO','CALICUT','Male','3 years','5731968420','2000-12-28','Disabled',700,109),(13,'MANU','KALLANTHOD , KETTANGAL ,CALICUT\r\n      ','Male','4 years','8579612340','1999-06-21','Available',700,110);
/*!40000 ALTER TABLE `driver_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-15 22:54:21
