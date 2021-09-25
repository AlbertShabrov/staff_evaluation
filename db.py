import psycopg2

def decorated_connect(decorate_function):
    def connect(*args):
        connection = psycopg2.connect(
                            host = "35.199.181.128",
                            database = "wb",
                            user = "postgres",
                            password = "postgres")

        cur = connection.cursor()
        decorate_function(cur, *args)
        connection.commit()
        cur.close()
        connection.close()
    return connect