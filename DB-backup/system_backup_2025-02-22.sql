-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: system
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add brand',7,'add_brand'),(26,'Can change brand',7,'change_brand'),(27,'Can delete brand',7,'delete_brand'),(28,'Can view brand',7,'view_brand'),(29,'Can add brand',8,'add_brand'),(30,'Can change brand',8,'change_brand'),(31,'Can delete brand',8,'delete_brand'),(32,'Can view brand',8,'view_brand'),(33,'Can add targets',9,'add_targets'),(34,'Can change targets',9,'change_targets'),(35,'Can delete targets',9,'delete_targets'),(36,'Can view targets',9,'view_targets'),(37,'Can add target',9,'add_target'),(38,'Can change target',9,'change_target'),(39,'Can delete target',9,'delete_target'),(40,'Can view target',9,'view_target'),(41,'Can add pi',10,'add_pi'),(42,'Can change pi',10,'change_pi'),(43,'Can delete pi',10,'delete_pi'),(44,'Can view pi',10,'view_pi'),(45,'Can add supplier',11,'add_supplier'),(46,'Can change supplier',11,'change_supplier'),(47,'Can delete supplier',11,'delete_supplier'),(48,'Can view supplier',11,'view_supplier'),(49,'Can add ci',12,'add_ci'),(50,'Can change ci',12,'change_ci'),(51,'Can delete ci',12,'delete_ci'),(52,'Can view ci',12,'view_ci'),(53,'Can add cn',13,'add_cn'),(54,'Can change cn',13,'change_cn'),(55,'Can delete cn',13,'delete_cn'),(56,'Can view cn',13,'view_cn'),(57,'Can add remittance',14,'add_remittance'),(58,'Can change remittance',14,'change_remittance'),(59,'Can delete remittance',14,'delete_remittance'),(60,'Can view remittance',14,'view_remittance');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$870000$GUpT4k0gYphKL5SJ5douxF$ib1MzhZhyHoHh6mwLjRYEoXvzx8IXnWNl0gTT2PObnk=','2025-02-16 21:55:30.155560',1,'secusafe','','','yanhao@secusafe.com.au',1,1,'2025-01-15 22:09:20.000000'),(2,'pbkdf2_sha256$870000$zx6ZQJhq9trRstcKuF3am5$mY5j35P3YIxEAqaZuGjPZi64k283L0w9KeMH/tSmXnY=',NULL,0,'test','a','b','xuyanhao2000@outlook.com',0,1,'2025-01-15 22:12:48.000000');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
INSERT INTO `auth_user_user_permissions` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,1,19),(20,1,20),(21,1,21),(22,1,22),(23,1,23),(24,1,24),(25,1,25),(26,1,26),(27,1,27),(28,1,28);
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands_brand`
--

DROP TABLE IF EXISTS `brands_brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands_brand` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands_brand`
--

LOCK TABLES `brands_brand` WRITE;
/*!40000 ALTER TABLE `brands_brand` DISABLE KEYS */;
INSERT INTO `brands_brand` VALUES (1,'AJAX'),(2,'DAHUA'),(3,'UNV'),(4,'VIVOTEK'),(5,'UNIARCH'),(6,'AKUVOX'),(7,'WI-TEK'),(8,'ZKTeco'),(9,'Konec'),(10,'NightSabre');
/*!40000 ALTER TABLE `brands_brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credits_cn`
--

DROP TABLE IF EXISTS `credits_cn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credits_cn` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `supplier` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `estimate` decimal(10,2) NOT NULL,
  `supplier_CN` varchar(100) DEFAULT NULL,
  `received` decimal(10,2) DEFAULT NULL,
  `ss_CN` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `estimate_currency` varchar(100) NOT NULL,
  `received_currency` varchar(100) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credits_cn`
--

LOCK TABLES `credits_cn` WRITE;
/*!40000 ALTER TABLE `credits_cn` DISABLE KEYS */;
INSERT INTO `credits_cn` VALUES (1,'2025-01-21','Ajax','Advanced payment, Email evidence from Yulia,17/1/2025,ETA check',50000.00,'no offical CN, only email confirmation',50019.00,NULL,'applied','USD','USD','rebate','AJAX'),(2,'2025-01-21','Ajax','Apol open day,lucky draw support,Email evidence from Yulia,17/1/2025,ETA check',0.00,'no offical CN, only email confirmation',697.00,NULL,'appied','USD','USD','Compensation','AJAX'),(3,'2025-01-21','Ajax','Secusafe special event, expense claim,Email evidence from Yulia,17/1/2025,ETA check',0.00,'no offical CN, only email confirmation',4201.13,NULL,'appiled','USD','USD','Compensation','AJAX'),(4,'2025-02-11','UNV','5% rebate for energy efficient #155244&#156066,EQL & Digitronic',1000.00,NULL,NULL,NULL,NULL,'USD','AUD','Compensation','UNV');
/*!40000 ALTER TABLE `credits_cn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2025-01-15 22:12:48.834294','2','test',1,'[{\"added\": {}}]',4,1),(2,'2025-01-15 22:13:42.215379','2','test',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email address\"]}}]',4,1),(3,'2025-01-15 22:22:00.692206','1','secusafe',2,'[{\"changed\": {\"fields\": [\"User permissions\"]}}]',4,1),(4,'2025-01-15 23:13:11.799763','1','Brand object (1)',1,'[{\"added\": {}}]',7,1),(5,'2025-01-15 23:31:04.587283','2','Brand object (2)',1,'[{\"added\": {}}]',7,1),(6,'2025-01-16 01:42:26.628795','3','Brand object (3)',1,'[{\"added\": {}}]',7,1),(7,'2025-01-16 01:42:33.764063','4','Brand object (4)',1,'[{\"added\": {}}]',7,1),(8,'2025-01-16 05:26:32.738499','1','Brand object (1)',1,'[{\"added\": {}}]',8,1),(9,'2025-01-16 05:26:34.475981','2','Brand object (2)',1,'[{\"added\": {}}]',8,1),(10,'2025-01-16 05:26:36.479233','3','Brand object (3)',1,'[{\"added\": {}}]',8,1),(11,'2025-01-16 05:26:39.339779','4','Brand object (4)',1,'[{\"added\": {}}]',8,1),(12,'2025-01-20 23:36:04.622258','1','Targets object (1)',1,'[{\"added\": {}}]',9,1),(13,'2025-01-21 00:04:46.612190','1','Target object (1)',2,'[{\"changed\": {\"fields\": [\"TargetA\", \"TargetB\"]}}]',9,1),(14,'2025-01-21 00:10:51.422725','1','AJAX - 2025',2,'[{\"changed\": {\"fields\": [\"PI targetA\", \"PI targetB\"]}}]',9,1),(15,'2025-01-21 00:35:48.223726','1','AJAX',2,'[{\"changed\": {\"fields\": [\"PI targetA\"]}}]',9,1),(16,'2025-01-21 00:37:32.996375','1','AJAX',2,'[{\"changed\": {\"fields\": [\"PI targetA\"]}}]',9,1),(17,'2025-01-21 00:37:54.212736','1','AJAX',2,'[]',9,1),(18,'2025-01-21 00:38:27.424893','1','AJAX',2,'[{\"changed\": {\"fields\": [\"PI targetB\"]}}]',9,1),(19,'2025-01-21 01:35:20.640914','2','Dahua',1,'[{\"added\": {}}]',9,1),(20,'2025-01-21 04:17:30.464860','11111111111','PI object (11111111111)',1,'[{\"added\": {}}]',10,1),(21,'2025-01-21 04:59:55.118189','22222222222','AJAX - 22222222222',1,'[{\"added\": {}}]',10,1),(22,'2025-01-21 05:35:10.444552','22222222222','AJAX - 22222222222',2,'[{\"changed\": {\"fields\": [\"Discount\"]}}]',10,1),(23,'2025-01-21 23:11:48.313914','22222','AJAX - 22222',2,'[{\"changed\": {\"fields\": [\"PI number\"]}}]',10,1),(24,'2025-01-21 23:12:26.465344','22222','AJAX - 22222',3,'',10,1),(25,'2025-01-21 23:44:59.016428','11111111111','AJAX - 11111111111',2,'[{\"changed\": {\"fields\": [\"USD\"]}}]',10,1),(26,'2025-01-21 23:51:23.465756','11111111111','AJAX - 11111111111',2,'[{\"changed\": {\"fields\": [\"USD\"]}}]',10,1),(27,'2025-01-22 22:16:57.339733','12312123132','AJAX - 12312123132',1,'[{\"added\": {}}]',10,1),(28,'2025-01-23 03:57:28.346934','111222333','AJAX - 111222333',1,'[{\"added\": {}}]',10,1),(29,'2025-01-23 03:58:29.747617','22222222222','AJAX - 22222222222',2,'[{\"changed\": {\"fields\": [\"AUD local\"]}}]',10,1),(30,'2025-01-30 00:48:27.401433','1','AJAX - AJAX',1,'[{\"added\": {}}]',11,1),(31,'2025-01-30 00:48:39.686102','2','LocalA - AJAX',1,'[{\"added\": {}}]',11,1),(32,'2025-01-30 00:48:51.085820','3','LocalB - AJAX',1,'[{\"added\": {}}]',11,1),(33,'2025-01-30 00:49:00.629211','4','LocalA - Dahua',1,'[{\"added\": {}}]',11,1),(34,'2025-01-30 00:49:09.944825','5','Dahua - Dahua',1,'[{\"added\": {}}]',11,1),(35,'2025-02-02 22:52:06.475990','PO-123123123','PO-1231231231234567890',1,'[{\"added\": {}}]',12,1),(36,'2025-02-03 00:00:20.479781','PO-1111111','AJAX - 111111111',1,'[{\"added\": {}}]',12,1),(37,'2025-02-03 00:48:23.393490','PO-22222222','AJAX - 22222222',1,'[{\"added\": {}}]',12,1),(38,'2025-02-03 00:50:04.329736','PO-3333333','AJAX - 1234567890',1,'[{\"added\": {}}]',12,1),(39,'2025-02-03 01:15:36.659060','6','LocalC - AJAX',1,'[{\"added\": {}}]',11,1),(40,'2025-02-05 23:42:24.078012','1','CRK-CN-1',1,'[{\"added\": {}}]',13,1),(41,'2025-02-07 00:21:46.279781','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Status\"]}}]',13,1),(42,'2025-02-07 00:23:15.115588','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Received\", \"Received currency\", \"Ss CN\"]}}]',13,1),(43,'2025-02-07 01:26:39.130118','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\", \"Received currency\", \"Ss CN\"]}}]',13,1),(44,'2025-02-07 01:32:08.630866','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\", \"Received currency\", \"Ss CN\"]}}]',13,1),(45,'2025-02-07 03:02:24.682170','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\"]}}]',13,1),(46,'2025-02-07 03:06:35.788628','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\"]}}]',13,1),(47,'2025-02-07 03:13:40.111127','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\", \"Received currency\", \"Status\"]}}]',13,1),(48,'2025-02-07 03:18:27.070752','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Received\", \"Received currency\"]}}]',13,1),(49,'2025-02-07 04:00:07.201579','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\", \"Received currency\"]}}]',13,1),(50,'2025-02-07 04:22:04.917575','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Received\", \"Received currency\"]}}]',13,1),(51,'2025-02-07 04:54:56.701190','1','CRK-CN-1',2,'[{\"changed\": {\"fields\": [\"Status\"]}}]',13,1),(52,'2025-02-07 05:27:48.412032','2','AJAX-CN-2',1,'[{\"added\": {}}]',13,1),(53,'2025-02-10 23:54:26.615164','2','AJAX-CN-2',2,'[{\"changed\": {\"fields\": [\"Received currency\"]}}]',13,1),(54,'2025-02-10 23:55:36.934425','2','AJAX-CN-2',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\", \"Received currency\", \"Ss CN\", \"Status\"]}}]',13,1),(55,'2025-02-10 23:57:06.402476','2','AJAX-CN-2',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\"]}}]',13,1),(56,'2025-02-11 00:03:02.642805','2','AJAX-CN-2',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\"]}}]',13,1),(57,'2025-02-11 00:05:36.170653','2','AJAX-CN-2',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\"]}}]',13,1),(58,'2025-02-11 00:15:25.020583','2','AJAX-CN-2',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\"]}}]',13,1),(59,'2025-02-11 01:32:04.832796','2','AJAX-CN-2',2,'[{\"changed\": {\"fields\": [\"Supplier CN\", \"Received\"]}}]',13,1),(60,'2025-02-11 01:37:20.642452','5','AJAX-CN-5',2,'[{\"changed\": {\"fields\": [\"Received currency\"]}}]',13,1),(61,'2025-02-12 03:32:23.703887','1','AJAX - 1',1,'[{\"added\": {}}]',14,1),(62,'2025-02-12 04:00:00.317745','2','AJAX - 2',1,'[{\"added\": {}}]',14,1),(63,'2025-02-12 05:41:13.132754','3','AJAX - 3',1,'[{\"added\": {}}]',14,1),(64,'2025-02-13 03:40:03.905387','3','AJAX',1,'[{\"added\": {}}]',9,1),(65,'2025-02-13 03:40:10.605789','3','AJAX',3,'',9,1),(66,'2025-02-13 03:40:28.602807','1','AJAX',3,'',9,1),(67,'2025-02-13 03:40:32.824693','2','Dahua',3,'',9,1),(68,'2025-02-13 03:42:12.037732','4','AJAX',1,'[{\"added\": {}}]',9,1),(69,'2025-02-13 03:44:48.115229','5','Dahua',1,'[{\"added\": {}}]',9,1),(70,'2025-02-13 05:21:19.719061','22222222222123','AJAX - 22222222222123',3,'',10,1),(71,'2025-02-13 06:00:05.679224','123123123123','AJAX - 123123123123',2,'[{\"changed\": {\"fields\": [\"USD\", \"Link\"]}}]',10,1),(72,'2025-02-13 22:45:13.740038','5','UNIARCH',1,'[{\"added\": {}}]',8,1),(73,'2025-02-13 22:45:28.839091','6','AKUVOX',1,'[{\"added\": {}}]',8,1),(74,'2025-02-13 22:45:38.556571','7','WI-TEK',1,'[{\"added\": {}}]',8,1),(75,'2025-02-13 22:45:54.606682','8','ZKTeco',1,'[{\"added\": {}}]',8,1),(76,'2025-02-13 22:46:08.059888','9','Konec',1,'[{\"added\": {}}]',8,1),(77,'2025-02-13 22:46:18.874446','2','DAHUA',2,'[{\"changed\": {\"fields\": [\"Company name\"]}}]',8,1),(78,'2025-02-13 23:47:03.813046','10','NightSabre',1,'[{\"added\": {}}]',8,1),(79,'2025-02-14 00:00:09.123114','1','AJAX - 1',2,'[{\"changed\": {\"fields\": [\"AUD local\", \"Link\"]}}]',10,1),(80,'2025-02-14 00:00:31.785775','11111111111','AJAX - 11111111111',2,'[{\"changed\": {\"fields\": [\"AUD local\"]}}]',10,1),(81,'2025-02-14 00:00:43.822410','1123123141555','AJAX - 1123123141555',2,'[{\"changed\": {\"fields\": [\"AUD local\", \"Link\"]}}]',10,1),(82,'2025-02-14 00:00:48.874838','22222222222','AJAX - 22222222222',2,'[{\"changed\": {\"fields\": [\"AUD local\"]}}]',10,1),(83,'2025-02-14 00:01:32.225976','12341231','AJAX - 12341231',2,'[{\"changed\": {\"fields\": [\"AUD local\", \"Link\"]}}]',10,1),(84,'2025-02-14 00:02:00.571053','111222333','AJAX - 111222333',2,'[{\"changed\": {\"fields\": [\"AUD local\"]}}]',10,1),(85,'2025-02-16 21:55:52.603709','5','DAHUA',2,'[{\"changed\": {\"fields\": [\"Brand\"]}}]',9,1),(86,'2025-02-16 22:12:51.086289','5','DAHUA',2,'[{\"changed\": {\"fields\": [\"PI targetA\"]}}]',9,1),(87,'2025-02-16 22:12:54.161442','5','DAHUA',2,'[{\"changed\": {\"fields\": [\"PI targetB\"]}}]',9,1),(88,'2025-02-16 22:13:04.257778','5','DAHUA',2,'[{\"changed\": {\"fields\": [\"PI targetA\", \"PI targetB\"]}}]',9,1),(89,'2025-02-16 22:13:39.826789','4','AJAX',2,'[{\"changed\": {\"fields\": [\"PI targetA\", \"PI targetB\"]}}]',9,1),(90,'2025-02-16 22:13:48.931337','4','AJAX',2,'[{\"changed\": {\"fields\": [\"PI targetA\"]}}]',9,1),(91,'2025-02-16 22:14:11.670120','4','AJAX',2,'[{\"changed\": {\"fields\": [\"PI targetB\"]}}]',9,1),(92,'2025-02-16 22:20:51.617479','4','AJAX',2,'[{\"changed\": {\"fields\": [\"PI targetA\", \"PI targetB\"]}}]',9,1),(93,'2025-02-17 00:13:45.796648','5','DAHUA - DAHUA',2,'[{\"changed\": {\"fields\": [\"Supplier name\", \"Brand name\"]}}]',11,1),(94,'2025-02-17 00:13:59.702788','4','DAHUA - LocalA',2,'[{\"changed\": {\"fields\": [\"Supplier name\", \"Brand name\"]}}]',11,1),(95,'2025-02-17 00:14:22.482154','6','AJAX - LocalC',2,'[{\"changed\": {\"fields\": [\"Supplier name\", \"Brand name\"]}}]',11,1),(96,'2025-02-17 00:16:18.862000','4','LocalA - DAHUA',2,'[{\"changed\": {\"fields\": [\"Brand name\", \"Supplier name\"]}}]',11,1),(97,'2025-02-17 00:16:28.898123','2','LocalC - AJAX',2,'[{\"changed\": {\"fields\": [\"Supplier name\"]}}]',11,1),(98,'2025-02-17 00:16:32.723041','2','LocalA - AJAX',2,'[{\"changed\": {\"fields\": [\"Supplier name\"]}}]',11,1),(99,'2025-02-17 00:16:58.171281','6','localC - AJAX',2,'[{\"changed\": {\"fields\": [\"Brand name\", \"Supplier name\"]}}]',11,1),(100,'2025-02-19 04:00:15.549316','7','Uniview - UNV',1,'[{\"added\": {}}]',11,1),(101,'2025-02-19 04:00:26.684912','8','VIVOTEK - VIVOTEK',1,'[{\"added\": {}}]',11,1),(102,'2025-02-19 04:00:35.829137','9','UNIARCH - UNIARCH',1,'[{\"added\": {}}]',11,1),(103,'2025-02-19 04:00:44.877838','10','AKUVOX - AKUVOX',1,'[{\"added\": {}}]',11,1),(104,'2025-02-19 04:00:55.045327','11','WI-TEK - WI-TEK',1,'[{\"added\": {}}]',11,1),(105,'2025-02-19 04:01:04.193158','12','ZKTeco - ZKTeco',1,'[{\"added\": {}}]',11,1),(106,'2025-02-19 04:01:13.529922','13','Konec - Konec',1,'[{\"added\": {}}]',11,1),(107,'2025-02-19 04:01:21.646446','14','NightSabre - NightSabre',1,'[{\"added\": {}}]',11,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(8,'brands','brand'),(5,'contenttypes','contenttype'),(13,'credits','cn'),(7,'dashboard','brand'),(12,'invoices','ci'),(10,'products','pi'),(14,'remittances','remittance'),(6,'sessions','session'),(11,'suppliers','supplier'),(9,'targets','target');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-01-12 23:34:02.943611'),(2,'auth','0001_initial','2025-01-12 23:34:03.464857'),(3,'admin','0001_initial','2025-01-12 23:34:03.579262'),(4,'admin','0002_logentry_remove_auto_add','2025-01-12 23:34:03.590974'),(5,'admin','0003_logentry_add_action_flag_choices','2025-01-12 23:34:03.598376'),(6,'contenttypes','0002_remove_content_type_name','2025-01-12 23:34:03.669858'),(7,'auth','0002_alter_permission_name_max_length','2025-01-12 23:34:03.719267'),(8,'auth','0003_alter_user_email_max_length','2025-01-12 23:34:03.748768'),(9,'auth','0004_alter_user_username_opts','2025-01-12 23:34:03.748768'),(10,'auth','0005_alter_user_last_login_null','2025-01-12 23:34:03.804676'),(11,'auth','0006_require_contenttypes_0002','2025-01-12 23:34:03.811829'),(12,'auth','0007_alter_validators_add_error_messages','2025-01-12 23:34:03.811829'),(13,'auth','0008_alter_user_username_max_length','2025-01-12 23:34:03.858810'),(14,'auth','0009_alter_user_last_name_max_length','2025-01-12 23:34:03.913458'),(15,'auth','0010_alter_group_name_max_length','2025-01-12 23:34:03.937593'),(16,'auth','0011_update_proxy_permissions','2025-01-12 23:34:03.946602'),(17,'auth','0012_alter_user_first_name_max_length','2025-01-12 23:34:03.991817'),(18,'sessions','0001_initial','2025-01-12 23:34:04.018444'),(19,'dashboard','0001_initial','2025-01-14 22:07:57.401700'),(20,'brands','0001_initial','2025-01-16 05:25:38.752266'),(21,'targets','0001_initial','2025-01-20 23:34:04.962934'),(22,'targets','0002_rename_targets_target','2025-01-20 23:42:43.732533'),(23,'targets','0003_rename_targeta_target_ci_targeta_and_more','2025-01-21 00:10:02.739467'),(24,'products','0001_initial','2025-01-21 04:13:42.902259'),(25,'products','0002_pi_discount','2025-01-21 04:15:52.228149'),(26,'products','0003_alter_pi_comment','2025-01-22 22:17:54.942138'),(27,'products','0004_alter_pi_comment','2025-01-23 04:00:43.572154'),(28,'suppliers','0001_initial','2025-01-30 00:47:27.092765'),(29,'products','0005_alter_pi_aud_alter_pi_aud_local_alter_pi_usd_and_more','2025-01-30 23:58:33.404153'),(30,'products','0006_alter_pi_date','2025-01-31 00:00:39.624719'),(31,'invoices','0001_initial','2025-02-02 22:48:14.959301'),(32,'invoices','0002_alter_ci_freight_alter_ci_value_aud_and_more','2025-02-02 22:51:58.590246'),(33,'invoices','0003_ci_iscomplete','2025-02-04 04:14:24.423347'),(34,'credits','0001_initial','2025-02-05 05:20:45.343073'),(35,'credits','0002_remove_cn_type_cn_ismarketing_alter_cn_received_and_more','2025-02-05 22:23:49.582773'),(36,'credits','0003_remove_cn_ismarketing_cn_estimate_currency_and_more','2025-02-05 22:43:20.257867'),(37,'credits','0004_cn_company_name','2025-02-05 23:15:36.129083'),(38,'invoices','0004_alter_ci_company_name','2025-02-05 23:21:03.509280'),(39,'products','0007_alter_pi_company_name','2025-02-05 23:21:03.525307'),(40,'suppliers','0002_alter_supplier_supplier_name','2025-02-05 23:21:03.525967'),(41,'targets','0004_alter_target_company_name','2025-02-05 23:21:03.525967'),(42,'credits','0005_alter_cn_company_name','2025-02-05 23:26:46.927752'),(43,'credits','0006_alter_cn_company_name_alter_cn_estimate_currency_and_more','2025-02-05 23:37:32.373262'),(44,'invoices','0005_alter_ci_company_name','2025-02-05 23:37:32.394987'),(45,'products','0008_alter_pi_company_name','2025-02-05 23:37:32.399651'),(46,'suppliers','0003_alter_supplier_supplier_name','2025-02-05 23:37:32.402655'),(47,'targets','0005_alter_target_company_name','2025-02-05 23:37:32.405655'),(48,'credits','0007_alter_cn_estimate_currency_alter_cn_received_and_more','2025-02-05 23:41:17.975883'),(49,'invoices','0006_alter_ci_company_name','2025-02-05 23:41:17.991896'),(50,'products','0009_alter_pi_company_name','2025-02-05 23:41:17.991896'),(51,'suppliers','0004_alter_supplier_supplier_name','2025-02-05 23:41:17.999143'),(52,'targets','0006_alter_target_company_name','2025-02-05 23:41:17.999143'),(53,'credits','0008_alter_cn_type','2025-02-05 23:42:02.668549'),(54,'credits','0009_alter_cn_estimate_currency_and_more','2025-02-07 00:42:23.037990'),(55,'credits','0010_alter_cn_estimate_currency_and_more','2025-02-07 01:26:26.400878'),(56,'credits','0011_alter_cn_status','2025-02-07 04:58:44.491723'),(57,'credits','0012_alter_cn_received_currency','2025-02-12 01:21:34.299069'),(58,'remittances','0001_initial','2025-02-12 01:21:34.353735'),(59,'invoices','0007_ci_remittance','2025-02-12 01:21:34.409635'),(60,'remittances','0002_rename_amount_remittance_amount_remittance_bank','2025-02-12 03:42:52.976150'),(61,'targets','0007_remove_target_ci_targeta_remove_target_ci_targetb_and_more','2025-02-13 03:41:25.442949'),(62,'targets','0008_alter_target_default_currency','2025-02-13 03:42:23.284167'),(63,'credits','0013_remove_cn_company_name_cn_brand','2025-02-13 23:00:32.462982'),(64,'invoices','0008_remove_ci_company_name_ci_brand','2025-02-13 23:00:32.510241'),(65,'products','0010_remove_pi_company_name_pi_brand','2025-02-13 23:00:32.541511'),(66,'remittances','0003_remove_remittance_company_name_remittance_brand','2025-02-13 23:00:32.573283'),(67,'suppliers','0005_alter_supplier_supplier_name','2025-02-13 23:00:32.589058'),(68,'targets','0009_remove_target_company_name_target_brand','2025-02-13 23:00:32.620826'),(69,'credits','0014_alter_cn_brand','2025-02-13 23:57:07.803235'),(70,'invoices','0009_alter_ci_brand','2025-02-13 23:57:07.809355'),(71,'products','0011_remove_pi_aud_local_alter_pi_brand','2025-02-13 23:57:07.850314'),(72,'remittances','0004_alter_remittance_brand','2025-02-13 23:57:07.850314'),(73,'suppliers','0006_alter_supplier_supplier_name','2025-02-13 23:57:07.850314'),(74,'targets','0010_alter_target_brand','2025-02-13 23:57:07.850314'),(75,'products','0012_remove_pi_aud_pi_aud_local','2025-02-13 23:59:22.972624'),(76,'suppliers','0007_alter_supplier_brand_name_and_more','2025-02-17 00:15:45.223245'),(77,'remittances','0005_remittance_po','2025-02-17 23:36:42.258325');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('5ekvba6mbxyq3fiarj2lbadim9rr7d7a','.eJxVjEEOwiAQRe_C2pAypQy4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIslDj9bhTiI9Ud8D3UW5Ox1XWZSe6KPGiX18bpeTncv4MSevnWGQ0ptGgpuGGCaKIFh45HsCMSUzAMOYF2k8mMaEFrGDIra0xCBBDvD85vNwo:1tjmbq:OzS2NKRmixrTJU4XinPDLwVOERFyqzp2_6tWGQBXK24','2025-03-02 21:55:30.161723'),('mns0xm1dq3ukoxqfskspk4tsl8ir572p','.eJxVjEEOwiAQRe_C2pAypQy4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIslDj9bhTiI9Ud8D3UW5Ox1XWZSe6KPGiX18bpeTncv4MSevnWGQ0ptGgpuGGCaKIFh45HsCMSUzAMOYF2k8mMaEFrGDIra0xCBBDvD85vNwo:1tYEjr:xceAY8Yz1cc6z_wIfJ9dPnCD4YbO744NJUfs7XeCZEI','2025-01-30 01:32:03.340812'),('s4oqwscb1xino0nq2llxjzrmr9a57mc1','.eJxVjEEOwiAQRe_C2pAypQy4dO8ZCMOAVA0kpV0Z765NutDtf-_9l_BhW4vfelr8zOIslDj9bhTiI9Ud8D3UW5Ox1XWZSe6KPGiX18bpeTncv4MSevnWGQ0ptGgpuGGCaKIFh45HsCMSUzAMOYF2k8mMaEFrGDIra0xCBBDvD85vNwo:1tdjCa:3TvoFbotUFZBde6t0V0Z4RuoVxJBd99wEfuEs_EBotg','2025-02-14 05:04:24.916507');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices_ci`
--

DROP TABLE IF EXISTS `invoices_ci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices_ci` (
  `PO_no` varchar(100) NOT NULL,
  `CI_no` varchar(100) NOT NULL,
  `supplier` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `value_USD` decimal(10,2) NOT NULL,
  `value_AUD` decimal(10,2) NOT NULL,
  `freight` decimal(10,2) NOT NULL,
  `isComplete` tinyint(1) NOT NULL,
  `remittance_id` int DEFAULT NULL,
  `brand` varchar(100) NOT NULL,
  PRIMARY KEY (`PO_no`),
  KEY `invoices_ci_remittance_id_9bbcef49_fk_remittances_remittance_id` (`remittance_id`),
  CONSTRAINT `invoices_ci_remittance_id_9bbcef49_fk_remittances_remittance_id` FOREIGN KEY (`remittance_id`) REFERENCES `remittances_remittance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices_ci`
--

LOCK TABLES `invoices_ci` WRITE;
/*!40000 ALTER TABLE `invoices_ci` DISABLE KEYS */;
INSERT INTO `invoices_ci` VALUES ('?1','#31012025-2179-0067 ','AJAX','2025-02-12',56403.43,0.00,4250.00,1,1,'AJAX'),('?2','#31012025-2179-0067 ','AJAX','2025-02-12',45758.52,0.00,4250.00,1,2,'AJAX'),('?3','H2024102516','Uniview','2025-01-16',98640.00,0.00,0.00,0,NULL,'Uniview'),('?4','H2024121716','Uniview','2025-01-16',49924.00,0.00,0.00,0,NULL,'Uniview'),('#7410','H2024092514','Uniview','2025-01-16',47676.00,0.00,0.00,1,NULL,'Uniview'),('#7455','H2024092322','Uniview','2025-01-16',16440.00,0.00,0.00,1,NULL,'Uniview'),('#7551','AK-S-20241219G2','Akuvox','2025-02-10',2300.00,0.00,330.00,0,NULL,'Akuvox');
/*!40000 ALTER TABLE `invoices_ci` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_pi`
--

DROP TABLE IF EXISTS `products_pi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_pi` (
  `brand` varchar(100) NOT NULL,
  `supplier_name` varchar(100) NOT NULL,
  `PI_number` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `USD` decimal(10,2) NOT NULL,
  `AUD_counted` tinyint(1) NOT NULL,
  `comment` longtext,
  `link` varchar(100) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `AUD_local` decimal(10,2) NOT NULL,
  PRIMARY KEY (`PI_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_pi`
--

LOCK TABLES `products_pi` WRITE;
/*!40000 ALTER TABLE `products_pi` DISABLE KEYS */;
INSERT INTO `products_pi` VALUES ('AJAX','AJAX','#11022025-2179-0067','2025-02-12',102161.95,0,'stocks/ email from supplier/paid 12/2','',0.00,0.00),('Ajax','Ajax','08012025-67','2025-01-08',401296.15,0,'','',0.00,0.00),('Akuvox','Alloys Distribution','2664338','2025-02-12',0.00,1,'','',0.00,730.40),('Akuvox','Akuvox','AK-S-20241219G2','2025-02-10',2300.00,0,'stocks/ email from supplier/unpaid','',0.00,0.00),('Dahua','Dahua','DA-E02250201','2025-02-05',0.00,1,'Dicker Data SO','',0.00,15776.20),('Dahua','Dahua','DA-E06250104','2025-01-13',0.00,1,'','',0.00,644.60),('Dahua','Dahua','DA-E06250202','2025-02-11',0.00,1,'Ripper Online DPPA order','',0.00,1401.07),('Dahua','Dahua','DA-E06250203-P','2025-02-10',0.00,1,'','',0.00,27057.76),('Dahua','Dahua','DA-E06250205','2025-02-10',0.00,1,'Tradezone demo','',0.00,0.00),('Dahua','Dahua','DA-E06250206','2025-02-10',0.00,1,'','',0.00,1366.20),('Dahua','Dahua','DA-E06250211','2025-02-12',0.00,1,'','',0.00,44044.00),('Dahua','Dahua','DH-E06241217','2025-01-13',0.00,1,'','',0.00,512133.00),('Dahua','Dahua','DH-E06250105','2025-01-13',0.00,1,'','',0.00,634500.00),('Dahua','Dahua','DH-E06250108','2025-01-15',0.00,1,'Cisco Special Order','',0.00,210.00),('Dahua','Dahua','DH-E06250109','2025-01-16',0.00,1,'inc Yates special order','',0.00,141110.80),('Dahua','Dahua','DH-E06250113','2025-01-21',0.00,1,'','',0.00,121830.00),('Dahua','Dahua','DH-E06250117','2025-01-28',0.00,1,'','',0.00,1297351.70),('Dahua','Dahua','DH-E06250119','2025-01-28',0.00,1,'','',0.00,805072.00),('Dahua','Dahua','DH-E06250208','2025-02-11',0.00,1,'Serious Security SO','',0.00,333.60),('Dahua','Dahua','DH-E06250210','2025-02-11',0.00,1,'','',0.00,800.00),('Uniview','Uniview','U0839424080401','2025-01-16',212680.00,0,' email from supplier/paid 18/2','',0.00,0.00);
/*!40000 ALTER TABLE `products_pi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `remittances_remittance`
--

DROP TABLE IF EXISTS `remittances_remittance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remittances_remittance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `bank` varchar(100) DEFAULT NULL,
  `brand` varchar(100) NOT NULL,
  `PO` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remittances_remittance`
--

LOCK TABLES `remittances_remittance` WRITE;
/*!40000 ALTER TABLE `remittances_remittance` DISABLE KEYS */;
INSERT INTO `remittances_remittance` VALUES (1,'2025-02-05',20000.00,'AUD','Bank Transfer',NULL,'AJAX','[\'?1\']'),(2,'2025-02-12',1000.00,'USD','Bank Transfer','CBA','AJAX','[\'?2\']'),(3,'2024-11-21',100.00,'AUD','Bank Transfer','CBA','AJAX',''),(5,'2025-02-20',0.00,'','','','AJAX','');
/*!40000 ALTER TABLE `remittances_remittance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers_supplier`
--

DROP TABLE IF EXISTS `suppliers_supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers_supplier` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(100) NOT NULL,
  `brand_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers_supplier`
--

LOCK TABLES `suppliers_supplier` WRITE;
/*!40000 ALTER TABLE `suppliers_supplier` DISABLE KEYS */;
INSERT INTO `suppliers_supplier` VALUES (1,'AJAX','AJAX'),(2,'LocalA','AJAX'),(3,'LocalB','AJAX'),(4,'LocalA','DAHUA'),(5,'DAHUA','DAHUA'),(6,'localC','AJAX'),(7,'Uniview','UNV'),(8,'VIVOTEK','VIVOTEK'),(9,'UNIARCH','UNIARCH'),(10,'AKUVOX','AKUVOX'),(11,'WI-TEK','WI-TEK'),(12,'ZKTeco','ZKTeco'),(13,'Konec','Konec'),(14,'NightSabre','NightSabre');
/*!40000 ALTER TABLE `suppliers_supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `targets_target`
--

DROP TABLE IF EXISTS `targets_target`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `targets_target` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `PI_targetA` int NOT NULL,
  `PI_targetB` int NOT NULL,
  `default_currency` varchar(10) NOT NULL,
  `brand` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `targets_target`
--

LOCK TABLES `targets_target` WRITE;
/*!40000 ALTER TABLE `targets_target` DISABLE KEYS */;
INSERT INTO `targets_target` VALUES (4,2025,300000,500000,'USD','AJAX'),(5,2025,6000000,9000000,'AUD','DAHUA');
/*!40000 ALTER TABLE `targets_target` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-22 16:30:05
