let sessions: Record<string,{user:string; ai:string}[]> = {};

export function getMemory(sessionId:string) {
    return sessions[sessionId]?.slice(-2) || [];
}

export function saveMessage(sessionId:string, user:string, ai:string) {
    if (!sessions[sessionId]) sessions[sessionId] = [];
    sessions[sessionId].push({user,ai});
}