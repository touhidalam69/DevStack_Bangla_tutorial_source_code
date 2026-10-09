SELECT COUNT(*) AS AllRows,
       COUNT(DepartmentId) AS WithDept,
       COUNT(DISTINCT DepartmentId) AS Depts
FROM Employees;
