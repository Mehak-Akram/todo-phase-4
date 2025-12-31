FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY src/ ./src/

# Create a default .env file with SQLite as fallback for Hugging Face Spaces
RUN echo "DATABASE_URL=sqlite:///./todo_app.db" > .env
RUN echo "SECRET_KEY=hf-space-dev-secret-key-change-this-in-production" >> .env
RUN echo "DEBUG=true" >> .env

# Expose port
EXPOSE 8000

# Set environment variables
ENV PYTHONPATH=/app
ENV PORT=8000

# Create entrypoint script for better error handling
RUN echo '#!/bin/bash\nset -e\npython -c "from src.database.database import create_db_and_tables; create_db_and_tables()"\necho "Database initialized successfully"\nexec uvicorn src.main:app --host 0.0.0.0 --port $PORT --reload' > /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Run database initialization and start the application
ENTRYPOINT ["/app/entrypoint.sh"]