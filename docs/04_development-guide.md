# 開発ガイド

## 開発環境のセットアップ

### 必要なもの
- Webブラウザ（Chrome推奨）
- GitHubアカウント

### 開発環境の選択肢

1. GitHub Codespaces（推奨）
   ```
   1. リポジトリページで [Code] > [Open with Codespaces]
   2. [New codespace] を選択
   3. ブラウザ上でVS Code環境が起動
   ```

2. GitHub Web Editor
   ```
   1. リポジトリページで [.] キーを押す
   2. ブラウザ上でエディタが起動
   ```

3. ローカル開発（オプション）
   ```
   1. Live Serverなどの簡易HTTPサーバー
   2. モダンなWebブラウザ
   ```

## プロジェクト構造

```
.
├── README.md
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── storage.js
│   └── ui.js
└── docs/
    ├── 01_project_overview.md
    ├── 02_requirements.md
    └── ...
```

## 開発の始め方

1. コードの編集
   ```
   - HTML/CSS/JavaScriptファイルを直接編集
   - 変更はリアルタイムでプレビュー可能
   ```

2. 変更の保存
   ```
   - ファイルを保存
   - 変更内容をコミット
   - プルリクエストを作成
   ```

3. デプロイ
   ```
   - mainブランチへのマージでGitHub Actionsが自動実行
   - GitHub Pagesに自動デプロイ
   ```

## デバッグ方法

### ブラウザ開発者ツール
1. Console
   ```javascript
   console.log('デバッグ情報');
   console.table(todos);
   ```

2. Elements
   - HTML構造の確認
   - CSSスタイルの確認

3. Application
   - LocalStorageの内容確認
   - キャッシュの確認

### GitHub Pages
- 開発中のプレビュー確認
- デプロイ状態の確認

## テスト

### 手動テスト
1. 機能テスト
   - タスクの追加
   - タスクの編集
   - タスクの削除
   - 完了状態の切り替え

2. 表示テスト
   - レスポンシブ対応
   - クロスブラウザ
   - アクセシビリティ

## よくある問題と解決方法

1. GitHub Pages未更新
   ```
   - Actionsタブでデプロイ状況を確認
   - キャッシュのクリア
   ```

2. LocalStorage問題
   ```javascript
   // データのクリア
   localStorage.clear();
   
   // データの初期化
   localStorage.setItem('todos', '[]');
   ```

## 開発フロー

1. Issue作成
   - 機能追加や修正の提案
   - バグ報告

2. ブランチ作成
   ```
   feature/add-xxx
   fix/issue-xxx
   ```

3. 開発作業
   - コードの編集
   - コミット
   - プッシュ

4. プルリクエスト
   - レビュー依頼
   - 議論
   - マージ