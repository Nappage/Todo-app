# API仕様書

## 1. API概要

### 1.1 基本情報
- ベースURL: `https://api.example.com/v1`
- プロトコル: HTTPS
- データフォーマット: JSON
- 文字コード: UTF-8

### 1.2 共通仕様

#### リクエストヘッダー
```
Content-Type: application/json
Accept: application/json
```

#### エラーレスポンス
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ"
  }
}
```

## 2. エンドポイント

### 2.1 TODOタスクの一覧取得

#### GET /tasks

##### リクエストパラメータ
| パラメータ | 型 | 必須 | 説明 |
|------------|------|--------|--------|
| completed | boolean | 任意 | 完了状態でのフィルタリング |
| limit | number | 任意 | 取得件数の制限（デフォルト: 20） |
| offset | number | 任意 | 取得開始位置（デフォルト: 0） |

##### レスポンス
```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "タスクタイトル",
      "description": "タスクの説明",
      "completed": false,
      "createdAt": "2024-02-10T12:00:00Z",
      "updatedAt": "2024-02-10T12:00:00Z"
    }
  ],
  "total": 100,
  "limit": 20,
  "offset": 0
}
```

### 2.2 TODOタスクの作成

#### POST /tasks

##### リクエストボディ
```json
{
  "title": "タスクタイトル",
  "description": "タスクの説明"
}
```

##### レスポンス
```json
{
  "task": {
    "id": "uuid",
    "title": "タスクタイトル",
    "description": "タスクの説明",
    "completed": false,
    "createdAt": "2024-02-10T12:00:00Z",
    "updatedAt": "2024-02-10T12:00:00Z"
  }
}
```

### 2.3 TODOタスクの更新

#### PUT /tasks/:id

##### パスパラメータ
| パラメータ | 型 | 説明 |
|------------|------|--------|
| id | string | タスクID |

##### リクエストボディ
```json
{
  "title": "タスクタイトル",
  "description": "タスクの説明",
  "completed": true
}
```

##### レスポンス
```json
{
  "task": {
    "id": "uuid",
    "title": "タスクタイトル",
    "description": "タスクの説明",
    "completed": true,
    "createdAt": "2024-02-10T12:00:00Z",
    "updatedAt": "2024-02-10T12:00:00Z"
  }
}
```

### 2.4 TODOタスクの削除

#### DELETE /tasks/:id

##### パスパラメータ
| パラメータ | 型 | 説明 |
|------------|------|--------|
| id | string | タスクID |

##### レスポンス
```json
{
  "success": true
}
```

## 3. エラーコード

| コード | 説明 |
|------------|--------|
| INVALID_REQUEST | リクエストパラメータが不正 |
| TASK_NOT_FOUND | 指定されたタスクが存在しない |
| INTERNAL_ERROR | 内部エラー |

## 4. セキュリティ

### 4.1 CORS設定
```typescript
app.use(cors({
  origin: ["http://localhost:3000", "https://example.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
```

### 4.2 レートリミット
```typescript
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 100 // IPアドレスごとのリクエスト数
}));
```