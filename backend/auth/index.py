import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p58756019_telegram_clone_app_7")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def handler(event: dict, context) -> dict:
    """Авторизация: регистрация, вход, проверка сессии"""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    path = event.get("path", "/")
    method = event.get("httpMethod", "GET")
    body = json.loads(event.get("body") or "{}")

    headers = {**CORS, "Content-Type": "application/json"}

    # POST /register
    if method == "POST" and path.endswith("/register"):
        name = (body.get("name") or "").strip()
        phone = (body.get("phone") or "").strip()
        password = (body.get("password") or "").strip()

        if not name or not phone or not password:
            return {"statusCode": 400, "headers": headers,
                    "body": json.dumps({"error": "Заполните все поля"})}

        if len(password) < 6:
            return {"statusCode": 400, "headers": headers,
                    "body": json.dumps({"error": "Пароль минимум 6 символов"})}

        initials = "".join(w[0].upper() for w in name.split()[:2])
        pw_hash = hash_password(password)

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id FROM {SCHEMA}.users WHERE phone = %s", (phone,)
        )
        if cur.fetchone():
            conn.close()
            return {"statusCode": 409, "headers": headers,
                    "body": json.dumps({"error": "Этот номер уже зарегистрирован"})}

        cur.execute(
            f"INSERT INTO {SCHEMA}.users (name, phone, password_hash, avatar) VALUES (%s, %s, %s, %s) RETURNING id",
            (name, phone, pw_hash, initials)
        )
        user_id = cur.fetchone()[0]

        token = secrets.token_hex(32)
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES (%s, %s)",
            (user_id, token)
        )
        conn.commit()
        conn.close()

        return {"statusCode": 200, "headers": headers,
                "body": json.dumps({"token": token, "user": {"id": user_id, "name": name, "phone": phone, "avatar": initials}})}

    # POST /login
    if method == "POST" and path.endswith("/login"):
        phone = (body.get("phone") or "").strip()
        password = (body.get("password") or "").strip()

        if not phone or not password:
            return {"statusCode": 400, "headers": headers,
                    "body": json.dumps({"error": "Введите телефон и пароль"})}

        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, name, phone, avatar FROM {SCHEMA}.users WHERE phone = %s AND password_hash = %s",
            (phone, pw_hash)
        )
        row = cur.fetchone()
        if not row:
            conn.close()
            return {"statusCode": 401, "headers": headers,
                    "body": json.dumps({"error": "Неверный телефон или пароль"})}

        user_id, name, phone_db, avatar = row
        token = secrets.token_hex(32)
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES (%s, %s)",
            (user_id, token)
        )
        conn.commit()
        conn.close()

        return {"statusCode": 200, "headers": headers,
                "body": json.dumps({"token": token, "user": {"id": user_id, "name": name, "phone": phone_db, "avatar": avatar}})}

    # GET /me — проверка сессии
    if method == "GET" and path.endswith("/me"):
        token = event.get("headers", {}).get("X-Session-Token", "")
        if not token:
            return {"statusCode": 401, "headers": headers,
                    "body": json.dumps({"error": "Нет токена"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""SELECT u.id, u.name, u.phone, u.avatar, u.status
                FROM {SCHEMA}.sessions s
                JOIN {SCHEMA}.users u ON u.id = s.user_id
                WHERE s.token = %s AND s.expires_at > NOW()""",
            (token,)
        )
        row = cur.fetchone()
        conn.close()

        if not row:
            return {"statusCode": 401, "headers": headers,
                    "body": json.dumps({"error": "Сессия истекла"})}

        uid, name, phone, avatar, status = row
        return {"statusCode": 200, "headers": headers,
                "body": json.dumps({"user": {"id": uid, "name": name, "phone": phone, "avatar": avatar, "status": status}})}

    return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}
