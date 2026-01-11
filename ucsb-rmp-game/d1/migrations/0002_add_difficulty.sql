ALTER TABLE leaderboard_entries ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'normal';

DROP INDEX IF EXISTS leaderboard_player_mode;
CREATE UNIQUE INDEX IF NOT EXISTS leaderboard_player_mode_difficulty
  ON leaderboard_entries (player_name, mode, difficulty);

DROP INDEX IF EXISTS leaderboard_mode_score;
CREATE INDEX IF NOT EXISTS leaderboard_mode_difficulty_score
  ON leaderboard_entries (mode, difficulty, score DESC, updated_at ASC);
