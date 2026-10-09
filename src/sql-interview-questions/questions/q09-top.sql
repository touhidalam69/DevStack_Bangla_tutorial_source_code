-- Top earner in each department
SELECT DepartmentId, Name, Salary FROM (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY DepartmentId
    ORDER BY Salary DESC, Name) AS rn
  FROM Employees) AS t
WHERE rn = 1;
