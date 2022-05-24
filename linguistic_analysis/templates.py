"""
sql-шаблоны для лингвистического анализа
"""

GET_MESSAGES_BY_EP_ID = """
SELECT "message", "date" 
FROM "Message"
WHERE "employee_id" = %s::bigserial
    AND "date" BETWEEN %s::date AND %s::date
"""