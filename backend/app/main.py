from fastapi import FastAPI
from app.api.endpoints import chatbot, users, rag, compliance, health

app = FastAPI(
    title="AI Agentic Platform",
    description="Open REST API for chatbots, agent workflows, and compliance.",
    version="1.0.0"
)

# Include routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(chatbot.router, prefix="/chat", tags=["Chatbot"])
app.include_router(rag.router, prefix="/rag", tags=["RAG"])
app.include_router(compliance.router, prefix="/compliance", tags=["Compliance"])
app.include_router(health.router, tags=["Health"])
