<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0 (technology matrix amendment)
- Modified principles: Technology Stack Constraints (Phase-based requirements)
- Added sections: Phase I, Phase II, Phase III technology constraints with rules
- Removed sections: N/A
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending review
- Follow-up TODOs: None
-->

# Evolution of Todo Constitution

## Core Principles

### Spec-Driven Development Mandate
All development must follow the approved specification lifecycle: Constitution → Specs → Plan → Tasks → Implement. No agent may write code without approved specs and tasks. This ensures alignment with business requirements and prevents scope creep.

### Agent Behavior Rules
Agents must strictly follow approved specifications without deviation. No manual coding by humans, no feature invention, no deviation from approved specifications. Refinement must occur at spec level, not code level. This maintains consistency and quality across all development activities.

### Phase Governance
Each phase is strictly scoped by its specification. Future-phase features must never leak into earlier phases. Architecture may evolve only through updated specs and plans. This ensures proper sequencing and prevents premature implementation of complex features.

### Technology Stack Constraints
Phase I: In-memory console application only. No web frontend, authentication, or database allowed.

Phase II: Backend must use Python REST API with SQLModel or equivalent. Database must use Neon Serverless PostgreSQL. Frontend must use Next.js (React, TypeScript). Authentication must use Better Auth (signup/signin). Architecture must be full-stack web application. OpenAI Agents SDK and MCP are required for agent functionality. Containerization must use Docker with Kubernetes orchestration (in later phases). Message queuing must use Kafka and Dapr (in later phases). This ensures architectural consistency and maintainability across phases.

Phase III and later: Advanced cloud infrastructure, agents, AI, orchestration allowed. This ensures proper sequencing and prevents premature implementation of complex features.

### Quality Principles
All code must follow clean architecture principles with clear separation of concerns. Services must be stateless where required. Code must be cloud-native ready. These principles ensure maintainable, scalable, and deployable software solutions.

### Compliance and Verification
All work must be verifiable against the constitution. Agents must validate compliance with all principles before implementing. This ensures the constitution remains the governing document for all development activities.

## Technology Constraints

The Evolution of Todo project must adhere to the following technology stack by phase:

### Phase I (Current)
- Backend: In-memory console application only
- Database: None
- Frontend: None
- Authentication: Not allowed
- Other: Console-based only

### Phase II (Next)
- Backend: Python REST API
- Database: Neon Serverless PostgreSQL
- ORM/Data layer: SQLModel or equivalent
- Frontend: Next.js (React, TypeScript)
- Authentication: Better Auth (signup/signin)
- Architecture: Full-stack web application
- Agent SDK: OpenAI Agents SDK
- Protocol: MCP (Model Context Protocol)
- Containerization: Docker
- Orchestration: Kubernetes (for later phases)
- Message Queuing: Kafka and Dapr (for later phases)

### Phase III and Later
- Advanced cloud infrastructure, agents, AI, orchestration allowed

**Rules:**
- Authentication is allowed starting Phase II
- Web frontend is allowed starting Phase II
- Neon PostgreSQL is allowed starting Phase II
- No AI or agent frameworks until later phases
- Phase isolation must be preserved - future-phase features must not leak into earlier phases

Any deviation from this stack requires explicit approval and constitutional amendment.

## Development Workflow

All development must follow the Spec-Driven Development lifecycle:
1. Constitution defines the governing principles
2. Specifications define the feature requirements
3. Architecture plans define the implementation approach
4. Task lists break down implementation into testable units
5. Implementation follows the approved tasks

Code reviews must verify compliance with all constitutional principles. No code may be merged that violates these principles without proper amendment.

## Governance

This constitution is the supreme governing document for all agents working on the Evolution of Todo project. It supersedes all other practices and guidelines.

Amendments to this constitution require formal documentation, approval from project leadership, and a migration plan for existing code. All agents must comply with the current version of the constitution.

The constitution must remain stable across all phases and act as the consistent governing document for all agents. Any conflicts between this constitution and other documents must be resolved in favor of the constitution.

Compliance reviews will be conducted regularly to ensure all ongoing work aligns with constitutional principles.

**Version**: 1.1.0 | **Ratified**: 2025-12-24 | **Last Amended**: 2025-12-26
