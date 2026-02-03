#!/bin/bash

# Deployment validation script for Todo App
# Verifies all services are running correctly in Kubernetes

NAMESPACE="todo-app"

echo "Validating Todo App deployment in namespace: $NAMESPACE"

# Check if namespace exists
if ! kubectl get namespace $NAMESPACE &> /dev/null; then
    echo "❌ Namespace $NAMESPACE does not exist"
    exit 1
fi

echo "✅ Namespace $NAMESPACE exists"

# Check deployments
deployments=("backend-deployment" "mcp-deployment" "ai-deployment" "frontend-deployment")

for deployment in "${deployments[@]}"; do
    replicas=$(kubectl get deployment $deployment -n $NAMESPACE -o jsonpath='{.status.readyReplicas}')
    desired_replicas=$(kubectl get deployment $deployment -n $NAMESPACE -o jsonpath='{.spec.replicas}')

    if [ "$replicas" = "$desired_replicas" ] && [ "$replicas" != "0" ]; then
        echo "✅ $deployment: $replicas/$desired_replicas replicas ready"
    else
        echo "❌ $deployment: $replicas/$desired_replicas replicas ready"
        exit 1
    fi
done

# Check services
services=("backend-service" "mcp-service" "ai-service" "frontend-service")

for service in "${services[@]}"; do
    if kubectl get service $service -n $NAMESPACE &> /dev/null; then
        echo "✅ $service: exists"
    else
        echo "❌ $service: does not exist"
        exit 1
    fi
done

# Check HPAs
hpas=("backend-hpa" "mcp-hpa" "ai-hpa" "frontend-hpa")

for hpa in "${hpas[@]}"; do
    if kubectl get hpa $hpa -n $NAMESPACE &> /dev/null; then
        echo "✅ $hpa: exists"
    else
        echo "⚠️  $hpa: does not exist (optional for basic functionality)"
    fi
done

# Check ingress
if kubectl get ingress frontend-ingress -n $NAMESPACE &> /dev/null; then
    echo "✅ frontend-ingress: exists"
else
    echo "⚠️  frontend-ingress: does not exist"
fi

# Check pods status
pods=$(kubectl get pods -n $NAMESPACE --no-headers | wc -l)
ready_pods=$(kubectl get pods -n $NAMESPACE --no-headers | grep -c "Running")

if [ "$pods" = "$ready_pods" ]; then
    echo "✅ All $pods pods are running"
else
    echo "⚠️  $ready_pods/$pods pods are running"
    kubectl get pods -n $NAMESPACE
fi

echo ""
echo "🎉 Deployment validation completed!"
echo "Namespace: $NAMESPACE"
echo "Deployments: ${#deployments[@]}/${#deployments[@]} healthy"
echo "Services: ${#services[@]}/${#services[@]} exist"
echo ""

# Optional: Test service connectivity
echo "Testing service connectivity..."
kubectl run --rm -it --image=curlimages/curl:latest --restart=Never connectivity-test -n $NAMESPACE -- \
    sh -c 'echo "Testing backend connectivity..." && timeout 10 curl -f http://backend-service:80/health 2>/dev/null && echo "Backend OK" || echo "Backend connectivity issue"'