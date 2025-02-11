# Git/GitHub ワークフロー

## GitHub機能の利用ガイド

### 1. GitHub Pages
#### 設定手順
1. リポジトリの"Settings" → "Pages"
2. Source: Deploy from a branch
3. Branch: main, /(root)を選択
4. "Save"をクリック

#### 運用ルール
- mainブランチへのマージで自動デプロイ
- デプロイ状況はActionsタブで確認

### 2. GitHub Projects (カンバンボード)
#### 設定手順
1. リポジトリの"Projects"タブ
2. "New project"でボード作成
3. テンプレート: "Board"を選択

#### カンバン構成
- Todo: 未着手のタスク
- In Progress: 作業中のタスク
- Review: レビュー待ち
- Done: 完了したタスク

### 3. Branch Protection Rules
#### 設定手順
1. リポジトリの"Settings" → "Branches"
2. "Add rule"をクリック
3. 基本設定:
   - Ruleset name: main protection
   - Target branches: mainを設定
4. 保護ルール:
   - Require a pull request before merging
   - Require status checks to pass
   - Restrict deletions
   - Block force pushes

#### バイパス設定
- Bypass listは空のままにする（管理者も含めてルールを適用）

#### プッシュ制限
- mainブランチへの直接プッシュ禁止
- PRレビュー必須
- CIパス必須

### 4. GitHub Actions
#### 基本設定
1. `.github/workflows`ディレクトリ作成
2. デプロイ用ワークフロー作成
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

### 5. Issue Templates
#### テンプレート種類
1. バグレポート
2. 機能要望
3. ドキュメント更新

#### 設定場所
`.github/ISSUE_TEMPLATE/`ディレクトリ

### 6. PR Templates
#### テンプレート内容
- 変更概要
- 関連Issue
- チェックリスト
- スクリーンショット（UI変更時）

#### 設定場所
`.github/pull_request_template.md`

### 7. Discussions
#### カテゴリ設定
- Q&A: 質問と回答
- Ideas: 新機能の提案
- Show and tell: 実装の共有
- General: その他の議論

### 8. Security Policy
#### 設定内容
- サポートバージョン
- 脆弱性報告プロセス
- セキュリティアップデート方針

#### 設定場所
`.github/SECURITY.md`

## ブランチ戦略
### ブランチ命名規則
- 機能追加: `feature/機能名`
- バグ修正: `fix/問題の概要`
- ドキュメント: `docs/更新内容`

### コミットメッセージ規則
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: フォーマット
- refactor: リファクタリング
- test: テスト関連
- chore: その他

## レビュープロセス
1. PRの作成
2. GitHubのレビュー機能を使用
3. 承認後にマージ
4. ブランチの削除