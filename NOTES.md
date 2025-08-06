# Development Notes - AI Agent Server

## 🤖 AI-Generated vs. Manual Implementation

### AI-Generated Content:
- **Initial project structure and boilerplate**: Used AI to scaffold the basic Express.js server setup
- **TypeScript configurations**: AI helped with tsconfig.json and package.json setup
- **Basic prompt engineering**: Initial system prompt structure was AI-assisted
- **Documentation**: README.md structure and API examples were AI-generated
- **Error handling patterns**: Standard try-catch patterns were AI-suggested

### Manual Implementation:
- **Custom embedding system**: Built from scratch using word frequency and semantic features
- **Cosine similarity algorithm**: Implemented custom vector similarity calculation
- **Plugin detection logic**: Designed custom intent detection patterns
- **Memory management**: Built session-based conversation memory system
- **RAG retrieval logic**: Custom implementation for document chunking and retrieval
- **Weather API integration**: Manual OpenWeather API integration with city extraction
- **Math plugin security**: Implemented mathjs for safe mathematical evaluation

## 🐛 Bugs Faced and Solutions

### 1. **ES Module Import Issues**
**Problem**: TypeScript ES module imports with `.js` extensions
**Solution**: Added `"type": "module"` to package.json and used `.js` extensions in imports

### 2. **Vector Similarity Performance**
**Problem**: Initial embedding system was too simplistic
**Solution**: Enhanced with semantic features (markdown detection, code blocks, links) and word hashing

### 3. **Plugin Intent Detection**
**Problem**: Basic keyword matching missed complex queries
**Solution**: Implemented regex patterns for math detection and comprehensive weather keywords

### 4. **Memory Persistence**
**Problem**: In-memory storage lost data on server restart
**Solution**: Designed for session-based memory (can be extended to database storage)

### 5. **Document Chunking**
**Problem**: Large documents created poor retrieval results
**Solution**: Implemented paragraph-based chunking with size limits (500 chars)

## 🔄 Agent Routing Logic

### Message Flow:
1. **Input Validation**: Check for required `session_id` and `message`
2. **Memory Retrieval**: Get last 2 conversation turns for context
3. **RAG Processing**: 
   - Embed user message using custom embedding function
   - Calculate cosine similarity with all document chunks
   - Select top 3 most relevant chunks with diversity
4. **Plugin Detection**:
   - Weather: Check for weather-related keywords
   - Math: Use regex to detect mathematical expressions
5. **Plugin Execution**: Run detected plugins and capture output
6. **Prompt Assembly**: Combine memory, context, and plugin outputs
7. **LLM Call**: Send to Groq API with structured prompt
8. **Response Processing**: Save to memory and return to user

### Key Design Decisions:
- **Custom Embeddings**: Built lightweight embedding system for better control
- **Session Memory**: Simple in-memory storage for conversation continuity
- **Plugin Architecture**: Extensible system for adding new capabilities
- **Error Resilience**: Graceful fallbacks when plugins or LLM calls fail

## 🎯 Technical Highlights

### Vector Search Implementation:
- Custom 100-dimensional embeddings using word frequency and semantic features
- Cosine similarity for document retrieval
- Diversity-based selection to avoid similar chunks

### Plugin System:
- Intent detection using keyword matching and regex patterns
- Extensible architecture for adding new plugins
- Secure math evaluation using mathjs library

### Memory Management:
- Session-based conversation history
- Automatic cleanup of old sessions (can be extended)
- Context injection for conversation continuity

## 🚀 Deployment Considerations

The project is ready for deployment on:
- **Render**: Add `start` script and environment variables
- **Railway**: Direct deployment from GitHub
- **Vercel**: Serverless function deployment
- **Replit**: Direct deployment with environment setup

Environment variables needed:
- `GROQ_API_KEY`: For LLM API access
- `OPENWEATHER_API_KEY`: For weather plugin
- `PORT`: Server port (optional, defaults to 3000) 