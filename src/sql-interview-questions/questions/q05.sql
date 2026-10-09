-- Who is nobody's manager?
SELECT Name FROM Employees
WHERE Id NOT IN (SELECT ManagerId FROM Employees);
