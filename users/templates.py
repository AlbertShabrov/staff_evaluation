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
    ,	c."name" "competence"
    ,	"value" "level"
    ,	"date"
    ,	ra."name" "responsibility_area"
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