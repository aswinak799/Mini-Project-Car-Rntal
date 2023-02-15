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
-- Table structure for table `feedback_table`
--

DROP TABLE IF EXISTS `feedback_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_table` (
  `f_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `subject` varchar(45) NOT NULL,
  `message` varchar(400) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `response` varchar(400) DEFAULT NULL,
  `email_id` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_table`
--

LOCK TABLES `feedback_table` WRITE;
/*!40000 ALTER TABLE `feedback_table` DISABLE KEYS */;
INSERT INTO `feedback_table` VALUES (1,'JUNAID','Feedback','Very bad','2022-11-04 09:59:38','Dear JUNAID\r\nthank you','junaidt590@gmail.com','0956 299 3881'),(2,'Anjusha k','Feedback','nice ','2022-11-07 08:54:00','Dear Anjusha k\r\nthankyou','anju140296@gmail.com','7994992235'),(3,'ASWIN A K','Feedback','Nice ','2022-11-11 14:29:30','Dear ASWIN A K','aswinak799@gmail.com','0956 299 3881'),(4,'Alen','Feedback','nice','2022-11-19 06:09:33','Dear Alen\r\nthankyou','alenchristy0201@gmail.com','9856321478'),(5,'Alen','Feedback','hai','2022-11-19 06:13:41','Dear Alen\r\ngood','alenchristy0201@gmail.com','3214569870'),(6,'alen','Feedback','good','2022-11-19 06:18:43','Dear alen\r\nnice','alenchristy0201@gmail.com','9632587410'),(7,'ALEN','Feedback','good','2022-11-19 06:24:40','Dear ALEN\r\nthank you','alenchristy0201@gmail.com','0956 299 3881'),(8,'ALEN','Feedback','good','2022-11-19 06:25:51','Dear ALEN\r\nthankyou','alenchristy0201@gmail.com','0956 299 3881'),(9,'alen','Queries','dshagfewhgf','2022-11-19 06:58:53','Dear alen\r\n\r\nthank you','aswinak799@gmail.com','0956 299 3881'),(10,'ALEN','Feedback','rrr','2022-11-19 10:23:27','Dear ALEN\r\njj','alenchristy0201@gmail.com','9632854710'),(11,'ASWIN A K','Queries','how to book a car without pay money first','2022-11-20 14:12:12',NULL,'aswinak799@gmail.com','9562993881');
/*!40000 ALTER TABLE `feedback_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-15 22:54:19
