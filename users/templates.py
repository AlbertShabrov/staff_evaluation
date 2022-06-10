GET_USER = """
    SELECT 
	empl."id" "employee_id",
	u."name",
	u."surname",
	u."patronymic",
	pos."id" "position_id",
	pos."position_name",
	u."photo",
	kaizen."kaizen_name",
	NULL "characteristics"
FROM
	"Employee" AS "empl"
	JOIN "User" "u" ON u."id" = empl."user_id"
	JOIN "Position" pos ON pos."id" = empl."position_id"
	LEFT JOIN "Kaizen" kaizen ON kaizen."id" = empl."kaizen_id"
WHERE empl."id" = %s::bigint
"""

GET_EMPLOYEES_LIST = """
SELECT 
	empl."id" "employee_id",
	u."name",
	u."surname",
	u."patronymic",
	pos."id" "position_id",
	pos."position_name",
	u."photo"
FROM
	"Employee" AS "empl"
	JOIN "User" "u" ON u."id" = empl."user_id"
	JOIN "Position" pos ON pos."id" = empl."position_id"
"""

GET_EMPLOYEES_RESPONSIBILITY_AREAS = """
SELECT r.name
FROM responsibility_areas r
WHERE 
        r.user = %s::uuid
"""

GET_COMMUNICATION_GRAPH = """
SELECT u.name, u.surname, u.patronymic, u.slack_id, u.id
FROM users u
WHERE u.slack_id IN {slack_ids}
"""

GET_SLACK_ID_BY_USER_ID = """
SELECT u.slack_id FROM users u WHERE u.id = %s
"""

GET_CHARACTER = """
SELECT 	
	a."date",
	a."percent",
	a."name"
FROM "Analysis" as "a"
WHERE
	a."employee_id" = %s::bigint
ORDER BY a."date"
"""