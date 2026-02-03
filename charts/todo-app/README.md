# Todo App Helm Chart

This Helm chart deploys the Todo application with a frontend and backend service.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.0+

## Installation

```bash
# Install with default values
helm install todo-app charts/todo-app/

# Install with custom values
helm install todo-app charts/todo-app/ -f values-production.yaml

# Install in a specific namespace
helm install todo-app charts/todo-app/ --namespace todo-app --create-namespace
```

## Configuration

The following table lists the configurable parameters of the todo-app chart and their default values.

### Frontend Parameters

| Parameter                          | Description                                         | Default                             |
|------------------------------------|-----------------------------------------------------|-------------------------------------|
| `frontend.image.repository`        | Frontend image repository                           | `todo-frontend`                     |
| `frontend.image.pullPolicy`        | Frontend image pull policy                          | `IfNotPresent`                      |
| `frontend.image.tag`               | Frontend image tag                                  | `latest`                            |
| `frontend.replicaCount`            | Number of frontend replicas                         | `2`                                 |
| `frontend.service.type`            | Frontend service type                               | `ClusterIP`                         |
| `frontend.service.port`            | Frontend service port                               | `80`                                |
| `frontend.containerPort`           | Frontend container port                             | `80`                                |
| `frontend.resources.requests.cpu`  | CPU request for frontend                            | `50m`                               |
| `frontend.resources.requests.memory`| Memory request for frontend                        | `64Mi`                              |
| `frontend.resources.limits.cpu`    | CPU limit for frontend                              | `100m`                              |
| `frontend.resources.limits.memory` | Memory limit for frontend                           | `128Mi`                             |

### Backend Parameters

| Parameter                          | Description                                         | Default                             |
|------------------------------------|-----------------------------------------------------|-------------------------------------|
| `backend.image.repository`         | Backend image repository                            | `todo-backend`                      |
| `backend.image.pullPolicy`         | Backend image pull policy                           | `IfNotPresent`                      |
| `backend.image.tag`                | Backend image tag                                   | `latest`                            |
| `backend.replicaCount`             | Number of backend replicas                          | `2`                                 |
| `backend.service.type`             | Backend service type                                | `ClusterIP`                         |
| `backend.service.port`             | Backend service port                                | `8000`                              |
| `backend.containerPort`            | Backend container port                              | `8000`                              |
| `backend.resources.requests.cpu`   | CPU request for backend                             | `250m`                              |
| `backend.resources.requests.memory`| Memory request for backend                          | `256Mi`                             |
| `backend.resources.limits.cpu`     | CPU limit for backend                               | `500m`                              |
| `backend.resources.limits.memory`  | Memory limit for backend                            | `512Mi`                             |

### Database Parameters

| Parameter                          | Description                                         | Default                             |
|------------------------------------|-----------------------------------------------------|-------------------------------------|
| `database.type`                    | Database type (`sqlite` or `postgresql`)            | `sqlite`                            |
| `database.postgresql.host`         | PostgreSQL host                                     | `""`                                |
| `database.postgresql.port`         | PostgreSQL port                                     | `5432`                              |
| `database.postgresql.username`     | PostgreSQL username                                 | `"postgres"`                        |
| `database.postgresql.password`     | PostgreSQL password                                 | `"password"`                        |
| `database.postgresql.database`     | PostgreSQL database name                            | `"todo_app"`                        |
| `database.sqlite.path`             | SQLite database path                                | `"./todo_app.db"`                   |

### Ingress Parameters

| Parameter                          | Description                                         | Default                             |
|------------------------------------|-----------------------------------------------------|-------------------------------------|
| `ingress.enabled`                  | Enable ingress                                      | `false`                             |
| `ingress.className`                | Ingress class name                                  | `""`                                |
| `ingress.hosts[0].host`            | Hostname for ingress                                | `chart-example.local`               |
| `ingress.hosts[0].paths[0].path`   | Path for ingress                                    | `/`                                 |

## Uninstallation

```bash
helm uninstall todo-app
```

## Values File Examples

- `values.yaml`: Default values for development
- `values-production.yaml`: Example production configuration

## Architecture

The chart creates the following resources:

- Two Deployments (frontend and backend)
- Two Services (frontend and backend)
- One main Service (for frontend)
- ConfigMaps for configuration
- Secrets for sensitive data
- Horizontal Pod Autoscalers (optional)
- Ingress (optional)
- ServiceAccount