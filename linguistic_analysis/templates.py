"""
sql-шаблоны для лингвистического анализа
"""

GET_MESSAGES_BY_EP_ID = """
SELECT 
    "message", 
    "date"
FROM 
    "Messages"
WHERE
    mes."employee_id" = %s::bigserial AND
    "date" >= %s::date AND
    "date" < %s::date
"""

GET_ACCEPTANCE_DATE = """
SELECT "acceptance_date"
FROM "Employee"
WHERE id = %s::bigserial
"""