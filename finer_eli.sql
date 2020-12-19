CREATE DATABASE `finer_eli` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- finer_eli.foodname definition

CREATE TABLE `foodname` (
  `FOODID` int(11) NOT NULL,
  `FOODNAME` varchar(120) NOT NULL,
  PRIMARY KEY (`FOODID`),
  UNIQUE KEY `foodname_UN` (`FOODNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- finer_eli.compunit definition

CREATE TABLE `compunit` (
  `THSCODE` varchar(120) NOT NULL,
  `DESCRIPT` varchar(120) NOT NULL,
  `LANG` varchar(120) NOT NULL,
  UNIQUE KEY `compunit_UN` (`THSCODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- finer_eli.component_names definition

CREATE TABLE `component_names` (
  `THSCODE` varchar(120) NOT NULL,
  `DESCRIPT` varchar(1024) NOT NULL,
  UNIQUE KEY `component_names_UN` (`THSCODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- finer_eli.component definition

CREATE TABLE `component` (
  `EUFDNAME` varchar(120) NOT NULL,
  `COMPUNIT` varchar(120) NOT NULL,
  `CMPCLASS` varchar(120) NOT NULL,
  `CMPCLASSP` varchar(120) NOT NULL,
  PRIMARY KEY (`EUFDNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- finer_eli.component_value definition

CREATE TABLE `component_value` (
  `FOODID` int(11) NOT NULL,
  `EUFDNAME` varchar(120) NOT NULL,
  `BESTLOC` double DEFAULT 0,
  PRIMARY KEY (`FOODID`,`EUFDNAME`),
  KEY `component_value_FK_2` (`EUFDNAME`),
  CONSTRAINT `component_value_FK` FOREIGN KEY (`FOODID`) REFERENCES `foodname` (`FOODID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `component_value_FK_1` FOREIGN KEY (`EUFDNAME`) REFERENCES `component_names` (`THSCODE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `component_value_FK_2` FOREIGN KEY (`EUFDNAME`) REFERENCES `component` (`EUFDNAME`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
