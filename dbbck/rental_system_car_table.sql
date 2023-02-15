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
-- Table structure for table `car_table`
--

DROP TABLE IF EXISTS `car_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_table` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(25) NOT NULL,
  `model` varchar(25) NOT NULL,
  `amount` int NOT NULL,
  `fuel` varchar(10) NOT NULL,
  `reg_no` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Available',
  `segment` varchar(25) NOT NULL,
  `kms` int NOT NULL,
  `transmission` varchar(20) NOT NULL,
  `no_of_seat` int NOT NULL,
  PRIMARY KEY (`car_id`),
  UNIQUE KEY `reg_no_UNIQUE` (`reg_no`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_table`
--

LOCK TABLES `car_table` WRITE;
/*!40000 ALTER TABLE `car_table` DISABLE KEYS */;
INSERT INTO `car_table` VALUES (14,'Volkswagen','Polo',12000,'Diesel','KL 57 A 2255','Available','Hatchback',12000,'Manual',5),(20,'Nissan ','Micra',1230,'Petrol','KL 57 A 2251','Available','Hatchback',12633,'Automatic',5),(21,'Maruti Suzuki ','Swift (MT)',1800,'Petrol','KL 57 A 2252','Available','Hatchback',6500,'Manual',5),(22,'Volkswagen ','Polo (MT)',1700,'Diesel','KL 57 A 2256','Available','Hatchback',11000,'Manual',5),(23,'Maruti Suzuki ','Wagon R (MT)',1700,'Petrol','KL 57 A 2253','Available','Hatchback',18200,'Manual',5),(24,'Maruti Suzuki ','Swift (AT)',1900,'Petrol','KL 57 A 2254','Available','Hatchback',13200,'Automatic',5),(25,'Nissan ','Sunny (MT)',1900,'Diesel','KL 57 A 2257','Available','Sedan',12333,'Manual',5),(26,'Volkswagen ','Vento (AT)',2500,'Petrol','KL 57 A 2258','Available','Sedan',14500,'Automatic',5),(27,'Nissan ','Magnite (AT)',2700,'Petrol','KL 57 A 2259','Available','SUV',23000,'Automatic',5),(29,'Toyota',' Innova Crysta (AT)',3900,'Diesel','KL 57 A 2261','Available','MUV',25000,'Automatic',6),(30,'Mahindra ','Marazzo (MT)',3192,'Diesel','KL 57 A 2260','Available','MUV',29322,'Manual',7),(31,'Datsun ','Redi Go (AT)',1200,'Petrol','KL 57 A 2264','Available','Hatchback',12003,'Automatic',5),(33,'Hundai','Creata',1500,'Petrol','KL 57 A 6699','Available','SUV',6899,'Manual',5),(34,'Maruti Suzuki ','Swift Dzire',1900,'Diesel','KL 57 A 2287','Available','Sedan',5500,'Manual',5),(35,'Maruti Suzuki ','Ignis',1900,'Petrol','KL 57 A 2100','Available','Hatchback',9020,'Automatic',5),(36,'Honda','City',2000,'Petrol','KL 57 A 2889','Available','Sedan',12020,'Manual',5),(37,'Maruti Suzuki ','Brezza',2100,'Petrol','KL 57 A 6858','Available','SUV',5869,'Manual',5);
/*!40000 ALTER TABLE `car_table` ENABLE KEYS */;
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
