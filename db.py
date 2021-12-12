import psycopg2


class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
                            host = "34.145.7.85",
                            database = "postgres",
                            user = "postgres",
                            password = "postgres")

    def SqlQuery(self, request, *params, my_conn=None):
        """
        Выполняет sql запрос
        :param request: Запрос. Для корректной вставки в запрос параметров нужно в запросе вставлять %s
        Пример: "select * from "table" where "type" = %s"
        :param params: Параметры, которые нужно вставить запрос
        :param my_conn: Персональный коннект(для транкзакций)
        :return:
        """
        if my_conn is None:
            cur = self.conn.cursor()
        else:
            cur = my_conn.cursor()
        cur.execute(request, params)
        if my_conn is None:
            self.conn.commit()
        data = cur.fetchall() if cur.description else []
        if data:
            cols = list(map(lambda x: x[0], cur.description))
            result = []
            for row in data:
                row_with_fields = {cols[i]: row[i] for i in range(len(cols))}
                result.append(row_with_fields)
            return result
        else:
            return data

    def SqlQueryScalar(self, request, *params, my_conn=None):
        """
        Выполняет sql запрос
        :param request: Запрос. Для корректной вставки в запрос параметров нужно в запросе вставлять %s
        Пример: "select * from "table" where "type" = %s"
        :param params: Параметры, которые нужно вставить запрос
        :param my_conn: Персональный коннект(для транкзакций)
        :return:
        """
        data = self.SqlQuery(request, *params, my_conn=my_conn)
        return list(data[0].values())[0] if data else None

    def SqlQueryRecord(self, request, *params, my_conn=None):
        res = self.SqlQuery(request, *params, my_conn=my_conn)
        return res[0] if res else res