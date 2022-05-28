GET_USER = """
    select 
        u."id" "id"
    ,	"login"
    ,	u."name" "name"
    ,	"surname"
    ,	"patronymic"
    ,	"age"
    ,	"gender"
    ,	r."name" "role"
    ,	p."name" "position"
	,   p."id" "position_id"
    ,	c."name" "competence"
	,	"competenceid"
	,	"main"
	,	"description"
    ,	"value" "level"
    ,	"date"
    ,	ra."name" "responsibility_area"
	,   "success"
    from "users" u
    left join 
        "users/employee_class" uec on uec."user_id" = u."id"
    left join 
        "users/competences" uc on uc."userid" = u."id"
    left join 
        "responsibility_areas" ra on ra."user" = u."id"
    left join 
        "employee_class" ec on uec."class_id" = ec."id"
    left join 
        "competences" c on uc."competenceid" = c."id"
    left join 
        "roles" r on u."role" = r."id"
    left join 
        "positions" p on u."position" = p."id"
    where 
        u."id" = %s::uuid
"""

GET_EMPLOYEES_LIST = """
SELECT 
	u."id", 
	u."name",
	u."surname",
	u."patronymic",
	pos."position_name" as "position"
FROM 
	"User" u
	LEFT JOIN "Position" pos ON u."pos_id" = pos."id"
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