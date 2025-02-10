# テストガイド

## 1. テストの種類と目的

### 1.1 ユニットテスト
- 個々のコンポーネントや関数の動作確認
- Jestを使用
- カバレッジ目標: 80%以上

### 1.2 統合テスト
- APIエンドポイントのテスト
- Supertestを使用

### 1.3 E2Eテスト
- ユーザー操作のシミュレーション
- Cypressを使用

## 2. フロントエンドのテスト

### 2.1 コンポーネントテスト

```typescript
// TodoList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList", () => {
  const mockTodos = [
    { id: "1", title: "Test Todo", completed: false },
    { id: "2", title: "Completed Todo", completed: true },
  ];

  it("renders todo items", () => {
    render(<TodoList todos={mockTodos} />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("Completed Todo")).toBeInTheDocument();
  });

  it("handles todo completion toggle", () => {
    const onToggle = jest.fn();
    render(<TodoList todos={mockTodos} onToggle={onToggle} />);
    
    fireEvent.click(screen.getByTestId("todo-checkbox-1"));
    expect(onToggle).toHaveBeenCalledWith("1");
  });
});
```

### 2.2 カスタムフックのテスト

```typescript
// useTodos.test.ts
import { renderHook, act } from "@testing-library/react-hooks";
import { useTodos } from "./useTodos";

describe("useTodos", () => {
  it("adds new todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo("New Todo");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe("New Todo");
  });
});
```

## 3. バックエンドのテスト

### 3.1 APIテスト

```typescript
// tasks.test.ts
import request from "supertest";
import app from "../app";
import { prisma } from "../db";

describe("Tasks API", () => {
  beforeEach(async () => {
    await prisma.task.deleteMany();
  });

  it("creates a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "Test Description"
      });

    expect(response.status).toBe(201);
    expect(response.body.task.title).toBe("Test Task");
  });
});
```

### 3.2 サービス層のテスト

```typescript
// taskService.test.ts
import { TaskService } from "../services/taskService";
import { prismaMock } from "../prisma/singleton";

describe("TaskService", () => {
  it("creates a task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Test Description"
    };

    prismaMock.task.create.mockResolvedValue({
      id: "1",
      ...taskData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const task = await TaskService.createTask(taskData);
    expect(task.title).toBe(taskData.title);
  });
});
```

## 4. E2Eテスト

### 4.1 Cypressテストの例

```typescript
// todo.spec.ts
describe("Todo Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("creates and completes a todo", () => {
    // 新規タスクの作成
    cy.get("[data-testid=new-todo-input]").type("Buy groceries{enter}");

    // タスクが追加されたことを確認
    cy.get("[data-testid=todo-list]").should("contain", "Buy groceries");

    // タスクを完了状態にする
    cy.get("[data-testid=todo-checkbox]").first().click();

    // タスクが完了状態になったことを確認
    cy.get("[data-testid=todo-item]").first().should("have.class", "completed");
  });
});
```

## 5. テストの実行

### 5.1 ローカルでのテスト実行

```bash
# フロントエンドのテスト
cd frontend
npm test

# バックエンドのテスト
cd backend
npm test

# E2Eテスト
npm run cypress:run
```

### 5.2 CI/CDでのテスト実行

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install Dependencies
        run: |
          cd frontend && npm install
          cd ../backend && npm install

      - name: Run Tests
        run: |
          cd frontend && npm test -- --coverage
          cd ../backend && npm test -- --coverage

      - name: Upload Coverage
        uses: actions/upload-artifact@v2
        with:
          name: coverage
          path: |
            frontend/coverage
            backend/coverage
```

## 6. テストカバレッジ

### 6.1 カバレッジ目標

- フロントエンド: 80%以上
- バックエンド: 80%以上

### 6.2 カバレッジレポートの確認

```bash
# カバレッジレポートの生成
npm test -- --coverage

# 結果の確認
open coverage/lcov-report/index.html
```