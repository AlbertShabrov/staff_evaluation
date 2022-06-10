GET_COMPETENCES_BY_POSITION = """
    SELECT 
        "name" "competence"
    ,   "priority"
    FROM
        "competences/positions" cp
    inner join "competences" c on cp."competence_id" = c."id" 
    WHERE
        "position_id" = %s::uuid
"""

GET_COMPETENCES_BY_USER = """
    SELECT
        "name" "competence"
    ,   "value" "level"
    ,   "date"
    FROM
        "users/competences" uc
    inner join "competences" c on uc."competenceid" = c."id" 
    WHERE
        "userid" = %s::uuid
    
"""

GET_COMPETENCES_BY_USER_FOR_YEAR = """
    SELECT
        "name" "competence"
    ,   "value" "level"
    ,   "date"
    FROM
        "users/competences" uc
    inner join "competences" c on uc."competenceid" = c."id" 
    WHERE
        "userid" = %s::uuid and "date" > %s::timestamp
    ORDER BY "date"
"""

