SELECT Name, Salary,
  RANK()       OVER (ORDER BY Salary DESC) AS Rnk,
  DENSE_RANK() OVER (ORDER BY Salary DESC) AS DRnk
FROM Employees;
