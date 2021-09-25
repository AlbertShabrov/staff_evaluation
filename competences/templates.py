GET_COMPETENCES_BY_POSITION = """
SELECT 
    "competence_id" "competence"
,   "priority"
FROM
    "competences/positions"
WHERE
    "position_id" = %s::uuid
"""