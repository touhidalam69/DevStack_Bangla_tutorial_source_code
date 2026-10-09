SELECT DepartmentId, Name, MAX(Salary) AS MaxPay
FROM Employees
GROUP BY DepartmentId;
