# Quick Start Guide: Phase IV Production Infrastructure

## Prerequisites

- Docker installed and running
- Kubernetes cluster access (local: minikube, kind, or k3s; cloud: EKS, AKS, GKE)
- kubectl configured to access the cluster
- Access to Neon PostgreSQL database (or compatible PostgreSQL instance)

## Local Development Setup

### 1. Clone and Navigate
```bash
git clone [repository-url]
cd [repository-root]
```

### 2. Build Container Images
```bash
# Build backend API
cd backend
docker build -t todo-backend:latest .

# Build frontend
cd ../frontend
docker build -t todo-frontend:latest .

# Build MCP server (if separate)
cd ../mcp-server
docker build -t todo-mcp:latest .

# Build AI agent (if separate)
cd ../ai-agent
docker build -t todo-ai-agent:latest .
```

### 3. Deploy to Kubernetes
```bash
# Create namespace
kubectl create namespace todo-app

# Apply all manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f backend/k8s/
kubectl apply -f frontend/k8s/
kubectl apply -f mcp-server/k8s/  # if applicable
kubectl apply -f ai-agent/k8s/   # if applicable

# Apply shared infrastructure
kubectl apply -f k8s/postgres-secret.yaml
kubectl apply -f k8s/ingress-controller.yaml
```

### 4. Verify Deployment
```bash
# Check all pods are running
kubectl get pods -n todo-app

# Check services are available
kubectl get services -n todo-app

# Check ingress routes
kubectl get ingress -n todo-app
```

## Production Deployment

### 1. Configure Environment Variables
Create ConfigMaps and Secrets for your environment:
```bash
# Create database connection secret
kubectl create secret generic postgres-config \
  --from-literal=DATABASE_URL="postgresql://..." \
  --namespace todo-app

# Create application configuration
kubectl create configmap app-config \
  --from-literal=NODE_ENV=production \
  --from-literal=API_BASE_URL=https://api.yourdomain.com \
  --namespace todo-app
```

### 2. Scale Services
```bash
# Scale backend to handle load
kubectl scale deployment todo-backend --replicas=3 -n todo-app

# Scale frontend for high availability
kubectl scale deployment todo-frontend --replicas=3 -n todo-app
```

### 3. Monitor Health
```bash
# Check pod status
kubectl get pods -n todo-app -w

# View logs
kubectl logs -f deployment/todo-backend -n todo-app

# Check resource usage
kubectl top pods -n todo-app
```

## Scaling Operations

### Horizontal Scaling
```bash
# Manual scaling
kubectl scale deployment todo-backend --replicas=5 -n todo-app

# Enable autoscaling
kubectl autoscale deployment todo-backend --cpu-percent=70 --min=2 --max=10 -n todo-app
```

### Configuration Updates
```bash
# Update configuration
kubectl patch configmap app-config -n todo-app --patch '{"data":{"NEW_FEATURE_FLAG":"true"}}'

# Trigger rolling update
kubectl rollout restart deployment/todo-backend -n todo-app
```

## Troubleshooting

### Pod Issues
```bash
# Check pod events
kubectl describe pod <pod-name> -n todo-app

# View logs
kubectl logs <pod-name> -n todo-app
kubectl logs <pod-name> -n todo-app --previous  # Previous instance logs
```

### Service Connectivity
```bash
# Test service connectivity
kubectl exec -it <pod-name> -n todo-app -- nslookup todo-backend-service

# Port forward for debugging
kubectl port-forward service/todo-backend-service 8000:80 -n todo-app
```

## Cleanup
```bash
# Remove all resources
kubectl delete namespace todo-app

# Or remove specific deployments
kubectl delete deployment todo-backend todo-frontend -n todo-app
kubectl delete service todo-backend-service todo-frontend-service -n todo-app
```