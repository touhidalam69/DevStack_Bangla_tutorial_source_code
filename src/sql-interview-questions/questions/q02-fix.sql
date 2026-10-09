SELECT d.Name AS Dept, e.Name AS Employee
FROM Departments AS d
LEFT JOIN Employees AS e
  ON e.DepartmentId = d.Id AND e.Salary > 65000;
