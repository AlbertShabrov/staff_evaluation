"""
sql-шаблоны для лингвистического анализа
"""

GET_MESSAGES_BY_EP_ID = """
SELECT "message"
FROM "Messages"
WHERE
    "employee_id" = %s::bigint
"""

GET_ACCEPTANCE_DATE = """
SELECT "acceptance_date"
FROM "Employee"
WHERE "id" = %s::bigint
"""

ADD_ANALYSIS_RESULT = """
INSERT INTO "Analysis" ("employee_id", "name", "percent", "date")
VALUES (%s, %s, %s, %s)
"""