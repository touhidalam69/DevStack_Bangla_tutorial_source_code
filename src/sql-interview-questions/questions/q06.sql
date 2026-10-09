SELECT DepartmentId, COUNT(*) AS People
FROM Employees
WHERE Salary > 55000
GROUP BY DepartmentId
HAVING COUNT(*) > 1;
