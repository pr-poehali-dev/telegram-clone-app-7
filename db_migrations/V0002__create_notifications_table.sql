CREATE TABLE IF NOT EXISTS t_p58756019_telegram_clone_app_7.notifications (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL DEFAULT 'message',
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    source VARCHAR(100) DEFAULT 'internal',
    read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);