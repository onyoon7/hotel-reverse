DROP DATABASE hotelreverse;
CREATE DATABASE hotelreverse;

USE hotelreverse;

CREATE TABLE `Client` (
  `client_Index` int AUTO_INCREMENT,
  `client_Email` varchar(128) NOT NULL,
  `client_PW` varchar(128) NOT NULL,
  `client_Name` varchar(128) NOT NULL,
  `billingInfo` varchar(128) NOT NULL,
  `member` boolean NOT NULL default 0,
  PRIMARY KEY (`client_Index`),
  UNIQUE KEY (`client_Email`)
);


CREATE TABLE `Hotel` (
  `hotel_Index` int AUTO_INCREMENT,
  `hotel_ID` varchar(128) NOT NULL ,
  `hotel_PW` varchar(128) NOT NULL ,
  `hotel_Name` varchar(128) NOT NULL ,
  `hotel_Address` varchar(128) NOT NULL ,
  `mainArea_Name` varchar(128) NOT NULL ,
  `subArea_Name` varchar(128) NOT NULL ,
  `hotel_Rate` int NOT NULL ,
  `mgr_Name` varchar(128) NOT NULL ,
  PRIMARY KEY (`hotel_Index`),
  UNIQUE KEY(`hotel_ID`)
);


CREATE TABLE `Deal` (
  `booking_Num` int AUTO_INCREMENT,
  `client_Index` int,
  `hotel_ID` varchar(128),
  `checkIn_Date` DATE NOT NULL,
  `checkOut_Date` DATE NOT NULL,
  `mainArea_Name` varchar(128) NOT NULL,
  `subArea_Name` varchar(128) NOT NULL,
  `bid_Price` int NOT NULL,
  `bid_StartTime` DATETIME NOT NULL,
  `bid_EndTime` DATETIME NOT NULL,
  `bid_Transaction` boolean NOT NULL default 0,
  `imp_uid` varchar(128) NOT NULL,
  PRIMARY KEY (`booking_Num`),
  CONSTRAINT `fk_client` FOREIGN KEY (`client_Index`) REFERENCES `Client` (`client_Index`)
  ON UPDATE CASCADE,
  CONSTRAINT `fk_hotel` FOREIGN KEY (`hotel_ID`) REFERENCES `Hotel` (`hotel_ID`)
  ON UPDATE CASCADE
);

