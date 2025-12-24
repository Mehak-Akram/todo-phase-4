---
description: "Task list for Phase I todo application implementation"
---

# Tasks: Phase I - Evolution of Todo

**Input**: Design documents from `/specs/1-todo-app-phase1/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Constitution Compliance**: All tasks must adhere to the Evolution of Todo Constitution:
- Follow Spec-Driven Development: Implementation must trace back to approved specifications
- No manual coding by humans: All implementation must follow approved tasks
- No deviation from approved specifications: Refinement occurs at spec level
- Technology stack compliance: Python, no external dependencies
- Quality principles: Clean architecture, separation of concerns, cloud-native readiness

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `todo_app.py` at repository root
- Paths shown below assume single file approach

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan in todo_app.py
- [x] T002 Define Task class and in-memory storage structure per data-model.md
- [x] T003 [P] Set up basic Python file structure with imports

---
## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Implement Task data model with ID, description, status, and created_at fields per data-model.md
- [x] T005 [P] Create in-memory storage using Python list and dictionary as specified in data-model.md
- [x] T006 [P] Implement auto-incrementing ID generation strategy per research.md
- [x] T007 Create application startup and main menu loop structure per plan.md

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---
## Phase 3: User Story 1 - Add New Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to add new tasks to their todo list with a unique identifier

**Independent Test**: User can start the application, add a new task, and verify that the task appears in the task list when viewing tasks

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T008 [P] [US1] Unit test for add_task function in tests/test_todo_app.py
- [x] T009 [P] [US1] Integration test for add task flow in tests/test_cli.py

### Implementation for User Story 1

- [x] T010 [P] [US1] Create add_task function that accepts description and returns Task object per spec.md FR-002
- [x] T011 [US1] Implement task ID assignment using auto-increment strategy per research.md
- [x] T012 [US1] Add task to in-memory storage per data-model.md
- [x] T013 [US1] Add CLI menu option for adding tasks per contracts/cli-contracts.md
- [x] T014 [US1] Implement user input handling for task description per spec.md FR-002
- [x] T015 [US1] Add validation to ensure task description is not empty per spec.md FR-011
- [x] T016 [US1] Add success message output after task creation per contracts/cli-contracts.md

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---
## Phase 4: User Story 2 - View Task List (Priority: P1)

**Goal**: Enable users to see all tasks in their todo list with status and identifiers

**Independent Test**: User can start the application, add some tasks, then view the task list and see all tasks displayed with their status and identifiers

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [x] T017 [P] [US2] Unit test for view_tasks function in tests/test_todo_app.py
- [x] T018 [P] [US2] Integration test for view tasks flow in tests/test_cli.py

### Implementation for User Story 2

- [x] T019 [P] [US2] Create view_tasks function that returns all tasks per spec.md FR-005
- [x] T020 [US2] Format task output with ID, description, and status per spec.md FR-005
- [x] T021 [US2] Add CLI menu option for viewing tasks per contracts/cli-contracts.md
- [x] T022 [US2] Handle empty task list case with appropriate message per spec.md FR-010
- [x] T023 [US2] Format output as table per quickstart.md example

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---
## Phase 5: User Story 3 - Mark Task Complete/Incomplete (Priority: P2)

**Goal**: Enable users to update the status of a task to mark it as complete or incomplete

**Independent Test**: User can start the application, add a task, mark it as complete, then view the task list to confirm the status change

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [x] T024 [P] [US3] Unit test for mark_task_status function in tests/test_todo_app.py
- [x] T025 [P] [US3] Integration test for mark task flow in tests/test_cli.py

### Implementation for User Story 3

- [x] T026 [P] [US3] Create mark_task_status function that accepts task ID and status per spec.md FR-006
- [x] T027 [US3] Validate task ID exists in list per spec.md FR-009
- [x] T028 [US3] Update task status in in-memory storage per data-model.md
- [x] T029 [US3] Add CLI menu option for marking tasks per contracts/cli-contracts.md
- [x] T030 [US3] Implement user input handling for task ID and status per contracts/cli-contracts.md
- [x] T031 [US3] Add error handling for invalid task ID per spec.md FR-009
- [x] T032 [US3] Add success message output after status update per contracts/cli-contracts.md

**Checkpoint**: All user stories should now be independently functional

---
## Phase 6: User Story 4 - Update Task Description (Priority: P3)

**Goal**: Enable users to change the description of an existing task

**Independent Test**: User can start the application, add a task, update its description, then view the task list to confirm the description change

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [x] T033 [P] [US4] Unit test for update_task function in tests/test_todo_app.py
- [x] T034 [P] [US4] Integration test for update task flow in tests/test_cli.py

### Implementation for User Story 4

- [x] T035 [P] [US4] Create update_task function that accepts task ID and new description per spec.md FR-007
- [x] T036 [US4] Validate task ID exists in list per spec.md FR-009
- [x] T037 [US4] Update task description in in-memory storage per data-model.md
- [x] T038 [US4] Add CLI menu option for updating tasks per contracts/cli-contracts.md
- [x] T039 [US4] Implement user input handling for task ID and new description per contracts/cli-contracts.md
- [x] T040 [US4] Add validation to ensure new description is not empty per spec.md FR-011
- [x] T041 [US4] Add error handling for invalid task ID per spec.md FR-009
- [x] T042 [US4] Add success message output after description update per contracts/cli-contracts.md

**Checkpoint**: All user stories should now be independently functional

---
## Phase 7: User Story 5 - Delete Task (Priority: P3)

**Goal**: Enable users to remove a task from their todo list

**Independent Test**: User can start the application, add a task, delete it, then view the task list to confirm the task is no longer present

### Tests for User Story 5 (OPTIONAL - only if tests requested) ⚠️

- [x] T043 [P] [US5] Unit test for delete_task function in tests/test_todo_app.py
- [x] T044 [P] [US5] Integration test for delete task flow in tests/test_cli.py

### Implementation for User Story 5

- [x] T045 [P] [US5] Create delete_task function that accepts task ID per spec.md FR-008
- [x] T046 [US5] Validate task ID exists in list per spec.md FR-009
- [x] T047 [US5] Remove task from in-memory storage per data-model.md
- [x] T048 [US5] Add CLI menu option for deleting tasks per contracts/cli-contracts.md
- [x] T049 [US5] Implement user input handling for task ID per contracts/cli-contracts.md
- [x] T050 [US5] Add error handling for invalid task ID per spec.md FR-009
- [x] T051 [US5] Add success message output after task deletion per contracts/cli-contracts.md

**Checkpoint**: All user stories should now be independently functional

---
## Phase 8: Error Handling and Validation (Cross-cutting)

**Purpose**: Implement comprehensive error handling and validation across all features

- [x] T052 [P] Implement input validation for all user inputs per spec.md FR-011
- [x] T053 [P] Add error handling for invalid menu options per spec.md edge cases
- [x] T054 Add error handling for empty task list when trying to update/delete per spec.md edge cases
- [x] T055 Add error handling for non-numeric task IDs per spec.md edge cases
- [x] T056 Create error message functions for consistent error output per spec.md FR-011
- [x] T057 Add validation for task ID uniqueness per data-model.md

---
## Phase 9: Application Flow and Exit (Cross-cutting)

**Purpose**: Complete the main application loop and exit functionality

- [x] T058 [P] Implement main menu display with all options per quickstart.md
- [x] T059 [P] Implement menu option parsing and routing per contracts/cli-contracts.md
- [x] T060 Implement exit functionality per contracts/cli-contracts.md
- [x] T061 Add graceful application termination per quickstart.md
- [x] T062 Implement continuous loop until exit option selected per plan.md

---
## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T063 [P] Documentation updates in comments per plan.md
- [x] T064 Code cleanup and refactoring for readability
- [x] T065 [P] Add type hints to all functions
- [x] T066 [P] Additional unit tests (if requested) in tests/
- [x] T067 Security hardening (input sanitization)
- [x] T068 Run quickstart.md validation

---
## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Error Handling (Phase 8)**: Depends on all core functionality being implemented
- **Application Flow (Phase 9)**: Depends on core functionality being implemented
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May depend on US1 for task creation
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - May depend on US1 for task creation
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - May depend on US1 for task creation

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Core functionality before CLI integration
- Input validation before processing
- Error handling before success cases
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---
## Implementation Strategy

### MVP First (User Stories 1-2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Add Task)
4. Complete Phase 4: User Story 2 (View Tasks)
5. **STOP and TEST**: Test US1 and US2 together - basic add/view functionality
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Add functionality!)
3. Add User Story 2 → Test independently → Deploy/Demo (View functionality!)
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Add Task)
   - Developer B: User Story 2 (View Tasks)
   - Developer C: User Story 3 (Mark Task)
3. Stories complete and integrate independently

---
## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence