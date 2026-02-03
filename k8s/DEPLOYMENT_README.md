# Phase IV Deployment Instructions

## Overview
This document provides instructions for deploying the Todo application using Kubernetes with the infrastructure defined in Phase IV.

## Prerequisites
- Kubernetes cluster access
- kubectl configured to access the cluster
- Docker installed for building images

## Deployment Steps

### 1. Build Container Images
```bash
# Build backend
cd backend
docker build -t todo-backend:latest .

# Build frontend
cd ../frontend
docker build -t todo-frontend:latest .

# Build MCP server (if applicable)
cd ../mcp-server
docker build -t todo-mcp:latest .

# Build AI agent (if applicable)
cd ../ai-agent
docker build -t todo-ai-agent:latest .
```

### 2. Create Namespace
```bash
kubectl apply -f k8s/namespace.yaml
```

### 3. Deploy Secrets
```bash
kubectl apply -f k8s/postgres-secret.yaml
kubectl apply -f backend/k8s/backend-secrets.yaml
# Add other service secrets as needed
```

### 4. Deploy ConfigMaps
```bash
kubectl apply -f backend/k8s/backend-configmap.yaml
kubectl apply -f mcp-server/k8s/mcp-configmap.yaml
kubectl apply -f ai-agent/k8s/ai-configmap.yaml
kubectl apply -f frontend/k8s/frontend-configmap.yaml
```

### 5. Deploy Services
```bash
kubectl apply -f backend/k8s/backend-service.yaml
kubectl apply -f mcp-server/k8s/mcp-service.yaml
kubectl apply -f ai-agent/k8s/ai-service.yaml
kubectl apply -f frontend/k8s/frontend-service.yaml
```

### 6. Deploy Applications
```bash
kubectl apply -f backend/k8s/backend-deployment.yaml
kubectl apply -f mcp-server/k8s/mcp-deployment.yaml
kubectl apply -f ai-agent/k8s/ai-deployment.yaml
kubectl apply -f frontend/k8s/frontend-deployment.yaml
```

### 7. Deploy Horizontal Pod Autoscalers
```bash
kubectl apply -f backend/k8s/backend-hpa.yaml
kubectl apply -f mcp-server/k8s/mcp-hpa.yaml
kubectl apply -f ai-agent/k8s/ai-hpa.yaml
kubectl apply -f frontend/k8s/frontend-hpa.yaml
```

### 8. Deploy Ingress
```bash
kubectl apply -f frontend/k8s/frontend-ingress.yaml
```

## Verification
```bash
# Check all pods are running
kubectl get pods -n todo-app

# Check all services are available
kubectl get services -n todo-app

# Check HPA status
kubectl get hpa -n todo-app

# Check ingress
kubectl get ingress -n todo-app
```

## Scaling
```bash
# Manually scale a deployment
kubectl scale deployment backend-deployment --replicas=5 -n todo-app

# Check current resource usage
kubectl top pods -n todo-app
```

## Troubleshooting
```bash
# Check pod logs
kubectl logs -f deployment/backend-deployment -n todo-app

# Describe a pod for detailed information
kubectl describe pod <pod-name> -n todo-app

# Check events
kubectl get events -n todo-app --sort-by='.lastTimestamp'
```

## Cleanup
```bash
# Remove all resources
kubectl delete namespace todo-app

# Or remove specific deployments
kubectl delete -f frontend/k8s/frontend-deployment.yaml
kubectl delete -f ai-agent/k8s/ai-deployment.yaml
kubectl delete -f mcp-server/k8s/mcp-deployment.yaml
kubectl delete -f backend/k8s/backend-deployment.yaml
```