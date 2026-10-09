SELECT DepartmentId, COUNT(*) AS People
FROM Employees
WHERE COUNT(*) > 1
GROUP BY DepartmentId;
