let sessions = {};
export function getMemory(sessionId) {
    return sessions[sessionId]?.slice(-2) || [];
}
export function saveMessage(sessionId, user, ai) {
    if (!sessions[sessionId])
        sessions[sessionId] = [];
    sessions[sessionId].push({ user, ai });
}
