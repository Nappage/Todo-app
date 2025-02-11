# プロジェクト概要

## 目的
シンプルかつ最小限の機能を持つTODOアプリケーションを、GitHubの機能を最大限活用して実装する。

## 基本方針
- GitHub完結での開発・運用
- 最小限の機能セット
- シンプルな技術スタック
- ローカル環境構築不要

## 技術スタック
- フロントエンド: HTML + CSS + Vanilla JavaScript
- ホスティング: GitHub Pages
- データストレージ: localStorage / GitHub Issues API
- 開発環境: GitHub Codespaces / GitHub Web Editor
- CI/CD: GitHub Actions

## 主要機能
1. タスク管理
   - タスクの追加
   - タスクの編集
   - タスクの削除
   - タスクの完了/未完了切り替え

2. データ永続化
   - ローカルストレージによる保存
   - （オプション）GitHub Issuesを使用したバックアップ

## 開発フロー
1. GitHub Web EditorまたはCodespacesでコードを編集
2. GitHub Actionsで自動テストとデプロイ
3. GitHub Pagesで公開

## プロジェクトの目標
- [ ] シンプルで使いやすいUIの実現
- [ ] GitHub機能の効果的な活用
- [ ] メンテナンスの容易さ
- [ ] 高い可用性

## 非機能要件
- レスポンシブデザイン
- オフライン対応
- クロスブラウザ対応
- アクセシビリティ対応

## プロジェクト管理
- GitHub Projectsでタスク管理
- GitHub Issuesでバグ管理
- GitHub Discussionsで議論
- GitHub Actionsで自動化

## ドキュメント管理
すべてのドキュメントをGitHub上のMarkdownで管理し、以下のような構成とする：
- プロジェクト概要（本ドキュメント）
- 要件定義
- アーキテクチャ設計
- 開発ガイド
- GitHubワークフロー
- LLM間引継ぎ
- 開発ログ