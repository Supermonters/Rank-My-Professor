const VALID_MODES = new Set(["guess", "higherlower"]);
const MAX_NAME_LENGTH = 32;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

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
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const onRequestGet = async ({ request, env }) => {
  if (!env.rmp_leaderboard) {
    return jsonResponse({ ok: false, error: "Database not configured" }, 500);
  }

  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") || "";

  if (!VALID_MODES.has(mode)) {
    return jsonResponse({ ok: false, error: "Invalid game mode" }, 400);
  }

  const limitParam = Number.parseInt(url.searchParams.get("limit") || "", 10);
  const offsetParam = Number.parseInt(url.searchParams.get("offset") || "", 10);
  const limit = clamp(Number.isFinite(limitParam) ? limitParam : DEFAULT_LIMIT, 1, MAX_LIMIT);
  const offset = clamp(Number.isFinite(offsetParam) ? offsetParam : 0, 0, Number.MAX_SAFE_INTEGER);

  const rows = await env.rmp_leaderboard.prepare(
    "SELECT player_name as playerName, score FROM leaderboard_entries WHERE mode = ? ORDER BY score DESC, updated_at ASC LIMIT ? OFFSET ?"
  )
    .bind(mode, limit, offset)
    .all();

  const totalRow = await env.rmp_leaderboard.prepare(
    "SELECT COUNT(*) as count FROM leaderboard_entries WHERE mode = ?"
  )
    .bind(mode)
    .first();

  const total = totalRow?.count ?? 0;

  const rawPlayerName = url.searchParams.get("playerName");
  const playerName = typeof rawPlayerName === "string" ? rawPlayerName.trim() : "";

  let playerRank = null;
  if (playerName && playerName.length <= MAX_NAME_LENGTH) {
    const playerRow = await env.rmp_leaderboard.prepare(
      "SELECT score, updated_at FROM leaderboard_entries WHERE player_name = ? AND mode = ?"
    )
      .bind(playerName, mode)
      .first();

    if (playerRow) {
      const aheadRow = await env.rmp_leaderboard.prepare(
        "SELECT COUNT(*) as count FROM leaderboard_entries WHERE mode = ? AND (score > ? OR (score = ? AND updated_at < ?))"
      )
        .bind(mode, playerRow.score, playerRow.score, playerRow.updated_at)
        .first();
      playerRank = (aheadRow?.count ?? 0) + 1;
    }
  }

  return jsonResponse({
    ok: true,
    mode,
    limit,
    offset,
    total,
    playerRank,
    entries: rows.results || []
  });
};
