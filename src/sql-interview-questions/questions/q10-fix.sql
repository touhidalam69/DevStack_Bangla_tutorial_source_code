SELECT MAX(Salary) AS Second FROM Employees
WHERE Salary < (SELECT MAX(Salary) FROM Employees);

SELECT DISTINCT Salary AS Second FROM (
  SELECT Salary,
    DENSE_RANK() OVER (ORDER BY Salary DESC) AS r
  FROM Employees) AS t
WHERE r = 2;
