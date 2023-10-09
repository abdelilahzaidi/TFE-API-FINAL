-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: thdb
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abonnement`
--

DROP TABLE IF EXISTS `abonnement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abonnement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateDebut` datetime NOT NULL,
  `dateFin` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `typeAbonnementId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_da5a57340e96d68027ba83c2e99` (`userId`),
  KEY `FK_eec5e572ddf2ae52dee662346ba` (`typeAbonnementId`),
  CONSTRAINT `FK_da5a57340e96d68027ba83c2e99` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_eec5e572ddf2ae52dee662346ba` FOREIGN KEY (`typeAbonnementId`) REFERENCES `typeabonnement` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abonnement`
--

LOCK TABLES `abonnement` WRITE;
/*!40000 ALTER TABLE `abonnement` DISABLE KEYS */;
/*!40000 ALTER TABLE `abonnement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cour`
--

DROP TABLE IF EXISTS `cour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cour` (
  `id` int NOT NULL AUTO_INCREMENT,
  `objectifDuCour` varchar(255) NOT NULL,
  `lieuId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c6c233191bde5b3a58f06b14ad8` (`lieuId`),
  CONSTRAINT `FK_c6c233191bde5b3a58f06b14ad8` FOREIGN KEY (`lieuId`) REFERENCES `lieu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cour`
--

LOCK TABLES `cour` WRITE;
/*!40000 ALTER TABLE `cour` DISABLE KEYS */;
INSERT INTO `cour` VALUES (1,'Remise en forme',1);
/*!40000 ALTER TABLE `cour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datecour`
--

DROP TABLE IF EXISTS `datecour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datecour` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateCour` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datecour`
--

LOCK TABLES `datecour` WRITE;
/*!40000 ALTER TABLE `datecour` DISABLE KEYS */;
/*!40000 ALTER TABLE `datecour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facture`
--

DROP TABLE IF EXISTS `facture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateEnvoie` datetime NOT NULL,
  `etatDePaiement` tinyint NOT NULL,
  `montant` int NOT NULL,
  `abonnementId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9b912c4dd857f1de2ba01dddfaf` (`abonnementId`),
  CONSTRAINT `FK_9b912c4dd857f1de2ba01dddfaf` FOREIGN KEY (`abonnementId`) REFERENCES `abonnement` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facture`
--

LOCK TABLES `facture` WRITE;
/*!40000 ALTER TABLE `facture` DISABLE KEYS */;
/*!40000 ALTER TABLE `facture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horaire`
--

DROP TABLE IF EXISTS `horaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `heureDebut` datetime NOT NULL,
  `heureFin` datetime NOT NULL,
  `jour` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horaire`
--

LOCK TABLES `horaire` WRITE;
/*!40000 ALTER TABLE `horaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `horaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grade` enum('0 cap','1er cap','2eme cap','3eme cap') NOT NULL DEFAULT '0 cap',
  `programId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_0226ebdefb259058335bc8d5b7` (`programId`),
  CONSTRAINT `FK_0226ebdefb259058335bc8d5b74` FOREIGN KEY (`programId`) REFERENCES `program` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'0 cap',1),(2,'1er cap',2),(4,'2eme cap',3),(5,'3eme cap',4);
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lieu`
--

DROP TABLE IF EXISTS `lieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lieu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rue` varchar(255) NOT NULL,
  `commune` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lieu`
--

LOCK TABLES `lieu` WRITE;
/*!40000 ALTER TABLE `lieu` DISABLE KEYS */;
INSERT INTO `lieu` VALUES (1,'RueGuatti de gamond 181','Uccle','Bruxelles');
/*!40000 ALTER TABLE `lieu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `dateHeureEnvoie` datetime NOT NULL,
  `senderId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bc096b4e18b1f9508197cd98066` (`senderId`),
  CONSTRAINT `FK_bc096b4e18b1f9508197cd98066` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (2,'Calendier annuel','bzbzbzbzbz','2023-09-27 23:59:25',1);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_user`
--

DROP TABLE IF EXISTS `message_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_user` (
  `messageId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`messageId`,`userId`),
  KEY `IDX_28f58f82a46ec61ee1b1c77fb9` (`messageId`),
  KEY `IDX_9591f0e3564991c922f448ca85` (`userId`),
  CONSTRAINT `FK_28f58f82a46ec61ee1b1c77fb95` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_9591f0e3564991c922f448ca85e` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_user`
--

LOCK TABLES `message_user` WRITE;
/*!40000 ALTER TABLE `message_user` DISABLE KEYS */;
INSERT INTO `message_user` VALUES (2,2);
/*!40000 ALTER TABLE `message_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (1,'Ceinture blue 0 cap','bbzbzbzbzbzbzbzzbzbz'),(2,'Ceinture blue 1er cap','bbzbzbzbzbzbzbzzbzbz'),(3,'Ceinture blue 2ème cap','bbzbzbzbzbzbzbzzbzbz'),(4,'Ceinture blue 3ème cap','bbzbzbzbzbzbzbzzbzbz'),(5,'Ceinture noire 1ère dan','bbzbzbzbzbzbzbzzbzbz'),(6,'Ceinture noire 2ème dan','bbzbzbzbzbzbzbzzbzbz'),(7,'Ceinture noire 3ème dan','bbzbzbzbzbzbzbzzbzbz');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seance`
--

DROP TABLE IF EXISTS `seance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `horaireId` int DEFAULT NULL,
  `courId` int DEFAULT NULL,
  `dateCourId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_800af8f9032c1de9c5693a33fa3` (`horaireId`),
  KEY `FK_96e974e1445864ff3fb11a5f72c` (`courId`),
  KEY `FK_d5464f8e061a3334e1027fb486a` (`dateCourId`),
  CONSTRAINT `FK_800af8f9032c1de9c5693a33fa3` FOREIGN KEY (`horaireId`) REFERENCES `horaire` (`id`),
  CONSTRAINT `FK_96e974e1445864ff3fb11a5f72c` FOREIGN KEY (`courId`) REFERENCES `cour` (`id`),
  CONSTRAINT `FK_d5464f8e061a3334e1027fb486a` FOREIGN KEY (`dateCourId`) REFERENCES `datecour` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seance`
--

LOCK TABLES `seance` WRITE;
/*!40000 ALTER TABLE `seance` DISABLE KEYS */;
/*!40000 ALTER TABLE `seance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seance_user`
--

DROP TABLE IF EXISTS `seance_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seance_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `presence` tinyint NOT NULL DEFAULT '0',
  `seanceId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c8ffd72c4e7712d75f3179eed43` (`seanceId`),
  KEY `FK_7cf8527b2af7bf8795bec761263` (`userId`),
  CONSTRAINT `FK_7cf8527b2af7bf8795bec761263` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_c8ffd72c4e7712d75f3179eed43` FOREIGN KEY (`seanceId`) REFERENCES `seance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seance_user`
--

LOCK TABLES `seance_user` WRITE;
/*!40000 ALTER TABLE `seance_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `seance_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typeabonnement`
--

DROP TABLE IF EXISTS `typeabonnement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typeabonnement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `tarif` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typeabonnement`
--

LOCK TABLES `typeabonnement` WRITE;
/*!40000 ALTER TABLE `typeabonnement` DISABLE KEYS */;
/*!40000 ALTER TABLE `typeabonnement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seance`
--

DROP TABLE IF EXISTS `user_seance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seance` (
  `seance_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`seance_id`,`user_id`),
  KEY `IDX_2cf2507b497c1392b95fe82b13` (`seance_id`),
  KEY `IDX_36e02856bc1ba62c0d0119e614` (`user_id`),
  CONSTRAINT `FK_2cf2507b497c1392b95fe82b13b` FOREIGN KEY (`seance_id`) REFERENCES `seance` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_36e02856bc1ba62c0d0119e6147` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seance`
--

LOCK TABLES `user_seance` WRITE;
/*!40000 ALTER TABLE `user_seance` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_seance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL DEFAULT 'male',
  `birthDate` datetime NOT NULL,
  `rue` varchar(255) NOT NULL,
  `commune` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `actif` tinyint NOT NULL DEFAULT '1',
  `attributionDate` datetime NOT NULL,
  `gsm` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('member','admin') NOT NULL DEFAULT 'member',
  `levelId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `FK_2735b8ee71c0fa7f68190fe61b5` (`levelId`),
  CONSTRAINT `FK_2735b8ee71c0fa7f68190fe61b5` FOREIGN KEY (`levelId`) REFERENCES `level` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'super','man','male','2023-09-18 00:00:00','Rue des Coteaux 181','schaerbeek','bruxelles',1,'2023-09-27 23:53:09','0485/171-906','superman@hotmail.com','$2b$12$f1LjfLaReDZIAuOgUV7YQ.a6fauBDIwTSZA3wfMt/aIz/aAqbfIa.','admin',4),(2,'super','woman','male','2023-09-18 00:00:00','Rue des gallait 181','schaerbeek','bruxelles',1,'2023-09-27 23:53:37','0485/171-906','superwoman@hotmail.com','$2b$12$venJg2qZ2uVcdI6ice8B5.nW0r8Gs0PisOr.wRKq32aMZVGYvxKES','member',4);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-28  0:02:21
