# AI Agent Server

A backend AI agent server with RAG (Retrieval-Augmented Generation), memory, and plugin support.

## 🚀 Live Deployment

**Production URL**: https://ai-agent-server-xr4p.onrender.com

### Test the Live Deployment

```bash
# Health check
curl https://ai-agent-server-xr4p.onrender.com/health

# Send a message to the agent
curl -X POST https://ai-agent-server-xr4p.onrender.com/agent/message \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "test123",
    "message": "What is 2 + 2?"
  }'
```

## Features

- **RAG System**: Semantic search through document chunks using embeddings
- **Memory Management**: Conversation memory across sessions
- **Plugin System**: Extensible plugins for weather and math calculations
- **LLM Integration**: Powered by Groq API for fast inference
- **RESTful API**: Simple HTTP endpoints for agent interactions

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory with:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   PORT=3000
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

## API Usage

### Send a message to the agent

```bash
curl -X POST http://localhost:3000/agent/message \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "user123",
    "message": "What's the weather like in New York?"
  }'
```

**Response**:
```json
{
  "reply": "The weather in New York is 22°C and partly cloudy."
}
```

## Architecture

- **`src/service/agent.ts`**: Main agent logic with LLM integration
- **`src/utils/rag.ts`**: RAG system for document retrieval
- **`src/utils/memory.ts`**: Session-based conversation memory
- **`src/plugins/`**: Extensible plugin system
- **`src/routes/agentRoutes.ts`**: REST API endpoints

## Plugins

### Weather Plugin
Automatically detects weather-related queries and fetches real-time weather data.

### Math Plugin
Handles mathematical calculations using mathjs for security.

## Development

- **Build**: `npm run build`
- **Dev mode**: `npm run dev`
- **Generate embeddings**: `npm run build:docs`

## Deployment

This project is deployed on **Render** with automatic deployments from GitHub.

- **Platform**: Render
- **URL**: https://ai-agent-server-xr4p.onrender.com
- **Auto-deploy**: Enabled (deploys on every git push)
- **Health Check**: `/health` endpoint

## Dependencies

- **Express**: Web framework
- **Groq**: LLM API
- **MathJS**: Mathematical operations
- **Axios**: HTTP client
- **UUID**: Unique ID generation 