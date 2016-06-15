CREATE DATABASE hotelreverse;

USE hotelreverse;

CREATE TABLE `Client` (
  `client_Index` int AUTO_INCREMENT,
  `client_ID` varchar default NULL ,
  `client_PW` varchar NOT NULL ,
  `client_Name` varchar NOT NULL ,
  `client_Email` varchar NOT NULL ,
  `billingInfo` varchar NOT NULL ,
  `member` boolean NOT NULL default 0,
  PRIMARY KEY (`client_Index`),
  UNIQUE KEY (`client_Email`)
);

CREATE TABLE `Deal` (
  `booking_Num` int AUTO_INCREMENT,
  `client_Index` int,
  `checkIn_Date` DATE NOT NULL,
  `checkOut_Date` DATE NOT NULL,
  `mainArea_Name` varchar NOT NULL,
  `subArea_Name` varchar NOT NULL,
  `bid_Price` int NOT NULL,
  `bid_StartTime` DATETIME NOT NULL,
  `bid_EndTime` DATETIME NOT NULL,
  `bid_Transaction` boolean NOT NULL default 0,
  PRIMARY KEY (`booking_Num`),
  CONSTRAINT `fk_client` FOREIGN KEY (`client_Index`) REFERENCES `Client` (`client_Index`)
  ON DELETE CASCADE
);


CREATE TABLE `Hotel` (
  `hotel_Index` int AUTO_INCREMENT,
  `hotel_ID` varchar NOT NULL ,
  `hotel_PW` varchar NOT NULL ,
  `hotel_Name` varchar NOT NULL ,
  `hotel_Address` varchar NOT NULL ,
  `mainArea_Name` varchar NOT NULL ,
  `subArea_Name` varchar NOT NULL ,
  `hotel_Rate` int NOT NULL ,
  `mgr_Name` varchar NOT NULL ,
  `booking_Num` int,
  PRIMARY KEY (`hotel_Index`),
  CONSTRAINT `fk_booking_Num` FOREIGN KEY (`booking_Num`) REFERENCES `Deal` (`booking_Num`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
