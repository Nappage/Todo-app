# 開発ガイド

## 開発環境のセットアップ

### 必要なツール
- Node.js (16.x以上)
- Docker
- Docker Compose
- AWS CLI
- Terraform

### ローカル環境のセットアップ手順
1. リポジトリのクローン
```bash
git clone https://github.com/Nappage/Todo-app.git
cd Todo-app
```

2. 開発用ブランチの作成
```bash
git checkout -b development
```

3. フロントエンド開発環境の起動
```bash
cd frontend
npm install
npm start
```

4. バックエンド開発環境の起動
```bash
cd backend
npm install
npm run dev
```

5. データベースの起動（Docker）
```bash
docker-compose up -d
```

## テスト
### フロントエンドのテスト
```bash
cd frontend
npm test
```

### バックエンドのテスト
```bash
cd backend
npm test
```

## デバッグ
### フロントエンド
- Chrome DevTools の使用
- React Developer Tools の利用

### バックエンド
- VS Code デバッガーの設定
- Postman/Insomnia での API テスト

## コーディング規約
- ESLint と Prettier の設定に従う
- TypeScript の型定義を適切に行う
- コンポーネントの単一責任原則を守る

## CI/CD パイプライン
- プルリクエスト作成時に自動テスト実行
- main ブランチへのマージで自動デプロイ
- デプロイ前の動作確認環境あり