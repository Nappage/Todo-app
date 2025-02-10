# デプロイメントガイド

## 1. デプロイメントの概要

### 1.1 デプロイメントフロー

1. GitHubへのプッシュ
2. GitHub Actionsによるテスト実行
3. Dockerイメージのビルド
4. ECRへのプッシュ
5. ECSでのデプロイ

### 1.2 必要な環境変数

```bash
# AWS認証情報
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-northeast-1

# データベース接続情報
DATABASE_URL=postgresql://user:password@host:5432/dbname

# アプリケーション設定
NODE_ENV=production
PORT=3000
```

## 2. CI/CDパイプライン

### 2.1 GitHub Actionsの設定

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: todo-app
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

      - name: Deploy to ECS
        run: |
          aws ecs update-service --cluster todo-app --service todo-app-service --force-new-deployment
```

## 3. Dockerコンテナのビルド

### 3.1 フロントエンドのDockerfile

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3.2 バックエンドのDockerfile

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 4. AWSリソースの設定

### 4.1 ECSタスク定義

```json
{
  "family": "todo-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "todo-app",
      "image": "${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/todo-app",
          "awslogs-region": "ap-northeast-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## 5. デプロイ手順

### 5.1 初回デプロイ

1. AWSリソースの作成
```bash
# Terraformでのインフラ構築
cd terraform
terraform init
terraform plan
terraform apply
```

2. GitHubシークレットの設定
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- DATABASE_URL

3. 初回デプロイの実行
```bash
git push origin main
```

### 5.2 更新デプロイ

1. コードの変更とコミット
```bash
git add .
git commit -m "Update: description of changes"
```

2. GitHubへのプッシュ
```bash
git push origin main
```

3. デプロイの確認
- GitHub Actionsのパイプライン確認
- ECSサービスの状態確認
- アプリケーションの動作確認

## 6. ロールバック手順

### 6.1 ECSサービスのロールバック

```bash
# 前回のタスク定義を取得
aws ecs describe-task-definition --task-definition todo-app:$PREVIOUS_REVISION

# サービスを前回のバージョンに更新
aws ecs update-service \
  --cluster todo-app \
  --service todo-app-service \
  --task-definition todo-app:$PREVIOUS_REVISION \
  --force-new-deployment
```

### 6.2 データベースのロールバック

```bash
# データベースのバックアップからの復元
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier todo-app-db \
  --db-snapshot-identifier todo-app-backup-$TIMESTAMP
```