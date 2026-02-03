# Python base with AI/ML libraries for AI agent
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN groupadd -r aiuser && useradd -r -g aiuser aiuser

# Copy requirements and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Change ownership to non-root user
RUN chown -R aiuser:aiuser /app
USER aiuser

# Expose port for AI agent
EXPOSE 8002

# Run the AI agent with environment variable support
CMD ["python", "ai_agent.py"]