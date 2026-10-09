SELECT Name, Salary * 12 AS Yearly
FROM Employees
WHERE Salary * 12 > 800000
ORDER BY Yearly DESC, Name;
