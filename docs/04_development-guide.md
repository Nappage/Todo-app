# 開発者ガイド

## 開発環境のセットアップ

### 必要なツール
- Node.js (v18以上)
- Python (3.11以上)
- Docker & Docker Compose
- PostgreSQL (14以上)

### 環境構築手順

1. リポジトリのクローン
```bash
git clone https://github.com/Nappage/Todo-app.git
cd Todo-app
```

2. フロントエンド環境構築
```bash
cd frontend
npm install
cp .env.example .env
```

3. バックエンド環境構築
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

## Dockerの使用方法

### 開発環境の起動
```bash
docker-compose up -d
```

### コンテナの確認
```bash
docker-compose ps
```

### ログの確認
```bash
docker-compose logs -f [service-name]
```

## ローカルでの起動方法

### フロントエンド
```bash
cd frontend
npm run dev
```

### バックエンド
```bash
cd backend
uvicorn main:app --reload
```

## テストの実行方法

### フロントエンドテスト
```bash
cd frontend
npm test
```

### バックエンドテスト
```bash
cd backend
pytest
```

## デバッグ方法

### フロントエンド
1. Chrome DevTools の使用
2. React Developer Tools の活用
3. Redux DevTools でのステート確認

### バックエンド
1. VSCode デバッガーの設定
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: FastAPI",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["main:app", "--reload"],
      "jinja": true
    }
  ]
}
```

2. ログの設定
```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
```