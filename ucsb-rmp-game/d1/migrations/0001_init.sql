CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_name TEXT NOT NULL,
  mode TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS leaderboard_player_mode
  ON leaderboard_entries (player_name, mode);

CREATE INDEX IF NOT EXISTS leaderboard_mode_score
  ON leaderboard_entries (mode, score DESC, updated_at ASC);
