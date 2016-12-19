/* SELECT n.MedName
FROM namez n
INNER JOIN name_mechanism nm
ON n.NameID=nm.NameID 
WHERE nm.MechanismID in
(
SELECT nm.MechanismID, m.mechanism
FROM mechanisms m
INNER JOIN name_mechanism nm
ON m.MechanismID=nm.MechanismID
INNER JOIN namez n
ON nm.NameID=n.NameID
ORDER BY RAND()
LIMIT 1);
*/
SELECT n.NameID, n.MedName, innerQueryResultTable.Mechanism
FROM namez n
INNER JOIN name_mechanism nm
ON n.NameID = nm.NameID
INNER JOIN 
(
SELECT m.MechanismID, m.Mechanism
FROM mechanisms m
ORDER BY RAND()
LIMIT 1) innerQueryResultTable ON innerQueryResultTable.MechanismID=nm.MechanismID
-- The logic behind this is to perform a query to find a random mechanism and its associated ID first. Then to assign 
--  the resulting table from the query as "innerQueryResultTable". Then we run another query with inner join to join the 
--  namez table and name_mechanism table with the generated innerQueryResultTable (which contains our ONE random mechanism).
--  This way we may output all names of medication(s) associated with that said mechanism. 