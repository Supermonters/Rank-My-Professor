const VALID_MODES = new Set(["guess", "guess10", "higherlower"]);
const VALID_DIFFICULTIES = new Set(["easy", "normal", "hard"]);
const MAX_NAME_LENGTH = 32;
const MAX_SCORE = 100000;

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });

export const onRequestOptions = () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });

export const onRequestPost = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ ok: false, error: "Database not configured" }, 500);
  }

  let payload = {};
  try {
    payload = await request.json();
  } catch (e) {
    return jsonResponse({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const playerName = typeof payload.playerName === "string" ? payload.playerName.trim() : "";
  const mode = typeof payload.mode === "string" ? payload.mode : "";
  const difficulty = typeof payload.difficulty === "string" ? payload.difficulty : "";
  const score = payload.score;

  if (!playerName || playerName.length > MAX_NAME_LENGTH) {
    return jsonResponse({ ok: false, error: "Invalid player name" }, 400);
  }

  if (!VALID_MODES.has(mode)) {
    return jsonResponse({ ok: false, error: "Invalid game mode" }, 400);
  }

  if (!VALID_DIFFICULTIES.has(difficulty)) {
    return jsonResponse({ ok: false, error: "Invalid difficulty" }, 400);
  }

  if (!Number.isInteger(score) || score < 0 || score > MAX_SCORE) {
    return jsonResponse({ ok: false, error: "Invalid score" }, 400);
  }

  const existing = await env.DB.prepare(
    "SELECT score FROM leaderboard_entries WHERE player_name = ? AND mode = ? AND difficulty = ?"
  )
    .bind(playerName, mode, difficulty)
    .first();

  if (existing && existing.score >= score) {
    return jsonResponse({ ok: true, updated: false });
  }

  if (existing) {
    await env.DB.prepare(
      "UPDATE leaderboard_entries SET score = ?, updated_at = datetime('now') WHERE player_name = ? AND mode = ? AND difficulty = ?"
    )
      .bind(score, playerName, mode, difficulty)
      .run();
  } else {
    await env.DB.prepare(
      "INSERT INTO leaderboard_entries (player_name, mode, difficulty, score) VALUES (?, ?, ?, ?)"
    )
      .bind(playerName, mode, difficulty, score)
      .run();
  }

  return jsonResponse({ ok: true, updated: true });
};
