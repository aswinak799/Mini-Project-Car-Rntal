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
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `l_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `user_type` varchar(10) NOT NULL DEFAULT 'customer',
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`l_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (20,'aswinak799@gmail.com','admin','$2b$10$NXemubSlrrUiL6TiGC4Y4.QUuLNHgpx/aYMA9M3wUvyMIihWXET4u'),(96,'midhun@gmail.com','customer','$2b$10$4LcNd7VDU5QKarc9RiG/7.tmZv5Pk0QJU6XT6n5AkSWZcljpuLjwq'),(98,'anand@gmail.com','customer','$2b$10$wR14n03Q5fONu4Fwe6/TguLllWsUxnj7P9bEd/FaDAjuGMTOgELo2'),(99,'jithu@gmail.com','customer','$2b$10$NJQJGezvTcljCEueSvTzdOQYNSv0g9njuspQ19m5wkGsClWLXrkwS'),(100,'abin@gmail.com','customer','$2b$10$0a0cEooh.E4dztfs7zUOIuyCZQsegoHt7LE.qC9BnaFwJIXukUgQ6'),(101,'peter@gmail.com','customer','$2b$10$u27Py.GHodEBNzD74RpwF.KEj38b9qJE3eI0mrkqxvhUxxsJg5jUe'),(102,'marval@gmail.com','customer','$2b$10$UIbabXiibmrDZboE/iXCcuFcC5/h0VE8ixZWFunP4wxBdtMVTyOmq'),(106,'jhon@gmail.com','driver','$2b$10$./g62lTzyPSy4s/ee.b.IeYnkVZifdDi98PJdaKam1KeNet7De5Li'),(107,'jhony@gmail.com','driver','$2b$10$SxdcLnPi0gehIQozVCy1rO3BOydEVq1XI9nve5UkCfFvqOILxVPZe'),(108,'tony@gmail.com','driver','$2b$10$PZLxZk2CwNGc4bM9PBQNAetxQI92yHpqd28fHaglgiLoi9spvRrTO'),(109,'jango@gmail.com','driver','$2b$10$ph4ai92fzeAnsQCMTRVeIujqubTTQiPGsK2B95L5uUYYFUecM0y5W'),(110,'manu@gmail.com','driver','$2b$10$U0SXd9VTm0ux3VWkOk9gJ.XLBP3u5a9GSw47f2mWyHHzAv51Xnow2'),(111,'dq@gmail.com','customer','$2b$10$znv2R5OOv8CPOOR5TTzWN.tmWAwRLGR2E3czZHBIgTgTcciGwACJG'),(112,'sanan@gmail.com','customer','$2b$10$RIGH0U6EfGzpTNpYJf/dR.B3x0ZFxFez5k5ts2VfuRybeSrNOD/Oq'),(113,'krishna@gmail.com','customer','$2b$10$y3joOw1WkjkiyQlTzfO0H.PbrynoJxyQ5ZWUPfL5fILse2.tDX9ua'),(114,'amritha@gmail.com','customer','$2b$10$mk6Js0AaXvdhZweRmt/Tf.t0QckzeTxmUVxLkESo0dA3t6sc5Kwnm'),(116,'aneetha@gmail.com','customer','$2b$10$r9dD9uLj0Ng4oQiwz6xd9Oer8IlAyJpzylBSVDnJVhSARvi0ouOs6'),(117,'sharon@gmail.com','customer','$2b$10$ehw7gKQpCZeF0KnxyMMPSu.oGpzmwUCLiT19ZsDmCGfhcsx5m0eL2'),(118,'raju@gmail.com','customer','$2b$10$PnW9HvexR5poH9QmVS6vauwgt5OU4LyygB/IxBWgJh8MbiSYaKUZ2'),(120,'amrutha@gmail.com','customer','$2b$10$0OEEvNS04UOz0lX7hHe.IejGdPTHBqKUE7iEv5WcoPVeuVWf.OWJC'),(122,'junaid@gmail.com','customer','$2b$10$95zn8uRK4FsXBYUeFLLdd.rwFsB4b//6.xqOouEmrSZkLT9L2sLe2');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
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
