-- Creates the sample database for the 10 questions.
IF DB_ID('SqlInterview') IS NULL CREATE DATABASE SqlInterview;
GO
USE SqlInterview;
DROP TABLE IF EXISTS Employees, Departments;

CREATE TABLE Departments (
  Id   INT PRIMARY KEY,
  Name VARCHAR(10) NOT NULL
);

CREATE TABLE Employees (
  Id           INT PRIMARY KEY,
  Name         VARCHAR(10) NOT NULL,
  DepartmentId INT NULL REFERENCES Departments(Id),
  ManagerId    INT NULL,
  Salary       INT NOT NULL
);

INSERT INTO Departments VALUES (1, 'IT'), (2, 'HR'), (3, 'Sales');

INSERT INTO Employees VALUES
  (1, 'Rahim',  1,    NULL, 90000),
  (2, 'Nadia',  2,    1,    90000),
  (3, 'Karim',  1,    1,    70000),
  (4, 'Sumi',   1,    3,    60000),
  (5, 'Tanvir', 2,    2,    50000),
  (6, 'Eva',    NULL, 1,    60000);
