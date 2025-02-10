# インフラストラクチャ構成

## AWSリソース構成

### コンピューティング
- ECS Fargate: アプリケーションコンテナ実行環境
- ECR: コンテナイメージレジストリ

### データストア
- RDS (PostgreSQL): メインデータベース
- ElastiCache: セッション管理・キャッシュ

### ネットワーク
- VPC: 2つのAZにまたがる構成
- ALB: ロードバランサー
- Route53: DNS管理
- CloudFront: CDN

### モニタリング
- CloudWatch: ログ管理・メトリクス監視
- X-Ray: 分散トレーシング

## Terraformの使用方法

### 初期セットアップ
```bash
cd terraform
terraform init
```

### 環境別の適用
```bash
# 開発環境
terraform workspace select dev
terraform plan -var-file=env/dev.tfvars
terraform apply -var-file=env/dev.tfvars

# 本番環境
terraform workspace select prod
terraform plan -var-file=env/prod.tfvars
terraform apply -var-file=env/prod.tfvars
```

## 環境別の設定

### 開発環境
- インスタンスタイプ: 小規模
- バックアップ: 日次
- スケーリング: 手動

### ステージング環境
- インスタンスタイプ: 本番相当
- バックアップ: 日次
- スケーリング: 自動（本番設定）

### 本番環境
- インスタンスタイプ: 実負荷に応じて選定
- バックアップ: 日次 + 週次
- スケーリング: 自動（負荷ベース）

## セキュリティ設定

### ネットワークセキュリティ
- VPCエンドポイント使用によるプライベートアクセス
- セキュリティグループによるアクセス制御
- WAFによるWebアプリケーション保護

### データセキュリティ
- KMSによる暗号化
- バックアップの暗号化
- 転送時の暗号化（TLS）

### アクセス管理
- IAMによる細かな権限制御
- MFAの必須化
- 監査ログの有効化